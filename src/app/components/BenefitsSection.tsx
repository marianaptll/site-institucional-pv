import { PiggyBank, Zap, Scale, CheckCircle } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ProductCarousel } from './ProductCarousel';

const benefits = [
  {
    icon: PiggyBank,
    chipColor: '#DBEAFE',
    iconColor: '#0055c4',
    title: 'Planejamento Financeiro',
    description: 'O consórcio é uma alternativa inteligente para quem deseja se planejar financeiramente para a aquisição de bens.',
    idleAnimate: { y: [0, -5, 0] },
    idleTransition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { y: [0, -9, 0] },
    hoverTransition: { duration: 0.55, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    icon: Zap,
    chipColor: '#BFDBFE',
    iconColor: '#009cde',
    title: 'Possibilidade de antecipação',
    description: 'Se desejar, você pode dar lances para antecipar a contemplação e conquistar seu bem mais rapidamente.',
    idleAnimate: { scale: [1, 1.18, 1], rotate: [0, 5, -5, 0] },
    idleTransition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { scale: [1, 1.35, 1], rotate: [0, 10, -10, 0] },
    hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    icon: Scale,
    chipColor: '#DBEAFE',
    iconColor: '#0055c4',
    title: 'Segurança jurídica',
    description: 'O consórcio é regulamentado pelo Banco Central e oferece total segurança para os participantes, garantindo seus direitos.',
    idleAnimate: { rotate: [-8, 8, -8] },
    idleTransition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { rotate: [-14, 14, -14] },
    hoverTransition: { duration: 0.7, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    icon: CheckCircle,
    chipColor: '#BFDBFE',
    iconColor: '#009cde',
    title: 'Sem Burocracia',
    description: 'O processo é simples e direto, sem burocracia de financiamentos tradicionais, facilitando sua aquisição.',
    idleAnimate: { scale: [1, 1.14, 1] },
    idleTransition: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
    hoverAnimate: { scale: [1, 1.28, 1] },
    hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' },
  },
];

type Benefit = (typeof benefits)[number];

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const [hovered, setHovered] = useState(false);
  const Icon = benefit.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl p-6 flex flex-col gap-4 cursor-default"
      style={{
        backgroundColor: hovered ? '#0055c4' : '#FFFFFF',
        border: `1px solid ${hovered ? '#0055c4' : '#E5E7EB'}`,
        boxShadow: hovered ? '0 8px 32px rgba(0,85,196,0.25)' : undefined,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.3s',
      }}
    >
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: hovered ? 'rgba(255,255,255,0.18)' : benefit.chipColor,
          transition: 'background-color 0.3s',
        }}
      >
        <motion.div
          animate={hovered ? benefit.hoverAnimate : benefit.idleAnimate}
          transition={hovered ? benefit.hoverTransition : benefit.idleTransition}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon size={22} color={hovered ? '#FFFFFF' : benefit.iconColor} />
        </motion.div>
      </div>

      <h3
        className="text-[15px]"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          color: hovered ? '#FFFFFF' : '#111827',
          transition: 'color 0.3s',
        }}
      >
        {benefit.title}
      </h3>

      <p
        className="text-[13px] leading-relaxed flex-1"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: hovered ? 'rgba(255,255,255,0.8)' : '#6B7280',
          transition: 'color 0.3s',
        }}
      >
        {benefit.description}
      </p>
    </div>
  );
}

export function BenefitsSection() {
  return (
    <section
      id="beneficios"
      className="relative z-10 px-4 sm:px-8 lg:px-16"
      style={{
        paddingTop: '16px',
        paddingBottom: '104px',
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Carrossel de produtos ── */}
        <ProductCarousel />

        {/* ── Header benefícios ── */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <SectionLabel>Por que consórcio?</SectionLabel>
            <h2
              className="text-[36px] leading-[1.15]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
            >
              <span className="block text-[#111827]">As vantagens que fazem</span>
              <span className="block text-[#0055c4]">toda a diferença</span>
            </h2>
          </div>
        </div>

        {/* ── Grid de benefícios ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <BenefitCard key={i} benefit={b} />
          ))}
        </div>

      </div>
    </section>
  );
}