import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import bgBlue from '../../assets/bgazul.png';
import portoBankLogo from '../../assets/logo-portobank.png';
import conditionImg from '../../assets/condição.png';
import { SimulacaoModal } from './SimulacaoModal';

const BLUE = '#009cde';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSimularClick = () => {
    setModalOpen(true);
  };

  return (
    <section
      id="inicio"
      className="relative w-full"
      style={{ minHeight: 'calc(80vh + 60px)' }}
    >
      {/* ── Background ── */}
      <img
        src={bgBlue}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,20,0.45) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        style={{ minHeight: 'calc(80vh + 60px)', paddingTop: '120px', paddingBottom: '160px' }}
      >


        {/* ── Logo + Headline ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap"
        >
          <img
            src={portoBankLogo}
            alt="PortoBank"
            className="h-6 sm:h-8 w-auto object-contain flex-shrink-0"
            style={{ opacity: 0.95 }}
          />

          <div
            className="hidden sm:block flex-shrink-0"
            style={{ width: '1px', height: '64px', backgroundColor: 'rgba(255,255,255,0.30)' }}
          />

          <h1
            className="text-left"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(14px, 1.8vw, 22px)',
              lineHeight: 1.15,
              color: '#FFFFFF',
              fontWeight: 400,
              maxWidth: '440px',
            }}
          >
            agora ficou mais fácil<br />
            conquistar seu{' '}
            <strong style={{ fontWeight: 900 }}>imóvel</strong>
          </h1>
        </motion.div>

        {/* ── Imagem de condição ── */}
        <motion.img
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          src={conditionImg}
          alt="45% OFF até a contemplação + 0% de adesão"
          className="mt-10 sm:mt-12 w-full"
          style={{ maxWidth: '600px', objectFit: 'contain' }}
        />

        {/* ── CTAs ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-14 flex flex-col items-center gap-2"
        >
          {/* CTA primário — Simulação */}
          <button
            id="cta-hero-simular"
            data-tracking="hero_simular_click"
            onClick={handleSimularClick}
            className="inline-flex items-center gap-2 text-white rounded-xl transition-all duration-200 active:scale-95"
            style={{
              backgroundColor: BLUE,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              height: '56px',
              paddingLeft: '32px',
              paddingRight: '32px',
              boxShadow: '0 8px 36px rgba(0,156,222,0.5)',
              letterSpacing: '-0.01em',
              minWidth: '220px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#0089c4';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,156,222,0.65)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = BLUE;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 36px rgba(0,156,222,0.5)';
            }}
          >
            Simular agora
            <ArrowRight size={18} />
          </button>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
            *Consulte condições.
          </span>

        </motion.div>

      </div>

      <SimulacaoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
