import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Play, Pause } from 'lucide-react';
import { SectionLabel } from './SectionLabel';

const videoOQueEConsorcio    = '/videos/o-que-e-consorcio.mp4';
const videoReforma           = '/videos/consorcio-para-reforma.mp4';
const videoPrimeiroImovel    = '/videos/planejando-primeiro-imovel.mp4';
const videoPoderaVista       = '/videos/poder-de-comprar-a-vista.mov';
const videoQuantoCusta       = '/videos/quanto-custa-imovel-300k.mov';
const videoPreparado         = '/videos/voce-esta-pronto.mov';
const videoFrustracao        = '/videos/frustracao-com-consorcio.mov';
const videoPerfil            = '/videos/perfil-combina-consorcio.mov';
const videoSonho             = '/videos/todo-sonho-comeca-planejamento.mov';

const cards = [
  { topic: 'O que é consórcio',                      videoSrc: videoOQueEConsorcio },
  { topic: 'Consórcio para reforma',                 videoSrc: videoReforma        },
  { topic: 'Planejando a compra do 1º imóvel',       videoSrc: videoPrimeiroImovel },
  { topic: 'Poder de comprar à vista',               videoSrc: videoPoderaVista    },
  { topic: 'Quanto custa um imóvel de 300k',         videoSrc: videoQuantoCusta    },
  { topic: 'Você está 100% pronto',                  videoSrc: videoPreparado      },
  { topic: 'Por que a frustração com o consórcio?',  videoSrc: videoFrustracao     },
  { topic: 'Seu perfil combina com o consórcio',     videoSrc: videoPerfil         },
  { topic: 'Todo sonho começa com planejamento',     videoSrc: videoSonho          },
];

/* ── Modal de vídeo ──────────────────────────────────────────────── */
function VideoModal({
  card,
  onClose,
}: {
  card: { topic: string; videoSrc: string };
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inicia o vídeo ao abrir
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  // Fecha com Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Esconde controles após 3s de inatividade
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [resetHideTimer]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
    resetHideTimer();
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setProgress(v.currentTime / (v.duration || 1));
  };

  const onLoadedMetadata = () => {
    setDuration(videoRef.current?.duration ?? 0);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
    resetHideTimer();
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    /* Overlay */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {/* Container do vídeo — evita fechar ao clicar dentro */}
      <div
        onClick={e => e.stopPropagation()}
        onMouseMove={resetHideTimer}
        onTouchStart={resetHideTimer}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#000',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          aspectRatio: '9/16',
        }}
      >
        <video
          ref={videoRef}
          src={card.videoSrc}
          playsInline
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => setPlaying(false)}
          onClick={togglePlay}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
        />

        {/* Gradiente superior */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '80px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
            transition: 'opacity 0.3s',
            opacity: showControls ? 1 : 0,
            pointerEvents: 'none',
          }}
        />

        {/* Tópico + botão fechar */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px',
            transition: 'opacity 0.3s',
            opacity: showControls ? 1 : 0,
          }}
        >
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600,
            color: '#fff', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
            padding: '5px 12px', borderRadius: '999px',
          }}>
            {card.topic}
          </span>
          <button
            onClick={onClose}
            aria-label="Fechar vídeo"
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Gradiente inferior */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
            transition: 'opacity 0.3s',
            opacity: showControls ? 1 : 0,
            pointerEvents: 'none',
          }}
        />

        {/* Controles inferiores */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '12px 16px 18px',
            transition: 'opacity 0.3s',
            opacity: showControls ? 1 : 0,
          }}
        >
          {/* Barra de progresso */}
          <div
            onClick={seek}
            style={{
              height: '3px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.25)',
              cursor: 'pointer', marginBottom: '10px', position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${progress * 100}%`,
              background: '#fff', borderRadius: '2px',
              transition: 'width 0.1s linear',
            }} />
          </div>

          {/* Play/Pause + tempo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pausar' : 'Reproduzir'}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff', flexShrink: 0,
              }}
            >
              {playing
                ? <Pause size={16} fill="white" color="white" />
                : <Play  size={16} fill="white" color="white" style={{ marginLeft: '2px' }} />
              }
            </button>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '12px',
              color: 'rgba(255,255,255,0.75)',
            }}>
              {fmt(progress * duration)} / {fmt(duration)}
            </span>
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}

/* ── Preview mudo no carrossel ───────────────────────────────────── */
function VideoPreview({
  src,
  index,
  isCenter,
}: {
  src: string;
  index: number;
  isCenter: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;
    if (isCenter) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isCenter, hasError]);

  if (hasError) {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: `hsl(${210 + index * 18}, 18%, ${40 + index * 4}%)`,
      }} />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setHasError(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}

/* ── Section ─────────────────────────────────────────────────────── */
export function VendedoresSection() {
  const [active, setActive] = useState(0);
  const [modalCard, setModalCard] = useState<typeof cards[number] | null>(null);
  const total = cards.length;

  const next = useCallback(() => setActive(prev => (prev + 1) % total), [total]);
  const prev = () => setActive(prev => (prev - 1 + total) % total);

  // Pausa rotação automática enquanto o modal estiver aberto
  useEffect(() => {
    if (modalCard) return;
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next, modalCard]);

  const getCardStyle = (offset: number): React.CSSProperties => {
    const abs = Math.abs(offset);
    if (abs > 2) return { display: 'none' };

    const scale      = [1, 0.82, 0.66][abs];
    const zIndex     = [5, 4, 3][abs];
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const step = Math.min(200, vw * 0.28);
    const translateX = offset * step;
    const translateY = [0, 28, 52][abs];
    const opacity    = [1, 0.85, 0.65][abs];

    return {
      position: 'absolute',
      left: '50%',
      top: 0,
      transform: `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: offset !== 0 ? 'pointer' : 'default',
    };
  };

  return (
    <>
      {/* Modal */}
      {modalCard && (
        <VideoModal card={modalCard} onClose={() => setModalCard(null)} />
      )}

      <section style={{ padding: '72px 0 80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <SectionLabel>Nossos especialistas</SectionLabel>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '-0.03em',
              lineHeight: 1.1, color: '#111827', marginBottom: '14px',
            }}>
              Tire suas dúvidas com{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#0055c4' }}>
                quem entende
              </span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7280',
              lineHeight: 1.7, maxWidth: '480px', margin: '0 auto',
            }}>
              Nossos consultores explicam cada detalhe do consórcio — da simulação à contemplação — para você tomar a melhor decisão.
            </p>
          </div>

          {/* Carrossel */}
          <div className="carousel-wrapper" style={{ position: 'relative', height: 'clamp(340px, 50vw, 460px)', marginBottom: '48px', overflow: 'hidden' }}>
            {cards.map((card, i) => {
              const offset = ((i - active + total) % total);
              const normalizedOffset = offset > total / 2 ? offset - total : offset;
              const style = getCardStyle(normalizedOffset);
              const isCenter = normalizedOffset === 0;

              return (
                <div
                  key={i}
                  style={style}
                  onClick={() => !isCenter && setActive(i)}
                >
                  {/* Tópico */}
                  <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600,
                      color: '#374151', background: 'rgba(0,0,0,0.07)',
                      padding: '4px 14px', borderRadius: '999px',
                    }}>
                      {card.topic}
                    </span>
                  </div>

                  {/* Card */}
                  <div style={{
                    width: 'clamp(150px, 22vw, 220px)', height: 'clamp(265px, 38vw, 390px)', borderRadius: '20px',
                    overflow: 'hidden', background: '#D1D5DB',
                    boxShadow: isCenter ? '0 24px 60px rgba(0,0,0,0.18)' : '0 8px 24px rgba(0,0,0,0.10)',
                    position: 'relative',
                  }}>
                    <VideoPreview src={card.videoSrc} index={i} isCenter={isCenter} />

                    {/* Botão play — só no card central, abre o modal */}
                    {isCenter && (
                      <button
                        onClick={() => setModalCard(card)}
                        aria-label={`Assistir: ${card.topic}`}
                        style={{
                          position: 'absolute', inset: 0, width: '100%', height: '100%',
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <div style={{
                          width: '56px', height: '56px', borderRadius: '50%',
                          background: 'rgba(255,255,255,0.9)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                        }}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="#111827">
                            <path d="M5 3.5l12 6.5-12 6.5V3.5z" />
                          </svg>
                        </div>
                      </button>
                    )}

                    {/* Gradiente base */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                      pointerEvents: 'none',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navegação */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={prev}
              aria-label="Anterior"
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.15)', background: 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Ir para card ${i + 1}`}
                  style={{
                    width: active === i ? '20px' : '6px', height: '6px',
                    borderRadius: '3px',
                    background: active === i ? '#0055c4' : 'rgba(0,0,0,0.2)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Próximo"
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.15)', background: 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
