import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Pause, Play } from 'lucide-react';
import portoBankLogo from '../../assets/logo-portobank.png';
import { SimulacaoModal } from './SimulacaoModal';
import { FlowButton } from './FlowButton';

const AUTO_INTERVAL = 10000;
const EXPAND_MS     = 900;
const PRE_EXIT_MS   = 450;

interface Slide {
  id: number;
  color: string;
  image?: string;
  imageMobile?: string;
  imagePosition?: string;
  imagePositionMobile?: string;
  label: string;
  title: string;
  description: string;
  cta: string;
  ctaHref?: string;
  secondaryHref?: string;
}

const SLIDES: Slide[] = [
  {
    id: 0,
    color: '#0D2137',
    image: '/imagens/banner-imovel.png',
    imageMobile: '/imagens/banner-imovel-mobile.png',
    imagePositionMobile: 'center 70%',
    label: 'Consórcio de Imóvel',
    title: 'O primeiro passo',
    description: 'Comprar o seu imóvel é mais simples do que você imagina, conheça nossos planos personalizados!',
    cta: 'Simule agora',
    secondaryHref: '/consorcio-imovel',
  },
  {
    id: 1,
    color: '#0A1D2E',
    image: '/imagens/banner-carro.png',
    imageMobile: '/imagens/banner-carro-mobile.png',
    imagePositionMobile: 'center 70%',
    label: 'Consórcio de Automóvel',
    title: 'Carro novo na hora certa',
    description: 'Parcelas planejadas que se encaixam perfeitamente no seu orçamento.',
    cta: 'Ver planos',
    secondaryHref: '/consorcio-automovel',
  },
  {
    id: 2,
    color: '#0D2B1E',
    image: '/imagens/banner-investir.png',
    imageMobile: '/imagens/banner-investir-mobile.png',
    imagePositionMobile: 'center 70%',
    imagePosition: 'right center',
    label: 'Investimento',
    title: 'Pensando em investir?',
    description: 'Multiplique o seu capital de forma segura, planejada e sem juros.',
    cta: 'Conheça nossos planos',
    secondaryHref: '/consorcio-investimento',
  },
  {
    id: 3,
    color: '#161D2A',
    image: '/imagens/banner-pesados.png',
    imageMobile: '/imagens/banner-pesados-mobile.png',
    imagePositionMobile: 'center 70%',
    label: 'Consórcio de Pesados',
    title: 'Sua frota mais forte',
    description: 'Amplie sua capacidade de operação pagando menos.',
    cta: 'Fale conosco',
    ctaHref: '/contato',
    secondaryHref: '/consorcio-pesados',
  },
  {
    id: 4,
    color: '#1A1147',
    image: '/imagens/banner-geral.png',
    imageMobile: '/imagens/banner-geral-mobile.png',
    imagePositionMobile: 'center 70%',
    label: 'Porto Vale Consórcios',
    title: 'Tudo o que você planeja, a Porto Vale ajuda a realizar',
    description: 'A segurança e credibilidade que você procura para investir no que importa.',
    cta: 'Simular consórcio',
  },
];

const N = SLIDES.length;
const THUMB_GRAD = 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)';
const NAV_H = 68; // header height in px (position: fixed)

interface ExpandState { cx: number; cy: number; r0: number; slideId: number }

export function HeroSection() {
  const navigate = useNavigate();

  useEffect(() => {
    SLIDES.forEach(slide => {
      if (slide.image)       { const i = new Image(); i.src = slide.image;       preloadedImages.current.push(i); }
      if (slide.imageMobile) { const i = new Image(); i.src = slide.imageMobile; preloadedImages.current.push(i); }
    });
  }, []);

  const [current,     setCurrent]     = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandState, setExpandState] = useState<ExpandState | null>(null);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [secHover,  setSecHover]  = useState(false);
  const [isPaused,  setIsPaused]  = useState(false);

  const containerRef    = useRef<HTMLDivElement>(null);
  const thumbRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preExitRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preloadedImages = useRef<HTMLImageElement[]>([]);

  // fila: os N-1 próximos slides (todos exceto o atual)
  const queue = Array.from({ length: N - 1 }, (_, i) => SLIDES[(current + i + 1) % N]);

  const getThumbExpand = (thumb: HTMLDivElement | null): { cx: number; cy: number; r0: number } => {
    const ctnr = containerRef.current;
    if (!ctnr) return { cx: 0, cy: 0, r0: 60 };
    const cr = ctnr.getBoundingClientRect();
    if (!thumb) return { cx: cr.width * 0.88, cy: cr.height * 0.90, r0: 60 };
    const tr = thumb.getBoundingClientRect();
    const cx = tr.left - cr.left + tr.width  / 2;
    const cy = tr.top  - cr.top  + tr.height / 2;
    const r0 = Math.sqrt(tr.width ** 2 + tr.height ** 2) / 2 + 6;
    return { cx, cy, r0 };
  };

  const advance = useCallback(() => {
    if (isAnimating) return;
    const nextId = (current + 1) % N;
    const exp    = getThumbExpand(thumbRefs.current[0]);
    setTextVisible(false);
    setExpandState({ ...exp, slideId: nextId });
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(nextId);
      requestAnimationFrame(() => {
        setExpandState(null);
        setTimeout(() => setTextVisible(true), 60);
        setTimeout(() => setIsAnimating(false), 280);
      });
    }, EXPAND_MS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, isAnimating]);

  useEffect(() => {
    if (isPaused) return;
    preExitRef.current = setTimeout(() => setTextVisible(false), AUTO_INTERVAL - PRE_EXIT_MS);
    timerRef.current   = setTimeout(advance, AUTO_INTERVAL);
    return () => {
      if (preExitRef.current) clearTimeout(preExitRef.current);
      if (timerRef.current)   clearTimeout(timerRef.current);
    };
  }, [advance, current, isPaused]);

  const handleThumbClick = (slideOffset: number) => {
    // slideOffset: 0 = próximo, 1 = +2, 2 = +3
    if (isAnimating || slideOffset === 0) {
      if (slideOffset === 0) {
        if (preExitRef.current) clearTimeout(preExitRef.current);
        if (timerRef.current)   clearTimeout(timerRef.current);
        setTextVisible(false);
        advance();
      }
      return;
    }
    // Para cliques nos cards 2 e 3, avança diretamente ignorando os intermediários
    if (preExitRef.current) clearTimeout(preExitRef.current);
    if (timerRef.current)   clearTimeout(timerRef.current);
    const targetId = (current + slideOffset + 1) % N;
    const exp      = getThumbExpand(thumbRefs.current[slideOffset]);
    setTextVisible(false);
    setExpandState({ ...exp, slideId: targetId });
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(targetId);
      requestAnimationFrame(() => {
        setExpandState(null);
        setTimeout(() => setTextVisible(true), 60);
        setTimeout(() => setIsAnimating(false), 280);
      });
    }, EXPAND_MS);
  };

  return (
    <section id="inicio" className="w-full relative overflow-hidden" style={{ height: '82vh', paddingTop: '10px' }}>

      {/* ── Botão play/pause ── */}
      <button
        onClick={() => setIsPaused(p => !p)}
        aria-label={isPaused ? 'Retomar apresentação' : 'Pausar apresentação'}
        style={{
          position: 'absolute', top: `${NAV_H + 14}px`, right: '20px', zIndex: 55,
          width: '30px', height: '30px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.10)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backdropFilter: 'blur(6px)',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.22)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)'; }}
      >
        {isPaused
          ? <Play  size={11} fill="rgba(255,255,255,0.85)" stroke="none" />
          : <Pause size={11} fill="rgba(255,255,255,0.85)" stroke="none" />
        }
      </button>

      {/* ── Loading progress line — right at header bottom edge (top: NAV_H) ── */}
      <div style={{ position: 'absolute', top: `${NAV_H}px`, left: 0, right: 0, height: '3px', backgroundColor: 'rgba(255,255,255,0.12)', zIndex: 60 }}>
        <motion.div
          key={`line-${current}-${isPaused}`}
          initial={{ width: '0%' }}
          animate={{ width: isPaused ? '0%' : '100%' }}
          transition={{ duration: isPaused ? 0 : AUTO_INTERVAL / 1000, ease: 'linear' }}
          style={{ height: '100%', backgroundColor: 'rgba(255,255,255,0.75)' }}
        />
      </div>

      <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-t-2xl" style={{ clipPath: 'inset(0% 0% 0% 0% round 1rem 1rem 0 0)', zIndex: 15 }}>

        {/* ── Background — cor sólida ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0, backgroundColor: SLIDES[current].color }}
        />

        {/* ── Imagem do slide atual ── */}
        {SLIDES[current].image && (
          <>
            {/* Desktop */}
            <img
              key={`desk-${current}`}
              src={SLIDES[current].image}
              aria-hidden="true"
              className="hidden sm:block"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: SLIDES[current].imagePosition ?? 'center',
                zIndex: 1, pointerEvents: 'none',
              }}
            />
            {/* Mobile */}
            {SLIDES[current].imageMobile && (
              <img
                key={`mob-${current}`}
                src={SLIDES[current].imageMobile}
                aria-hidden="true"
                className="sm:hidden"
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: SLIDES[current].imagePositionMobile ?? SLIDES[current].imagePosition ?? 'center',
                  zIndex: 1, pointerEvents: 'none',
                }}
              />
            )}
          </>
        )}

        {/* ── Gradiente de legibilidade ── */}
        {SLIDES[current].image && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.10) 100%), linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)',
            }}
          />
        )}

        {/* ── Painel expansivo ── */}
        <AnimatePresence>
          {expandState && (
            <motion.div
              key={`expand-${expandState.slideId}`}
              style={{ position: 'absolute', inset: 0, zIndex: 28, overflow: 'hidden' }}
              initial={{ clipPath: `circle(${expandState.r0}px at ${expandState.cx}px ${expandState.cy}px)` }}
              animate={{ clipPath: `circle(200% at ${expandState.cx}px ${expandState.cy}px)` }}
              exit={{ opacity: 0 }}
              transition={{
                clipPath: { duration: EXPAND_MS / 1000, ease: [0.65, 0, 0.35, 1] },
                opacity:  { duration: 0.12 },
              }}
            >
              <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: SLIDES[expandState.slideId].color }} />
              {SLIDES[expandState.slideId].image && (
                <>
                  <motion.div
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: EXPAND_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
                    style={{ position: 'absolute', inset: 0, transformOrigin: 'center center', zIndex: 1, pointerEvents: 'none' }}
                  >
                    {/* Desktop */}
                    <img
                      src={SLIDES[expandState.slideId].image}
                      aria-hidden="true"
                      className="hidden sm:block"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: SLIDES[expandState.slideId].imagePosition ?? 'center' }}
                    />
                    {/* Mobile */}
                    {SLIDES[expandState.slideId].imageMobile && (
                      <img
                        src={SLIDES[expandState.slideId].imageMobile}
                        aria-hidden="true"
                        className="sm:hidden"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: SLIDES[expandState.slideId].imagePositionMobile ?? SLIDES[expandState.slideId].imagePosition ?? 'center' }}
                      />
                    )}
                  </motion.div>
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                      background: 'linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.22) 55%, transparent 100%)',
                    }}
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Texto esquerda ── */}
        <div
          className="absolute inset-0 flex flex-col items-start justify-end sm:justify-center px-8 sm:px-16 lg:px-24 pb-16 sm:pb-10"
          style={{ maxWidth: '800px', paddingTop: 'clamp(40px, 8vh, 80px)', zIndex: 20 }}
        >
          <img src={portoBankLogo} alt="PortoBank" className="h-5 sm:h-6 w-auto object-contain" style={{ opacity: 0.95 }} />

          <motion.div
            key={current}
            initial={{ y: 28, opacity: 0 }}
            animate={textVisible ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
            transition={{ duration: textVisible ? 0.52 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: '32px' }}
          >
            <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.15, color: '#fff', fontWeight: 800, letterSpacing: '-0.02em', maxWidth: '520px' }}>
              {SLIDES[current].title}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px,1.4vw,18px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginTop: '16px', maxWidth: '520px', textWrap: 'balance' } as React.CSSProperties}>
              {SLIDES[current].description}
            </p>
          </motion.div>

          <div style={{ marginTop: '40px', position: 'relative', zIndex: 50 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {SLIDES[current].secondaryHref && (
                <button
                  onClick={() => navigate(SLIDES[current].secondaryHref!)}
                  onMouseEnter={() => setSecHover(true)}
                  onMouseLeave={() => setSecHover(false)}
                  style={{
                    background: secHover ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)',
                    border: `1.5px solid ${secHover ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)'}`,
                    borderRadius: '100px',
                    padding: '13px 26px',
                    color: secHover ? '#ffffff' : 'rgba(255,255,255,0.78)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Saiba mais
                </button>
              )}
              <FlowButton
                text={SLIDES[current].cta}
                onClick={() => {
                  if (SLIDES[current].ctaHref) navigate(SLIDES[current].ctaHref!);
                  else setModalOpen(true);
                }}
                size="lg"
              />
            </div>
          </div>

          <p style={{ position: 'absolute', bottom: '16px', left: 'clamp(32px, 8vw, 96px)', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.38)', zIndex: 50 }}>
            *Consulte condições.
          </p>
        </div>

        {/* ── Fila de thumbnails — canto inferior direito ── */}
        <div
          className="hidden sm:flex absolute gap-2 items-end"
          style={{ bottom: '20px', right: '24px', zIndex: 30 }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {queue.map((slide, i) => (
              <motion.div
                key={slide.id}
                layout
                initial={{ opacity: 0, x: 40, scale: 0.92 }}
                animate={{
                  opacity: i === 0 ? 1 : i === 1 ? 0.72 : 0.45,
                  x: 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, x: -20, scale: 0.94 }}
                transition={{
                  layout:   { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                  default:  { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                }}
                ref={(el: HTMLDivElement | null) => { thumbRefs.current[i] = el; }}
                onClick={() => handleThumbClick(i)}
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '86px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  cursor: i === 0 && !isAnimating ? 'pointer' : i > 0 ? 'pointer' : 'default',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
                  border: i === 0
                    ? '1.5px solid rgba(255,255,255,0.65)'
                    : '1.5px solid rgba(255,255,255,0.18)',
                }}
              >
                <div className="w-full h-full" style={{ backgroundColor: slide.color }}>
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '75% center', display: 'block', transform: 'scale(1.5)', transformOrigin: '75% center' }}
                    />
                  )}
                </div>

                {/* Gradiente + etiqueta */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: THUMB_GRAD, padding: '20px 7px 7px' }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '9px', color: '#fff', lineHeight: 1.2 }}>
                    {slide.title}
                  </p>
                </div>

                {/* Barra de progresso — somente no primeiro card da fila */}
                {i === 0 && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <motion.div
                      key={`prog-${current}`}
                      initial={{ width: '0%' }}
                      animate={{ width: isAnimating ? '100%' : '100%' }}
                      style={{ height: '100%', backgroundColor: '#009cde', width: '0%' }}
                    >
                      <motion.div
                        key={`progfill-${current}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: AUTO_INTERVAL / 1000, ease: 'linear' }}
                        style={{ height: '100%', backgroundColor: '#009cde' }}
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>


      </div>

      <SimulacaoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
