import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import portoBankLogo from '../../assets/logo-portobank.png';
import { SimulacaoModal } from './SimulacaoModal';

const BLUE = '#009cde';
const BLUE_HOVER = '#0089c4';

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
      className="w-full py-10"
      style={{ height: '92vh' }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <img
          src="/imagens/banner-azul.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0 z-10 flex flex-col items-start justify-center px-8 sm:px-16 lg:px-24"
          style={{ maxWidth: '800px', paddingTop: '80px', paddingBottom: '80px' }}
        >
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
            A parceira que transforma<br />
            planos em realidade
          </motion.h1>

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
            Mais de 20 anos conectando pessoas às melhores soluções no Brasil.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex flex-col gap-2"
            style={{ marginTop: '40px' }}
          >
            <motion.button
              id="cta-hero-simular"
              data-tracking="hero_simular_click"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 text-white rounded-xl"
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
              whileHover={{
                backgroundColor: BLUE_HOVER,
                y: -2,
                boxShadow: '0 12px 40px rgba(0,156,222,0.65)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              Simular agora
              <ArrowRight size={18} />
            </motion.button>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.40)' }}>
              *Consulte condições.
            </span>
          </motion.div>
        </div>
      </div>

      <SimulacaoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
