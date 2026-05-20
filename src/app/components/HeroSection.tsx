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
    imagePositionMobile: 'center 40%',
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
    imagePositionMobile: 'center 25%',
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
    imagePositionMobile: 'center 60%',
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
    imagePositionMobile: 'center 50%',
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
    imagePositionMobile: 'center 60%',
    label: 'Porto Vale Consórcios',
    title: 'Tudo o que você planeja, a Porto Vale ajuda a realizar',
    description: 'A segurança e credibilidade que você procura para investir no que importa.',
    cta: 'Simular consórcio',
  },
];

const N = SLIDES.length;
const NAV_H = 68; // header height in px (position: fixed)

interface ExpandState { cx: number; cy: number; r0: number; slideId: number }

export function HeroSection() {
  const navigate = useNavigate();

  const [current,     setCurrent]     = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandState, setExpandState] = useState<ExpandState | null>(null);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [secHover,    setSecHover]    = useState(false);
  const [isPaused,    setIsPaused]    = useState(false);

  const containerRef    = useRef<HTMLDivElement>(null);
  const timerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preExitRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  const touchStartX     = useRef<number>(0);
  const touchStartY     = useRef<number>(0);

  useEffect(() => {
    SLIDES.forEach(slide => {
      if (slide.image)       { const i = new Image(); i.src = slide.image;       preloadedImages.current.push(i); }
      if (slide.imageMobile) { const i = new Image(); i.src = slide.imageMobile; preloadedImages.current.push(i); }
    });
  }, []);

  const advance = useCallback(() => {
    if (isAnimating) return;
    const nextId = (current + 1) % N;
    const ctnr = containerRef.current;
    const cx = ctnr ? ctnr.offsetWidth / 2 : 200;
    const cy = ctnr ? ctnr.offsetHeight * 0.6 : 300;
    setTextVisible(false);
    setExpandState({ cx, cy, r0: 40, slideId: nextId });
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

  const goTo = useCallback((targetId: number) => {
    if (isAnimating) return;
    if (preExitRef.current) clearTimeout(preExitRef.current);
    if (timerRef.current)   clearTimeout(timerRef.current);
    const ctnr = containerRef.current;
    const cx = ctnr ? ctnr.offsetWidth / 2 : 200;
    const cy = ctnr ? ctnr.offsetHeight * 0.6 : 300;
    setTextVisible(false);
    setExpandState({ cx, cy, r0: 40, slideId: targetId });
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(targetId);
      requestAnimationFrame(() => {
        setExpandState(null);
        setTimeout(() => setTextVisible(true), 60);
        setTimeout(() => setIsAnimating(false), 280);
      });
    }, EXPAND_MS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    goTo(dx < 0 ? (current + 1) % N : (current - 1 + N) % N);
  };


  return (
    <section
      id="inicio"
      className="w-full relative overflow-hidden h-[580px] sm:h-[620px] md:h-[700px] lg:h-[82vh]"
      style={{ paddingTop: '10px' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

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

        {/* ── Dots ── */}
        <div
          style={{ display: 'flex', position: 'absolute', bottom: '20px', left: 0, right: 0, justifyContent: 'center', alignItems: 'center', gap: '6px', zIndex: 60 }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir para slide ${i + 1}`}
              style={{
                width: i === current ? '20px' : '7px',
                height: '7px',
                borderRadius: '999px',
                backgroundColor: i === current ? '#009cde' : 'rgba(255,255,255,0.38)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background-color 0.3s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>



      </div>

      <SimulacaoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
