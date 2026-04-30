import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import portoBankLogo from '../../assets/logo-portobank.png';
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

  return (
    <section
      id="inicio"
      className="relative w-full"
      style={{ minHeight: 'calc(80vh + 60px)' }}
    >
      {/* ── Background ── */}
      <img
        src="/imagens/foto-banner.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── Overlay escuro ── */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.50)' }} />

      {/* ── Content ── */}
      <div
        className="relative z-10 flex flex-col items-start justify-center px-8 sm:px-16 lg:px-24"
        style={{ minHeight: 'calc(80vh + 60px)', paddingTop: '120px', paddingBottom: '120px', maxWidth: '800px' }}
      >

        {/* ── Logo ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <img
            src={portoBankLogo}
            alt="PortoBank"
            className="h-6 sm:h-8 w-auto object-contain"
            style={{ opacity: 0.95 }}
          />
        </motion.div>

        {/* ── H1 ── */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(22px, 2.8vw, 38px)',
            lineHeight: 1.1,
            color: '#FFFFFF',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginTop: '32px',
          }}
        >
          O consórcio que transforma<br />
          planos em realidade
        </motion.h1>

        {/* ── Subtítulo ── */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.38}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6,
            marginTop: '16px',
            maxWidth: '520px',
          }}
        >
          Mais de 20 anos conectando pessoas às melhores soluções em consórcios no Brasil.
        </motion.p>

        {/* ── CTA ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex flex-col gap-2"
          style={{ marginTop: '40px' }}
        >
          <button
            id="cta-hero-simular"
            data-tracking="hero_simular_click"
            onClick={() => setModalOpen(true)}
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
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.40)' }}>
            *Consulte condições.
          </span>
        </motion.div>

      </div>

      <SimulacaoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
