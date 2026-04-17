import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
const videoFachada = 'https://awxqeqjaatuacnqlvxcw.supabase.co/storage/v1/object/public/videos-projeto/video-fachada2.mp4';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { FAQItem } from '../components/FAQItem';
import type { FAQEntry } from '../components/FAQItem';
import { Users, FileText, MapPin, TrendingUp, Star, Globe, Award, BarChart2, ArrowRight } from 'lucide-react';
import { SectionLabel } from '../components/SectionLabel';
import { NumerosBar } from '../components/NumerosBar';

const faqsSobreNos: FAQEntry[] = [
  {
    question: 'Quem é a Porto Vale?',
    answer: 'A Porto Vale é a maior corretora de consórcios da rede Porto Seguro no Brasil, fundada em 2003, com excelência reconhecida na categoria Blue.',
  },
  {
    question: 'A Porto Vale faz parte da Porto Seguro?',
    answer: 'Somos uma corretora parceira da Porto Seguro, autorizada a comercializar os consórcios da marca com atendimento exclusivo e especializado.',
  },
  {
    question: 'Onde a Porto Vale está localizada?',
    answer: 'Atuamos com sede em São José dos Campos (SP) e filiais em Jacareí (SP) e na capital paulista.',
  },
  {
    question: 'A Porto Vale atende clientes de todo o Brasil?',
    answer: 'Sim. Atendemos clientes em todo o país com agilidade, segurança e um time especializado pronto para oferecer a melhor experiência.',
  },
];

const numerosStats = [
  {
    icon: Users,
    value: '+53 mil',
    label: 'clientes atendidos',
    idleAnimate: { scale: [1, 1.14, 1] } as object,
    idleTransition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { scale: [1, 1.3, 1] } as object,
    hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    icon: FileText,
    value: '+80 mil',
    label: 'cotas de consórcio negociadas',
    idleAnimate: { rotate: [-4, 4, -4] } as object,
    idleTransition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { rotate: [-8, 8, -8] } as object,
    hoverTransition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    icon: TrendingUp,
    value: '+R$ 20,5 bi',
    label: 'em crédito comercializado',
    idleAnimate: { y: [0, -5, 0] } as object,
    idleTransition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { y: [0, -9, 0] } as object,
    hoverTransition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    icon: MapPin,
    value: '+3 mil',
    label: 'cidades com presença no Brasil',
    idleAnimate: { y: [0, -4, 0] } as object,
    idleTransition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { y: [0, -8, 0] } as object,
    hoverTransition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
];

const diferenciais = [
  {
    icon: Star,
    title: 'Especialização em consórcios e seguros',
    desc: 'Atuação focada em planejamento financeiro e aquisição de bens.',
    idleAnimate: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } as object,
    idleTransition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { scale: [1, 1.4, 1], rotate: [0, 20, -20, 0] } as object,
    hoverTransition: { duration: 0.4, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    icon: Globe,
    title: 'Estrutura nacional',
    desc: 'Atendimento consultivo para clientes em todo o Brasil.',
    idleAnimate: { rotate: [0, 7, -7, 0] } as object,
    idleTransition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { rotate: [0, 16, -16, 0] } as object,
    hoverTransition: { duration: 0.65, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    icon: Award,
    title: 'Maior corretora da rede Porto',
    desc: 'Acesso a soluções financeiras consolidadas no mercado.',
    idleAnimate: { y: [0, -5, 0] } as object,
    idleTransition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { y: [0, -10, 0] } as object,
    hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    icon: BarChart2,
    title: 'Histórico consistente de resultados',
    desc: 'Reconhecimento recorrente pelo desempenho comercial.',
    idleAnimate: { scale: [1, 1.16, 1] } as object,
    idleTransition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { scale: [1, 1.35, 1] } as object,
    hoverTransition: { duration: 0.4, repeat: Infinity, ease: 'easeInOut' as const },
  },
];

type StatItem = typeof numerosStats[number];
type DiferencialItem = typeof diferenciais[number];

function StatCard({ icon: Icon, value, label, idleAnimate, idleTransition, hoverAnimate, hoverTransition }: StatItem) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? '#1a2537' : '#111827',
        padding: 'clamp(20px, 4vw, 40px) clamp(16px, 3vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'background-color 0.3s',
        cursor: 'default',
      }}
    >
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: hovered ? 'rgba(0,156,222,0.22)' : 'rgba(0,156,222,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
        <motion.div
          animate={hovered ? hoverAnimate : idleAnimate}
          transition={hovered ? hoverTransition : idleTransition}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon size={20} color="#009cde" strokeWidth={1.8} />
        </motion.div>
      </div>
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(26px, 3vw, 40px)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: '#009cde',
        }}
      >
        {value}
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>
        {label}
      </p>
    </div>
  );
}

function DiferencialCard({ icon: Icon, title, desc, idleAnimate, idleTransition, hoverAnimate, hoverTransition }: DiferencialItem) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '32px 28px',
        border: `1px solid ${hovered ? '#2563EB' : '#E5E7EB'}`,
        boxShadow: hovered ? '0 8px 24px rgba(37,99,235,0.12)' : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        cursor: 'default',
      }}
    >
      <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={hovered ? hoverAnimate : idleAnimate}
          transition={hovered ? hoverTransition : idleTransition}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon size={22} color="#2563EB" strokeWidth={1.6} />
        </motion.div>
      </div>
      <div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#111827', lineHeight: 1.4, marginBottom: '8px' }}>
          {title}
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}


export function SobreNos() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    carouselRef.current?.scrollBy({ left: dir === 'right' ? 220 : -220, behavior: 'smooth' });
  };

  return (
    <>
      <Header />

      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif" }}>

        {/* ── 1. HERO ── */}
        <section style={{ position: 'relative', height: 'clamp(320px, 55vh, 600px)', overflow: 'visible' }}>
          <img
            src="/imagens/fachada-pv-vazia.png"
            alt="Fachada Porto Vale"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.55) 100%)' }} />

          {/* Carrossel sobreposto */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, transform: 'translateY(50%)', zIndex: 20, padding: '0 24px' }}>
            <div className="max-w-7xl mx-auto" style={{ position: 'relative' }}>

              <button
                onClick={() => scroll('left')}
                className="hidden lg:flex items-center justify-center"
                style={{
                  position: 'absolute', left: '-18px', top: '50%', transform: 'translateY(-50%)',
                  zIndex: 10, width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: '#fff', border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                onClick={() => scroll('right')}
                className="hidden lg:flex items-center justify-center"
                style={{
                  position: 'absolute', right: '-18px', top: '50%', transform: 'translateY(-50%)',
                  zIndex: 10, width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: '#fff', border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 12px 48px rgba(0,0,0,0.14)', overflow: 'hidden' }}>
                <div ref={carouselRef} style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        flexShrink: 0,
                        width: 'clamp(140px, 18vw, 200px)',
                        height: 'clamp(88px, 11vw, 120px)',
                        borderRadius: '12px',
                        background: '#e8e4de',
                        backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 40%)',
                        backgroundSize: '16px 16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.20)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. HERO TEXT ── */}
        <section
          style={{
            backgroundColor: '#111827',
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(56px, 10vw, 96px) clamp(24px, 6vw, 96px)',
            paddingTop: 'calc(96px + clamp(56px, 7vw, 84px))',
            borderRadius: '0 0 28px 28px',
          }}
        >
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,156,222,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <SectionLabel center>Sobre a Porto Vale</SectionLabel>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(28px, 3.2vw, 52px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#fff',
                maxWidth: '720px',
                margin: '0 0 24px',
              }}
            >
              Mais de duas décadas conectando pessoas às melhores{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>
                soluções em consórcios
              </span>{' '}
              e seguros no Brasil.
            </h1>
            <div style={{ width: '40px', height: '1.5px', background: 'rgba(255,255,255,0.15)', marginBottom: '24px' }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, maxWidth: '560px', margin: 0 }}>
              A Porto Vale é a maior corretora de consórcios da rede Porto, com atuação nacional e histórico de crescimento consistente no mercado de crédito planejado.
            </p>
          </div>
        </section>

        {/* ── 3. QUEM SOMOS ── */}
        <section style={{ backgroundColor: '#fff', padding: 'clamp(56px, 10vw, 96px) 24px' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Esquerda — vídeo */}
              <div style={{ position: 'relative' }}>
                <div className="hidden lg:block" style={{ position: 'absolute', top: '20px', left: '20px', right: '-20px', bottom: '-20px', borderRadius: '20px', border: '1.5px solid rgba(37,99,235,0.20)', pointerEvents: 'none', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 56px rgba(0,0,0,0.12)' }}>
                  <video
                    src={videoFachada}
                    autoPlay muted loop playsInline
                    style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>

              {/* Direita — texto */}
              <div>
                <SectionLabel>Quem somos</SectionLabel>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(26px, 3vw, 42px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#111827',
                    marginTop: '4px',
                    marginBottom: '28px',
                  }}
                >
                  Nossa{' '}
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>
                    história
                  </span>
                </h2>
                <div style={{ width: '40px', height: '1.5px', background: '#e5e7eb', marginBottom: '28px' }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px, 1.4vw, 16px)', color: '#374151', lineHeight: 1.9, marginBottom: '20px' }}>
                  Fundada há mais de 20 anos, a Porto Vale se consolidou como a maior corretora de consórcios e seguros da Porto, com operação nacional. Desde a sua criação, a empresa se destacou por combinar expertise em consórcios, inovação em seguros e atendimento de excelência, oferecendo soluções que transformam sonhos em realizações concretas.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px, 1.4vw, 16px)', color: '#6B7280', lineHeight: 1.9, margin: 0 }}>
                  Com matriz em São José dos Campos (SP) e filiais em Jacareí (SP) e São Paulo, a Porto Vale atua em todo o território nacional, mantendo credibilidade, performance e consistência em seus resultados.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. NÚMEROS ── */}
        <section style={{ backgroundColor: '#111827' }}>
          <NumerosBar />
        </section>

        {/* ── 5. CRESCIMENTO RECENTE ── */}
        <section style={{ backgroundColor: '#f8f7f5', padding: 'clamp(56px, 10vw, 96px) 24px' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

              {/* Esquerda */}
              <div className="lg:sticky lg:top-28">
                <SectionLabel>Crescimento recente</SectionLabel>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(26px, 3vw, 42px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#111827',
                    marginTop: '4px',
                    marginBottom: '20px',
                  }}
                >
                  Crescimento que{' '}
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>
                    reflete confiança
                  </span>
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', lineHeight: 1.8, margin: 0 }}>
                  Esses números demonstram a fase atual de crescimento e consolidação da empresa.
                </p>

                {/* Mini gráfico */}
                <div style={{ marginTop: '40px', background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#9CA3AF', marginBottom: '16px' }}>
                    Cotas comercializadas
                  </p>
                  <svg width="100%" height="72" viewBox="0 0 200 72" preserveAspectRatio="none">
                    <line x1="0" y1="71" x2="200" y2="71" stroke="#F3F4F6" strokeWidth="1"/>
                    {[
                      { x: 10, h: 28, label: '2023' },
                      { x: 75, h: 45, label: '2024' },
                      { x: 140, h: 66, label: '2025', highlight: true },
                    ].map(({ x, h, label, highlight }) => (
                      <g key={label}>
                        <rect x={x} y={72 - h} width="40" height={h} rx="6" fill={highlight ? '#2563EB' : '#E5E7EB'}/>
                        <text x={x + 20} y="71" textAnchor="middle" fontSize="9" fill="#9CA3AF" dy="10" fontFamily="Inter, sans-serif">{label}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Direita — 3 stat cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div style={{ background: '#111827', borderRadius: '20px', padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3vw, 32px)' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1, color: '#009cde', marginBottom: '8px' }}>
                    20 mil
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.6, margin: '0 0 12px' }}>
                    cotas comercializadas em 2025
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,156,222,0.15)', borderRadius: '20px', padding: '4px 12px' }}>
                    <TrendingUp size={12} color="#009cde"/>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#009cde' }}>+48% na comparação anual</span>
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '20px', padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3vw, 32px)' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1, color: '#111827', marginBottom: '8px' }}>
                    R$ 5,3 bi
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7280', lineHeight: 1.6, margin: '0 0 12px' }}>
                    movimentados em crédito no ano
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', borderRadius: '20px', padding: '4px 12px' }}>
                    <TrendingUp size={12} color="#2563EB"/>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>+54% em relação a 2024</span>
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '20px', padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3vw, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1, color: '#111827', marginBottom: '8px' }}>
                      600
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                      colaboradores na operação nacional
                    </p>
                  </div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users size={24} color="#374151" strokeWidth={1.6}/>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── 7. DIFERENCIAIS ── */}
        <section style={{ backgroundColor: '#f3f4f6', padding: 'clamp(56px, 10vw, 96px) 24px' }}>
          <div className="max-w-7xl mx-auto">

            <div style={{ marginBottom: '56px' }}>
              <SectionLabel>Diferenciais</SectionLabel>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(26px, 3vw, 42px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#111827',
                  marginTop: '4px',
                }}
              >
                O que nos{' '}
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>
                  diferencia
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '16px' }}>
              {diferenciais.map((item, i) => (
                <DiferencialCard key={i} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. BLOCO FINAL ── */}
        <section
          style={{
            backgroundColor: '#111827',
            padding: 'clamp(64px, 12vw, 120px) 24px',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <p
              style={{
                fontFamily: 'Georgia, serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 'clamp(28px, 4vw, 52px)',
                lineHeight: 1.25,
                color: '#fff',
                marginBottom: '48px',
              }}
            >
              "Onde cuidado, tem Porto Vale."
            </p>
            <button
              onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#009cde',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                padding: '14px 32px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.01em',
              }}
            >
              Conheça nossas soluções
              <ArrowRight size={16} strokeWidth={2}/>
            </button>
          </div>
        </section>

        {/* ── 9. FAQ ── */}
        <section style={{ backgroundColor: '#fff', padding: 'clamp(56px, 10vw, 96px) 24px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ marginBottom: '48px' }}>
              <SectionLabel>Perguntas frequentes</SectionLabel>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827', marginTop: '4px' }}>
                Dúvidas sobre{' '}
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>
                  a Porto Vale?
                </span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqsSobreNos.map((faq, i) => (
                <FAQItem key={i} faq={faq} isOpen={openIndex === i} onToggle={() => toggle(i)} />
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
