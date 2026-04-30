import { PiggyBank, Zap, Scale, CheckCircle, UserCheck, Activity } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ProductCarousel } from './ProductCarousel';

const benefits = [
  {
    icon: PiggyBank,
    chipColor: '#DBEAFE',
    iconColor: '#0055c4',
    title: 'Planejamento financeiro',
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
    title: 'Sem burocracia',
    description: 'O processo é simples e direto, sem burocracia de financiamentos tradicionais, facilitando sua aquisição.',
    idleAnimate: { scale: [1, 1.14, 1] },
    idleTransition: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
    hoverAnimate: { scale: [1, 1.28, 1] },
    hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    icon: UserCheck,
    chipColor: '#DBEAFE',
    iconColor: '#0055c4',
    title: 'Consultoria individualizada',
    description: 'Oferecemos recomendações alinhadas ao perfil e aos objetivos de cada cliente.',
    idleAnimate: { scale: [1, 1.1, 1] },
    idleTransition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 },
    hoverAnimate: { scale: [1, 1.24, 1] },
    hoverTransition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    icon: Activity,
    chipColor: '#BFDBFE',
    iconColor: '#009cde',
    title: 'Acompanhamento contínuo',
    description: 'Atuamos em todas as etapas, do diagnóstico à pós-contemplação, com suporte próximo e consistente.',
    idleAnimate: { x: [0, 3, -3, 0] },
    idleTransition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { x: [0, 5, -5, 0] },
    hoverTransition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
  },
];

type Benefit = (typeof benefits)[number];

function BenefitCard({
  benefit,
  isActive,
  onClick,
}: {
  benefit: Benefit;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const highlighted = isActive || hovered;
  const Icon = benefit.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        flex: '1 1 0',
        minWidth: 0,
        borderRadius: '16px',
        padding: '22px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: isActive ? 'default' : 'pointer',
        backgroundColor: highlighted ? '#0055c4' : '#FFFFFF',
        border: `1px solid ${highlighted ? '#0055c4' : '#E5E7EB'}`,
        boxShadow: highlighted ? '0 12px 40px rgba(0,85,196,0.28)' : '0 1px 3px rgba(0,0,0,0.05)',
        transform: highlighted ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'background-color 0.7s ease, border-color 0.7s ease, box-shadow 0.7s ease, transform 0.7s ease',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
          backgroundColor: highlighted ? 'rgba(255,255,255,0.18)' : benefit.chipColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background-color 0.85s ease',
        }}
      >
        <motion.div
          animate={highlighted ? benefit.hoverAnimate : benefit.idleAnimate}
          transition={highlighted ? benefit.hoverTransition : benefit.idleTransition}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon size={22} color={highlighted ? '#FFFFFF' : benefit.iconColor} />
        </motion.div>
      </div>

      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: 1.3,
          color: highlighted ? '#FFFFFF' : '#111827',
          transition: 'color 0.85s ease',
        }}
      >
        {benefit.title}
      </h3>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          lineHeight: 1.65,
          color: highlighted ? 'rgba(255,255,255,0.82)' : '#6B7280',
          transition: 'color 0.85s ease, opacity 0.85s ease',
          opacity: isActive ? 1 : 0.8,
        }}
      >
        {benefit.description}
      </p>
    </div>
  );
}

export function BenefitsSection() {
  const [active, setActive] = useState(0);
  const n = benefits.length;

  const next = useCallback(() => setActive(p => (p + 1) % n), [n]);

  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section
      id="beneficios"
      className="relative z-10 px-4 sm:px-8 lg:px-16"
      style={{
        paddingTop: 'clamp(48px, 6vw, 64px)',
        paddingBottom: 'clamp(56px, 7vw, 80px)',
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

        {/* ── Desktop: uma linha com destaque ── */}
        <div className="hidden lg:flex gap-3">
          {benefits.map((b, i) => (
            <BenefitCard
              key={i}
              benefit={b}
              isActive={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        {/* ── Mobile/tablet: grid 2 colunas ── */}
        <div className="lg:hidden grid grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <BenefitCard
              key={i}
              benefit={b}
              isActive={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
