import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import portoBankLogo from '../../assets/logo-portobank.png';
import { SimulacaoModal } from './SimulacaoModal';
import { FlowButton } from './FlowButton';

const AUTO_INTERVAL = 6000;
const EXPAND_MS     = 900;
const PRE_EXIT_MS   = 450;

const SLIDES = [
  { id: 0, color: '#003580', label: 'Consórcio de Imóvel',     title: 'O primeiro passo',          description: 'Comprar o seu imóvel é mais simples do que você imagina, simule agora!' },
  { id: 1, color: '#0A2647', label: 'Consórcio de Automóvel',   title: 'Seu carro novo, sem juros', description: 'A forma mais inteligente de conquistar seu próximo veículo.' },
  { id: 2, color: '#1B4332', label: 'Consórcio Agro',           title: 'Invista no campo',          description: 'Máquinas e equipamentos agrícolas com o melhor custo-benefício.' },
  { id: 3, color: '#1A1147', label: 'Consórcio Empresarial',    title: 'Cresça com planejamento',   description: 'Planeje a expansão da sua empresa com segurança e sem burocracia.' },
];

const N = SLIDES.length;
const THUMB_GRAD = 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)';
const NAV_H = 68; // header height in px (position: fixed)

interface ExpandState { clipStart: string; slideId: number }

export function HeroSection() {
  const [current,     setCurrent]     = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandState, setExpandState] = useState<ExpandState | null>(null);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [sectionBg,   setSectionBg]   = useState(SLIDES[0].color);

  const containerRef  = useRef<HTMLDivElement>(null);
  // ref para o primeiro card da fila (o que vai expandir)
  const firstThumbRef = useRef<HTMLDivElement | null>(null);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preExitRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  // fila: os 3 próximos slides (não inclui o atual)
  const queue = [1, 2, 3].map(o => SLIDES[(current + o) % N]);

  const getClip = (): string => {
    const ctnr  = containerRef.current;
    const thumb = firstThumbRef.current;
    if (!ctnr || !thumb) return 'inset(80% 2% 2% 76% round 10px)';
    const cr = ctnr.getBoundingClientRect();
    const tr = thumb.getBoundingClientRect();
    const top    = ((tr.top    - cr.top)    / cr.height * 100).toFixed(2);
    const right  = ((cr.right  - tr.right)  / cr.width  * 100).toFixed(2);
    const bottom = ((cr.bottom - tr.bottom) / cr.height * 100).toFixed(2);
    const left   = ((tr.left   - cr.left)   / cr.width  * 100).toFixed(2);
    return `inset(${top}% ${right}% ${bottom}% ${left}% round 10px)`;
  };

  const advance = useCallback(() => {
    if (isAnimating) return;
    const nextId    = (current + 1) % N;
    const clipStart = getClip();
    setSectionBg(SLIDES[nextId].color);
    setTextVisible(false);
    setExpandState({ clipStart, slideId: nextId });
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(nextId);
      setExpandState(null);
      setTimeout(() => setTextVisible(true), 60);
      setTimeout(() => setIsAnimating(false), 280);
    }, EXPAND_MS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, isAnimating]);

  useEffect(() => {
    preExitRef.current = setTimeout(() => setTextVisible(false), AUTO_INTERVAL - PRE_EXIT_MS);
    timerRef.current   = setTimeout(advance, AUTO_INTERVAL);
    return () => {
      if (preExitRef.current) clearTimeout(preExitRef.current);
      if (timerRef.current)   clearTimeout(timerRef.current);
    };
  }, [advance, current]);

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
    const targetId  = (current + slideOffset + 1) % N;
    const clipStart = getClip();
    setSectionBg(SLIDES[targetId].color);
    setTextVisible(false);
    setExpandState({ clipStart, slideId: targetId });
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(targetId);
      setExpandState(null);
      setTimeout(() => setTextVisible(true), 60);
      setTimeout(() => setIsAnimating(false), 280);
    }, EXPAND_MS);
  };

  return (
    <section id="inicio" className="w-full relative overflow-hidden" style={{ height: '92vh', paddingTop: '10px', paddingBottom: '60px', backgroundColor: sectionBg }}>

      {/* ── Loading progress line — right at header bottom edge (top: NAV_H) ── */}
      <div style={{ position: 'absolute', top: `${NAV_H}px`, left: 0, right: 0, height: '3px', backgroundColor: 'rgba(255,255,255,0.12)', zIndex: 60 }}>
        <motion.div
          key={`line-${current}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: AUTO_INTERVAL / 1000, ease: 'linear' }}
          style={{ height: '100%', backgroundColor: 'rgba(255,255,255,0.75)' }}
        />
      </div>

      <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-t-2xl" style={{ clipPath: 'inset(0% 0% 0% 0% round 1rem 1rem 0 0)', zIndex: 15 }}>

        {/* ── Background — cor sólida ── */}
        <motion.div
          key={`bg-${current}`}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ zIndex: 0, backgroundColor: SLIDES[current].color }}
        />

        {/* ── Painel expansivo (clip-path) ── */}
        <AnimatePresence>
          {expandState && (
            <motion.div
              key={`expand-${expandState.slideId}`}
              className="absolute inset-0 overflow-hidden"
              style={{ zIndex: 28 }}
              initial={{ clipPath: expandState.clipStart }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
              exit={{ opacity: 0 }}
              transition={{
                clipPath: { duration: EXPAND_MS / 1000, ease: [0.65, 0, 0.35, 1] },
                opacity:  { duration: 0.28 },
              }}
            >
              <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: SLIDES[expandState.slideId].color }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Texto esquerda ── */}
        <div
          className="absolute inset-0 flex flex-col items-start justify-center px-8 sm:px-16 lg:px-24"
          style={{ maxWidth: '800px', paddingTop: 'clamp(40px, 8vh, 80px)', paddingBottom: 'clamp(40px, 8vh, 80px)', zIndex: 20 }}
        >
          <img src={portoBankLogo} alt="PortoBank" className="h-6 sm:h-8 w-auto object-contain" style={{ opacity: 0.95 }} />

          <motion.div
            key={current}
            initial={{ y: 28, opacity: 0 }}
            animate={textVisible ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
            transition={{ duration: textVisible ? 0.52 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: '32px' }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(11px,1vw,13px)', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
              {SLIDES[current].label}
            </p>
            <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.1, color: '#fff', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {SLIDES[current].title}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px,1.4vw,18px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginTop: '16px', maxWidth: '520px' }}>
              {SLIDES[current].description}
            </p>
          </motion.div>

          <div style={{ marginTop: '40px', position: 'relative', zIndex: 50 }}>
            <FlowButton text="Simular agora" onClick={() => setModalOpen(true)} size="lg" />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginTop: '8px' }}>
              *Consulte condições.
            </p>
          </div>
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
                ref={i === 0 ? (el: HTMLDivElement | null) => { firstThumbRef.current = el; } : undefined}
                onClick={() => handleThumbClick(i)}
                style={{
                  position: 'relative',
                  width: '80px',
                  height: '108px',
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
                <div className="w-full h-full" style={{ backgroundColor: slide.color }} />

                {/* Gradiente + etiqueta */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: THUMB_GRAD, padding: '20px 7px 7px' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '7px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', lineHeight: 1.2 }}>
                    {slide.label}
                  </p>
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
