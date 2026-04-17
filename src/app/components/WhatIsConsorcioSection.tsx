import { useState, useRef, useEffect } from 'react';
import { ArrowRight, X, Play, Pause } from 'lucide-react';
import { useNavigate } from 'react-router';
import heroImage from '../../assets/casacarroemoto.png';
import { SectionLabel } from './SectionLabel';

const VIDEO_SRC = 'https://awxqeqjaatuacnqlvxcw.supabase.co/storage/v1/object/public/videos-projeto/composicao-1_phetjC7F.mp4';

/* ── Modal de vídeo com som ──────────────────────────────────────── */
function VideoModal({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 3) {
      tryPlay();
    } else {
      v.addEventListener('canplay', tryPlay, { once: true });
      return () => v.removeEventListener('canplay', tryPlay);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: '400px',
          borderRadius: '20px', overflow: 'hidden',
          backgroundColor: '#000', boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          aspectRatio: '9/16',
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          playsInline
          preload="auto"
          onClick={togglePlay}
          onTimeUpdate={() => {
            const v = videoRef.current;
            if (v) setProgress(v.currentTime / (v.duration || 1));
          }}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
          onEnded={() => setPlaying(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
        />

        {/* Gradiente superior */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)', pointerEvents: 'none' }} />

        {/* Botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar vídeo"
          style={{
            position: 'absolute', top: '14px', right: '14px',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
          }}
        >
          <X size={16} />
        </button>

        {/* Gradiente inferior + controles */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 18px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
          <div
            onClick={seek}
            style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.25)', cursor: 'pointer', marginBottom: '10px', position: 'relative' }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progress * 100}%`, background: '#fff', borderRadius: '2px', transition: 'width 0.1s linear' }} />
          </div>
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
              {playing ? <Pause size={16} fill="white" color="white" /> : <Play size={16} fill="white" color="white" style={{ marginLeft: '2px' }} />}
            </button>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>
              {fmt(progress * duration)} / {fmt(duration)}
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}

/* ── Card 1: Vídeo ─────────────────────────────────────────────── */
function VideoCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <VideoModal onClose={() => setModalOpen(false)} />}

      <div
        className="relative rounded-3xl overflow-hidden flex flex-col justify-end"
        style={{ flex: '1 1 0', minHeight: '320px', background: '#111827' }}
      >
        {/* Thumbnail — vídeo pausado, sem som */}
        <video
          src={`${VIDEO_SRC}#t=0.001`}
          muted
          playsInline
          preload="metadata"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
          }}
        />

        {/* Gradiente */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)' }}
        />

        {/* Botão play centralizado */}
        <button
          onClick={() => setModalOpen(true)}
          aria-label="Reproduzir vídeo"
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.28)'; (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
          >
            <Play size={26} fill="white" color="white" style={{ marginLeft: '3px' }} />
          </div>
        </button>

        {/* Texto inferior */}
        <div className="relative z-10 p-6">
          <span style={{ fontSize: '11px', fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
            Porto Vale Explica
          </span>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '18px', color: '#fff', marginTop: '4px' }}>
            Entenda o consórcio em<br />2 minutos
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
            • Vídeo · 2 min
          </p>
        </div>
      </div>
    </>
  );
}

/* ── Card 2: Texto azul ────────────────────────────────────────── */
function TextCard() {
  return (
    <div
      className="relative rounded-3xl flex flex-col justify-between overflow-hidden"
      style={{
        flex: '1 1 0',
        minHeight: '320px',
        background: '#0055c4',
        padding: '24px',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-48px',
          right: '-48px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }}
      />

      {/* Topo: mini image card + título */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>

        {/* Mini image card */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            height: '172px',
            position: 'relative',
            background: '#fff',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={heroImage}
            alt="Casa, carro e moto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>

        {/* Título */}
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(22px, 2.4vw, 34px)',
            color: '#fff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          Mas afinal, o que é consórcio?
        </h2>
      </div>

      {/* Base: body text */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '18px' }}>
        <div
          style={{
            width: '32px',
            height: '1.5px',
            background: 'rgba(255,255,255,0.25)',
            marginBottom: '14px',
          }}
        />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
          }}
        >
          O consórcio é uma modalidade de compra regulamentada pelo Banco Central, baseada na associação de pessoas físicas e jurídicas que desejam adquirir um bem.
        </p>
      </div>
    </div>
  );
}

/* ── Card 3: Guia do consórcio (branco) ───────────────────────── */
function GuideCard() {
  const [hovered, setHovered] = useState(false);
  const expanded = hovered;
  const navigate = useNavigate();
  const goToGuia = () => { navigate('/guia-do-consorcio'); window.scrollTo(0, 0); };
  return (
    <div
      className="relative rounded-3xl flex flex-col justify-between p-8 overflow-hidden"
      style={{
        flex: '1 1 0',
        minHeight: '320px',
        background: '#fff',
        border: '1.5px solid rgba(0,0,0,0.07)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(0,85,196,0.05)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionLabel>Guia completo</SectionLabel>

        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 4vw, 60px)',
            color: '#111827',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}
        >
          O Guia do{' '}
          <span
            style={{
              display: 'inline',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#0055c4',
            }}
          >
            Consórcio
          </span>
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#6B7280',
            lineHeight: 1.65,
            maxWidth: '280px',
          }}
        >
          Descomplicando o consórcio com você. Um guia simples para entender como funciona, do início ao fim.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: '24px' }}>
        {/* Desktop: expansão ao hover | Mobile: sempre expandido */}
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={goToGuia}
          className="lg:inline-flex hidden"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: expanded ? '8px' : '0px',
            height: '48px',
            width: expanded ? '148px' : '48px',
            borderRadius: '999px',
            background: '#0055c4',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: expanded ? '0 6px 28px rgba(0,85,196,0.40)' : '0 4px 20px rgba(0,85,196,0.25)',
            transition: 'width 0.28s cubic-bezier(.4,0,.2,1), box-shadow 0.2s',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            paddingLeft: expanded ? '20px' : '0px',
            paddingRight: expanded ? '16px' : '0px',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              color: '#fff',
              maxWidth: expanded ? '100px' : '0px',
              opacity: expanded ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-width 0.28s cubic-bezier(.4,0,.2,1), opacity 0.2s 0.1s',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Ler o guia
          </span>
          <ArrowRight size={18} style={{ flexShrink: 0 }} />
        </button>
        {/* Mobile: botão sempre expandido */}
        <button
          onClick={goToGuia}
          className="lg:hidden inline-flex"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: '48px',
            paddingLeft: '20px',
            paddingRight: '16px',
            borderRadius: '999px',
            background: '#0055c4',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,85,196,0.25)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px', color: '#fff' }}>
            Ler o guia
          </span>
          <ArrowRight size={18} style={{ flexShrink: 0 }} />
        </button>
      </div>
    </div>
  );
}

/* ── Section principal ─────────────────────────────────────────── */
export function WhatIsConsorcioSection() {
  return (
    <section className="py-16 lg:py-24 relative z-20" style={{ paddingBottom: '40px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        {/* Stack vertical no mobile, horizontal no desktop */}
        <div className="flex flex-col lg:flex-row gap-5" style={{ alignItems: 'stretch' }}>
          <VideoCard />
          <TextCard />
          <GuideCard />
        </div>
      </div>
    </section>
  );
}
