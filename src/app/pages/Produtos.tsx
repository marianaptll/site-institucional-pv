import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { BadgePercent, TrendingDown, RefreshCw, Target, ClipboardList, CalendarCheck, Trophy, Key, Check, Home, Building2, Briefcase, TrendingUp, Hammer, Info, ChevronLeft, ChevronRight, Car, Truck, Zap, Shield, MapPin, Sprout, Landmark, Paintbrush, Layers, Bike, PiggyBank, Coins, HandCoins, Sun, Factory, BatteryCharging, Recycle, Globe, Lightbulb, Settings2, Store, Forklift } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { FAQItem } from '../components/FAQItem';
import type { FAQEntry } from '../components/FAQItem';
import { WHATSAPP_URL } from '../constants';
import { SectionLabel } from '../components/SectionLabel';

// ── Seção de vantagens ───────────────────────────────────────────────────────

const vantagens = [
  {
    icon: BadgePercent,
    title: 'Sem juros e sem entrada',
    desc: 'Você paga apenas a taxa de administração, sem cobranças de juros e sem necessidade de entrada para começar.',
    color: '#EFF6FF',
    iconColor: '#2563EB',
    idleAnimate: { rotate: [0, -8, 8, 0] } as object,
    idleTransition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { rotate: [0, -15, 15, 0] } as object,
    hoverTransition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    icon: TrendingDown,
    title: 'Planos com parcela reduzida',
    desc: 'Prazos flexíveis e parcelas que cabem no seu orçamento, permitindo um planejamento tranquilo e sem surpresas.',
    color: '#111827',
    iconColor: '#009cde',
    dark: true,
    idleAnimate: { y: [0, 5, 0] } as object,
    idleTransition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { y: [0, 9, 0] } as object,
    hoverTransition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    icon: RefreshCw,
    title: 'Reajuste anual pelo INCC',
    desc: 'Seu crédito é reajustado anualmente pelo INCC, garantindo que o poder de compra acompanhe a valorização do mercado.',
    color: '#f8f7f5',
    iconColor: '#2563EB',
    idleAnimate: { rotate: [0, 180, 360] } as object,
    idleTransition: { duration: 4, repeat: Infinity, ease: 'linear' as const },
    hoverAnimate: { rotate: [0, 180, 360] } as object,
    hoverTransition: { duration: 1.2, repeat: Infinity, ease: 'linear' as const },
  },
  {
    icon: Target,
    title: 'Melhor planejamento financeiro',
    desc: 'Organize seus objetivos com previsibilidade e disciplina, construindo patrimônio de forma inteligente e segura.',
    color: '#EFF6FF',
    iconColor: '#2563EB',
    idleAnimate: { scale: [1, 1.14, 1] } as object,
    idleTransition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.4 },
    hoverAnimate: { scale: [1, 1.28, 1] } as object,
    hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' as const },
  },
];

type Vantagem = typeof vantagens[number];

function VantagemCard({ icon: Icon, title, desc, color, iconColor, dark, idleAnimate, idleTransition, hoverAnimate, hoverTransition }: Vantagem) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: color,
        borderRadius: '24px',
        padding: '36px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered ? (dark ? '0 8px 28px rgba(0,156,222,0.18)' : '0 8px 24px rgba(37,99,235,0.10)') : 'none',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        cursor: 'default',
      }}
    >
      {/* Ícone decorativo de fundo */}
      <div style={{ position: 'absolute', bottom: '-12px', right: '-12px', opacity: dark ? 0.07 : 0.05, pointerEvents: 'none' }}>
        <Icon size={120} color={iconColor} strokeWidth={1} />
      </div>

      {/* Ícone animado */}
      <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: dark ? 'rgba(0,156,222,0.15)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: dark ? 'none' : '0 2px 10px rgba(0,0,0,0.07)', position: 'relative', zIndex: 1 }}>
        <motion.div
          animate={hovered ? hoverAnimate : idleAnimate}
          transition={hovered ? hoverTransition : idleTransition}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon size={24} color={iconColor} strokeWidth={1.6} />
        </motion.div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: dark ? '#fff' : '#111827', lineHeight: 1.35, marginBottom: '10px' }}>
          {title}
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: dark ? 'rgba(255,255,255,0.55)' : '#6B7280', lineHeight: 1.75, margin: 0 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

function VantagensSection() {
  return (
    <section style={{ backgroundColor: '#fff', padding: 'clamp(64px, 10vw, 104px) 24px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Cabeçalho */}
        <div style={{ marginBottom: '48px' }}>
          <SectionLabel>Por que escolher?</SectionLabel>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827', margin: 0 }}>
            Confira e aproveite as{' '}
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>
              vantagens
            </span>
          </h2>
        </div>

        {/* Grid de cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vantagens.map((v, i) => (
            <VantagemCard key={i} {...v} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#009cde',
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 600,
              padding: '14px 36px',
              borderRadius: '12px',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            Falar com um consultor
          </a>
        </div>

      </div>
    </section>
  );
}

// ── Seção de etapas ──────────────────────────────────────────────────────────

const etapas = [
  {
    numero: '01',
    fase: 'Adesão',
    icon: ClipboardList,
    title: 'Escolha o seu plano',
    description: 'Com a orientação de um consultor Porto Vale, você define o valor do crédito, o prazo e as parcelas ideais para o seu perfil financeiro — tudo com transparência, sem surpresas.',
    bullets: [
      'Escolha o valor do crédito e o prazo',
      'Defina parcelas que cabem no seu orçamento',
      'Assine o contrato e ingresse no grupo',
    ],
    cor: '#2563EB',
    bg: '#EFF6FF',
    dark: false,
    idleAnimate: { rotate: [-4, 4, -4] } as object,
    idleTransition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { rotate: [-8, 8, -8] } as object,
    hoverTransition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    numero: '02',
    fase: 'Contribuição',
    icon: CalendarCheck,
    title: 'Contribua mensalmente',
    description: 'Você paga suas parcelas mês a mês, sem juros, e participa das assembleias mensais do grupo, onde ocorrem os sorteios e onde você pode oferecer lances para antecipar a contemplação.',
    bullets: [
      'Parcelas fixas sem nenhuma cobrança de juros',
      'Assembleias mensais com sorteios para todos',
      'Acumule crédito para ofertar lances livres',
    ],
    cor: '#009cde',
    bg: 'rgba(0,156,222,0.10)',
    dark: false,
    idleAnimate: { scale: [1, 1.14, 1] } as object,
    idleTransition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.2 },
    hoverAnimate: { scale: [1, 1.28, 1] } as object,
    hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    numero: '03',
    fase: 'Contemplação',
    icon: Trophy,
    title: 'Seja contemplado',
    description: 'A contemplação pode acontecer a qualquer momento durante a vigência do grupo — seja pelo sorteio mensal, que dá chances iguais a todos, seja antecipando com um lance livre ou fixo.',
    bullets: [
      'Sorteio mensal com chances para todos os cotistas',
      'Lance livre: oferte um percentual do crédito',
      'Lance fixo: valor pré-definido pelo grupo',
    ],
    cor: '#2563EB',
    bg: '#EFF6FF',
    dark: false,
    idleAnimate: { y: [0, -5, 0] } as object,
    idleTransition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { y: [0, -10, 0] } as object,
    hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' as const },
  },
  {
    numero: '04',
    fase: 'Realização',
    icon: Key,
    title: 'Realize a sua conquista',
    description: 'Com a carta de crédito em mãos, você adquire o bem desejado com todo o poder de compra à vista, podendo negociar melhores condições diretamente com o vendedor.',
    bullets: [
      'Carta de crédito equivale a pagamento à vista',
      'Negocie descontos diretamente com o fornecedor',
      'Parcelas restantes continuam normalmente',
    ],
    cor: '#009cde',
    bg: 'rgba(0,156,222,0.10)',
    dark: false,
    idleAnimate: { rotate: [0, -10, 10, 0] } as object,
    idleTransition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { rotate: [0, -18, 18, 0] } as object,
    hoverTransition: { duration: 0.65, repeat: Infinity, ease: 'easeInOut' as const },
  },
];

function EtapasSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{ backgroundColor: '#fff', padding: 'clamp(64px, 10vw, 104px) 24px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Cabeçalho */}
        <div style={{ marginBottom: '56px', maxWidth: '600px' }}>
          <SectionLabel>Como funciona</SectionLabel>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827', margin: 0 }}>
            Do início à{' '}
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>realização</span>
            {' '}— passo a passo
          </h2>
        </div>

        {/* Steps — 2 colunas desktop */}
        <div className="grid sm:grid-cols-2 gap-px" style={{ background: '#E5E7EB', borderRadius: '24px', overflow: 'hidden' }}>
          {etapas.map(({ numero, fase, icon: Icon, title, description, cor, bg, idleAnimate, idleTransition, hoverAnimate, hoverTransition }, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? '#F8FBFF' : '#fff',
                padding: 'clamp(28px, 4vw, 44px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'background 0.25s',
                cursor: 'default',
              }}
            >
              {/* Número grande + ícone */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: 1, color: hovered === i ? cor : '#E5E7EB', transition: 'color 0.3s', userSelect: 'none' }}>
                  {numero}
                </span>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <motion.div
                    animate={hovered === i ? hoverAnimate : idleAnimate}
                    transition={hovered === i ? hoverTransition : idleTransition}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Icon size={24} color={cor} strokeWidth={1.6} />
                  </motion.div>
                </div>
              </div>

              {/* Fase + título */}
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#9CA3AF', marginBottom: '8px' }}>
                  {fase}
                </p>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(17px, 1.8vw, 22px)', color: '#111827', lineHeight: 1.2, margin: '0 0 12px' }}>
                  {title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', lineHeight: 1.75, margin: 0 }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Depoimento + CTA (seção unificada) ──────────────────────────────────────

function DepoimentoCTASection() {
  return (
    <section style={{ backgroundColor: '#111827', padding: 'clamp(64px, 10vw, 104px) 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">

          {/* Esquerda — depoimento */}
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '72px', lineHeight: 0.7, color: '#009cde', opacity: 0.4, marginBottom: '24px', userSelect: 'none' }}>"</div>
            <blockquote style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(17px, 2vw, 24px)', color: '#fff', lineHeight: 1.7, margin: '0 0 32px', letterSpacing: '-0.01em' }}>
              Eu não acreditava que seria tão simples. Em menos de dois anos fui contemplada e hoje tenho o apartamento que sempre sonhei — sem pagar um centavo de juros.
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', background: '#374151', flexShrink: 0 }}>
                <img src="/imagens/antonieta-amarante.png" alt="Antonieta Amarante" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '14px', color: '#fff', margin: 0 }}>Antonieta Amarante</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>Cliente Porto Vale · São Paulo, SP</p>
              </div>
            </div>
          </div>

          {/* Direita — CTA */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '28px', padding: 'clamp(32px, 4vw, 48px)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 4vw, 56px)', color: '#009cde', lineHeight: 1, margin: '0 0 8px' }}>
                +10.000
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>
                famílias já realizaram o sonho do imóvel próprio com o consórcio Porto Seguro.
              </p>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(16px, 1.8vw, 20px)', color: '#fff', lineHeight: 1.35, margin: '0 0 20px' }}>
                Pronto para realizar o seu?
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: '#009cde',
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '14px 24px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                }}
              >
                Falar com um consultor
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── FAQ da página de produto ─────────────────────────────────────────────────

const faqsProduto: FAQEntry[] = [
  {
    question: 'Pergunta frequente 1 — a ser preenchida',
    answer: 'Resposta da pergunta 1 — a ser preenchida.',
  },
  {
    question: 'Pergunta frequente 2 — a ser preenchida',
    answer: 'Resposta da pergunta 2 — a ser preenchida.',
  },
  {
    question: 'Pergunta frequente 3 — a ser preenchida',
    answer: 'Resposta da pergunta 3 — a ser preenchida.',
  },
  {
    question: 'Pergunta frequente 4 — a ser preenchida',
    answer: 'Resposta da pergunta 4 — a ser preenchida.',
  },
];

function FAQProdutoSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section style={{ backgroundColor: '#f8f7f5', padding: 'clamp(64px, 10vw, 104px) 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">

          {/* Esquerda — card de contato */}
          <div className="lg:sticky" style={{ top: '96px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '2px', backgroundColor: '#2563EB' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#2563EB' }}>
                Dúvidas frequentes
              </span>
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 2.8vw, 38px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827', margin: '0 0 16px' }}>
              Ainda ficou com{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>dúvidas?</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7280', lineHeight: 1.75, margin: '0 0 32px' }}>
              Nossa equipe está disponível para responder tudo o que você precisar — sem compromisso.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#25D366',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                padding: '14px 24px',
                borderRadius: '14px',
                textDecoration: 'none',
                marginBottom: '16px',
                width: '100%',
                justifyContent: 'center',
                boxSizing: 'border-box' as const,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L0 24l6.335-1.508A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.367l-.36-.214-3.76.895.952-3.664-.234-.375A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z"/>
              </svg>
              Falar pelo WhatsApp
            </a>

            {/* Linha de alternativa */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#9CA3AF', textAlign: 'center', margin: 0 }}>
              Atendimento de segunda a sexta, das 8h às 18h
            </p>
          </div>

          {/* Direita — accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqsProduto.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Barra flutuante de CTA ───────────────────────────────────────────────────

const benefitChips = ['Sem juros', 'Sem entrada', 'Parcelas flexíveis'];

function FloatingCTABar({ titulo, categoria }: { titulo: string; categoria: string }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: '#fff',
        borderTop: '1.5px solid #E5E7EB',
        boxShadow: '0 -6px 32px rgba(0,0,0,0.09)',
      }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{ padding: '0 clamp(12px, 4vw, 24px)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
      >

        {/* Esquerda — identidade do produto */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '4px', height: '36px', borderRadius: '4px', background: 'linear-gradient(to bottom, #2563EB, #009cde)', flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 1.4vw, 15px)', color: '#111827', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {titulo}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
              {categoria}
            </p>
          </div>
        </div>

        {/* Centro — chips de benefício (ocultos no mobile) */}
        <div className="hidden md:flex" style={{ gap: '8px', flexShrink: 0 }}>
          {benefitChips.map(chip => (
            <span
              key={chip}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                color: '#2563EB',
                background: '#EFF6FF',
                padding: '5px 12px',
                borderRadius: '20px',
                whiteSpace: 'nowrap' as const,
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Direita — CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#009cde',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(13px, 1.3vw, 15px)',
            fontWeight: 600,
            padding: '11px 24px',
            borderRadius: '12px',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap' as const,
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L0 24l6.335-1.508A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.367l-.36-.214-3.76.895.952-3.664-.234-.375A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z"/>
          </svg>
          Falar com consultor
        </a>

      </div>
    </motion.div>
  );
}

// ── Template base das páginas de produto ────────────────────────────────────

interface ProdutoPageProps {
  categoria: string;
  titulo: string;
  subtitulo: string;
  children?: ReactNode;
}

function ProdutoPageBlank({ categoria, titulo, subtitulo, children }: ProdutoPageProps) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif" }}>

        {/* Hero */}
        <section
          style={{
            backgroundColor: '#111827',
            padding: 'clamp(72px, 12vw, 120px) clamp(24px, 6vw, 96px)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 0 28px 28px',
            textAlign: 'center',
          }}
        >
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,156,222,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '28px', height: '2px', backgroundColor: '#009cde' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#009cde' }}>
                {categoria}
              </span>
              <div style={{ width: '28px', height: '2px', backgroundColor: '#009cde' }} />
            </div>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#fff',
                margin: '0 0 20px',
              }}
            >
              {titulo}
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(15px, 1.5vw, 18px)',
                color: 'rgba(255,255,255,0.50)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {subtitulo}
            </p>
          </div>
        </section>

        {/* Conteúdo personalizado por produto */}
        {children}

        {/* Vantagens */}
        <VantagensSection />

        {/* Etapas */}
        <EtapasSection />

        {/* FAQ */}
        <FAQProdutoSection />

        {/* Placeholder — exibido apenas enquanto a página não tem conteúdo próprio */}
        {!children && (
          <section style={{ backgroundColor: '#f8f7f5', padding: 'clamp(64px, 10vw, 100px) 24px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: '#fff', border: '1.5px dashed #D1D5DB', borderRadius: '20px', padding: '48px 64px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#111827', margin: 0 }}>Mais conteúdo em breve</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#9CA3AF', margin: 0, maxWidth: '300px', lineHeight: 1.6 }}>Novas seções serão adicionadas a esta página em breve.</p>
            </div>
          </section>
        )}

        {/* Espaço para a barra flutuante não sobrepor o footer */}
        <div style={{ height: '64px' }} />

      </main>
      <Footer />
      <ChatWidget />
      <FloatingCTABar titulo={titulo} categoria={categoria} />
    </>
  );
}

// ── Seções reutilizáveis — Editorial / Tipos / Ofertas ──────────────────────

interface TipoItem { icon: React.ElementType; label: string; desc: string; }
interface StatItem { label: string; value: string; }
interface EditorialConfig {
  badge: string;
  titulo: ReactNode;
  intro: string;
  corpo1: string;
  corpo2: string;
  callout?: ReactNode;
  stats: StatItem[];
  badgeTopo: string;
  badgeInferior: { value: string; label: string };
  imagem?: string;
  imagemPosition?: string;
}

function EditorialProdutoSection({ cfg }: { cfg: EditorialConfig }) {
  return (
    <section style={{ backgroundColor: '#fff', padding: 'clamp(64px, 10vw, 112px) 24px', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Coluna esquerda: texto */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '28px', height: '2px', backgroundColor: '#2563EB' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#2563EB' }}>
                {cfg.badge}
              </span>
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#111827', margin: '0 0 28px' }}>
              {cfg.titulo}
            </h2>
            <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(16px, 1.5vw, 19px)', color: '#374151', lineHeight: 1.85, marginBottom: '20px' }}>
              {cfg.intro}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px, 1.3vw, 16px)', color: '#6B7280', lineHeight: 1.9, marginBottom: '16px' }}>
              {cfg.corpo1}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px, 1.3vw, 16px)', color: '#6B7280', lineHeight: 1.9, marginBottom: cfg.callout ? '28px' : '32px' }}>
              {cfg.corpo2}
            </p>
            {cfg.callout && (
              <div style={{ marginBottom: '32px' }}>{cfg.callout}</div>
            )}
            <div className="grid grid-cols-3" style={{ gap: '1px', background: '#E5E7EB', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
              {cfg.stats.map(({ label, value }) => (
                <div key={label} style={{ background: '#fff', padding: '18px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 1.8vw, 22px)', color: '#009cde', lineHeight: 1 }}>{value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#9CA3AF', marginTop: '6px', lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna direita: imagem */}
          <div style={{ position: 'relative', padding: '0 20px 0 0' }}>
            <div style={{ borderRadius: '32px', overflow: 'hidden', aspectRatio: '4/5', background: '#E5E7EB', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              {cfg.imagem ? (
                <img
                  src={cfg.imagem}
                  alt=""
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: cfg.imagemPosition ?? 'center' }}
                />
              ) : (
                <>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#9CA3AF', fontWeight: 500 }}>Imagem em breve</span>
                </>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px' }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 1.4vw, 17px)', color: cfg.imagem ? '#fff' : '#6B7280', margin: '0 0 4px', lineHeight: 1.3 }}>Corretora autorizada Porto Seguro</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: cfg.imagem ? 'rgba(255,255,255,0.7)' : '#9CA3AF', margin: 0, lineHeight: 1.5 }}>Segurança e transparência em cada etapa</p>
              </div>
            </div>
            <div className="hidden sm:flex" style={{ position: 'absolute', top: '28px', right: '-16px', background: '#fff', borderRadius: '14px', padding: '12px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.13)', alignItems: 'center', gap: '10px', zIndex: 2 }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '13px', color: '#111827', whiteSpace: 'nowrap' as const }}>{cfg.badgeTopo}</span>
            </div>
            <div className="hidden sm:block" style={{ position: 'absolute', bottom: '110px', left: '-20px', background: '#111827', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 8px 28px rgba(0,0,0,0.22)', zIndex: 2, minWidth: '160px' }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '22px', color: '#009cde', lineHeight: 1, marginBottom: '4px' }}>{cfg.badgeInferior.value}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>{cfg.badgeInferior.label}</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function TiposProdutoSection({ titulo, tipos }: { titulo: ReactNode; tipos: TipoItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{ backgroundColor: '#f8f7f5', padding: 'clamp(64px, 10vw, 104px) 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '28px', height: '2px', backgroundColor: '#009cde' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#009cde' }}>Modalidades</span>
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 3vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827', margin: 0 }}>
            {titulo}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px' }}>
          {tipos.map(({ icon: Icon, label, desc }, i) => (
            <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ background: '#fff', border: `1.5px solid ${hovered === i ? '#009cde' : '#E5E7EB'}`, borderRadius: '20px', padding: '28px 22px', cursor: 'default', transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)', transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s', boxShadow: hovered === i ? '0 8px 28px rgba(0,156,222,0.12)' : 'none', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '13px', background: hovered === i ? '#E0F4FC' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', transition: 'background 0.25s' }}>
                <motion.div animate={hovered === i ? { scale: [1, 1.22, 1] } : { scale: [1, 1.07, 1] }} transition={{ duration: hovered === i ? 0.45 : 2.4, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={hovered === i ? '#009cde' : '#6B7280'} strokeWidth={1.6} />
                </motion.div>
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#111827', lineHeight: 1.25, marginBottom: '10px' }}>{label}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280', lineHeight: 1.7, margin: 0, flexGrow: 1 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Carrossel de ofertas ─────────────────────────────────────────────────────

interface Oferta { media: 'photo'; badge: string; credito: string; parcela: string; prazo: string; descricao: string; }

// ── Dados: Imóvel ────────────────────────────────────────────────────────────

const editorialImovel: EditorialConfig = {
  badge: 'Porto Vale × Porto Seguro',
  titulo: <>A forma mais inteligente de <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>realizar o sonho do imóvel próprio</span></>,
  intro: 'O consórcio imobiliário é a maneira mais inteligente, econômica e planejada de realizar o sonho da casa ou do apartamento próprio.',
  corpo1: 'O consórcio de imóveis da Porto Seguro oferece o produto ideal para cada cliente, de acordo com seus desejos e realidade financeira. A modalidade é abrangente e permite que o consorciado use sua carta de crédito para comprar uma casa, apartamento, terreno ou para investir em reforma e construção.',
  corpo2: 'Com parcelas acessíveis e sem juros, o consórcio viabiliza a concretização de um dos principais sonhos do brasileiro: a construção de um patrimônio próprio.',
  callout: (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '16px', padding: '20px 22px' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Info size={18} color="#2563EB" strokeWidth={1.8} />
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#1E40AF', lineHeight: 1.7, margin: 0 }}>
        <strong style={{ fontWeight: 700 }}>Você pode usar o FGTS</strong> para acelerar a conquista da sua carta de crédito, de acordo com as regras da Caixa Econômica Federal.
      </p>
    </div>
  ),
  stats: [{ label: 'Crédito a partir de', value: 'R$ 70 mil' }, { label: 'Taxa de juros', value: '0% a.a.' }, { label: 'Contemplação', value: 'Mensal' }],
  badgeTopo: 'Sem juros · Sem entrada',
  badgeInferior: { value: '+30 anos', label: 'de experiência no mercado' },
  imagem: '/imagens/produto-imóvel.jpg',
};

const tiposImovel: TipoItem[] = [
  { icon: Home,       label: 'Casa',                desc: 'Realize o sonho da casa própria com parcelas que cabem no seu orçamento e sem entrada obrigatória.' },
  { icon: Building2,  label: 'Apartamento',          desc: 'Invista em um apartamento em qualquer região do Brasil com total flexibilidade de uso da carta de crédito.' },
  { icon: Briefcase,  label: 'Sala Comercial',       desc: 'Adquira ou expanda seu espaço comercial com planejamento financeiro sólido e sem juros.' },
  { icon: TrendingUp, label: 'Investimento',         desc: 'Use a carta de crédito como ativo de valorização patrimonial e faça seu dinheiro trabalhar por você.' },
  { icon: Hammer,     label: 'Construção / Reforma', desc: 'Construa do zero ou renove seu imóvel com toda a flexibilidade e poder de compra do consórcio.' },
];

const ofertasImovel: Oferta[] = [
  {
    media: 'photo',
    badge: 'Entrada acessível',
    credito: 'R$ 100.000',
    parcela: '',
    prazo: '180 meses',
    descricao: 'Ideal para quem busca um apartamento compacto, terreno ou reforma. Parcelas reduzidas e contemplação mensal.',
  },
  {
    media: 'photo',
    badge: 'Mais escolhido',
    credito: 'R$ 300.000',
    parcela: '',
    prazo: '200 meses',
    descricao: 'A opção mais equilibrada para comprar casa, apartamento ou sala comercial com total flexibilidade.',
  },
  {
    media: 'photo',
    badge: 'Maior crédito',
    credito: 'R$ 500.000',
    parcela: '',
    prazo: '220 meses',
    descricao: 'Para quem quer um imóvel maior ou deseja investir com poder de compra real no mercado imobiliário.',
  },
];

function OfertaCard({ oferta, active }: { oferta: Oferta; active: boolean }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        border: active ? '2px solid #009cde' : '1.5px solid #E5E7EB',
        boxShadow: active ? '0 12px 40px rgba(0,156,222,0.14)' : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Área de mídia */}
      <div style={{ aspectRatio: '16/9', background: '#E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', position: 'relative' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Foto do imóvel</span>
        {/* Badge */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', background: active ? '#009cde' : '#6B7280', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.04em' }}>
          {oferta.badge}
        </div>
      </div>

      {/* Corpo do card */}
      <div style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
        {/* Crédito em destaque */}
        <div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Crédito</span>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#111827', lineHeight: 1, marginTop: '4px' }}>
            {oferta.credito}
          </div>
        </div>

        {/* Prazo */}
        <div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#9CA3AF' }}>Prazo: {oferta.prazo}</span>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280', lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
          {oferta.descricao}
        </p>

        {/* CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: active ? '#009cde' : '#F3F4F6',
            color: active ? '#fff' : '#374151',
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 600,
            padding: '12px 20px',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'background 0.25s, color 0.25s',
            marginTop: '4px',
          }}
        >
          Tenho interesse
        </a>
      </div>
    </div>
  );
}

function OfertasProdutoSection({ ofertas, inicial = 1 }: { ofertas: Oferta[]; inicial?: number }) {
  const [current, setCurrent] = useState(inicial);
  const total = ofertas.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section style={{ backgroundColor: '#fff', padding: 'clamp(64px, 10vw, 104px) 24px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Cabeçalho */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', backgroundColor: '#009cde' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#009cde' }}>
                Ofertas em destaque
              </span>
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827', margin: 0 }}>
              Os{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>3 planos</span>
              {' '}mais escolhidos
            </h2>
          </div>

          {/* Setas */}
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={prev}
              style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1.5px solid #E5E7EB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#009cde'; (e.currentTarget as HTMLButtonElement).style.background = '#E0F4FC'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLButtonElement).style.background = '#fff'; }}
              aria-label="Anterior"
            >
              <ChevronLeft size={18} color="#374151" />
            </button>
            <button
              onClick={next}
              style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1.5px solid #E5E7EB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#009cde'; (e.currentTarget as HTMLButtonElement).style.background = '#E0F4FC'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLButtonElement).style.background = '#fff'; }}
              aria-label="Próximo"
            >
              <ChevronRight size={18} color="#374151" />
            </button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {ofertas.map((oferta, i) => (
            <OfertaCard key={i} oferta={oferta} active={i === current} />
          ))}
        </div>

        {/* Mobile — carrossel */}
        <div className="md:hidden" style={{ overflow: 'hidden' }}>
          <motion.div
            animate={{ x: `${-current * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ display: 'flex' }}
          >
            {ofertas.map((oferta, i) => (
              <div key={i} style={{ minWidth: '100%' }}>
                <OfertaCard oferta={oferta} active={i === current} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
          {ofertas.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? '#009cde' : '#D1D5DB', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s, background 0.3s' }}
              aria-label={`Ir para oferta ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export function ConsorcioImovel() {
  return (
    <ProdutoPageBlank
      categoria="Consórcio de Imóveis"
      titulo="Consórcio de Imóvel"
      subtitulo="Realize o sonho da casa própria com planejamento, sem juros e sem entrada obrigatória."
    >
      <EditorialProdutoSection cfg={editorialImovel} />
      <TiposProdutoSection titulo={<>Como você pode usar a sua <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>carta de crédito</span></>} tipos={tiposImovel} />
      <OfertasProdutoSection ofertas={ofertasImovel} inicial={1} />
    </ProdutoPageBlank>
  );
}

// ── Dados: Automóvel ─────────────────────────────────────────────────────────

const editorialAutomovel: EditorialConfig = {
  badge: 'Porto Vale × Porto Seguro',
  titulo: <>Saia de carro novo com <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>planejamento, sem juros e sem entrada</span></>,
  intro: 'O consórcio de veículos da Porto Seguro permite que você adquira um carro novo ou seminovo de maneira planejada, sem juros e com parcelas econômicas.',
  corpo1: 'Os planos variam de 50 a 80 meses, e você não precisa dar entrada para adesão ao consórcio. Com parcelas reduzidas até a contemplação e a liberdade de escolher o valor do crédito que você precisa, o consórcio da Porto Seguro oferece diversas vantagens.',
  corpo2: 'Além de garantir a menor taxa de administração do mercado, nossos planos oferecem créditos que vão de R$ 25 mil a R$ 125 mil. Você pode escolher entre as melhores marcas e modelos, incluindo hatches, sedãs e SUVs.',
  stats: [
    { label: 'Crédito de até', value: 'R$ 125 mil' },
    { label: 'Prazo', value: '50–80 meses' },
    { label: 'Taxa de juros', value: '0% a.a.' },
  ],
  badgeTopo: 'Sem juros · Sem entrada',
  badgeInferior: { value: 'Menor taxa', label: 'de administração do mercado' },
};

const tiposAutomovel: TipoItem[] = [
  { icon: Car,   label: 'Carro',       desc: 'Carros novos ou seminovos das melhores marcas — hatches, sedãs, SUVs e muito mais.' },
  { icon: Bike,  label: 'Moto',        desc: 'Adquira a moto que você quer com parcelas acessíveis e sem precisar dar entrada.' },
  { icon: Truck, label: 'Utilitário',  desc: 'Vans, picapes e utilitários para uso pessoal ou para impulsionar o seu negócio.' },
  { icon: Zap,   label: 'Elétrico / Híbrido', desc: 'Invista no futuro com consórcio para veículos elétricos e híbridos sem pagar juros.' },
  { icon: Briefcase, label: 'Frota Empresarial', desc: 'Renove ou expanda a frota da sua empresa com planejamento e sem imobilizar capital de giro.' },
];

const ofertasAutomovel: Oferta[] = [
  { media: 'photo', badge: 'Entrada acessível', credito: 'R$ 25.000',  parcela: '', prazo: '50 meses', descricao: 'Ideal para motos, carros populares ou seminovos com parcelas que cabem no orçamento.' },
  { media: 'photo', badge: 'Mais escolhido',    credito: 'R$ 75.000',  parcela: '', prazo: '70 meses', descricao: 'O crédito certo para hatches, sedãs e SUVs compactos novos ou seminovos premium.' },
  { media: 'photo', badge: 'Maior crédito',     credito: 'R$ 125.000', parcela: '', prazo: '80 meses', descricao: 'Para SUVs, picapes, utilitários ou renovação de frota com o máximo poder de compra.' },
];

// ── Dados: Pesados ───────────────────────────────────────────────────────────

const editorialPesados: EditorialConfig = {
  badge: 'Porto Vale × Porto Seguro',
  titulo: <>A forma mais econômica de <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>montar ou expandir sua frota</span></>,
  intro: 'O consórcio de caminhões e veículos pesados da Porto Seguro permite que empresas empreendedoras realizem, de forma planejada e programada, a montagem ou expansão de uma frota.',
  corpo1: 'O crédito pode ser utilizado para a aquisição de ônibus, caminhões, carretas e outros veículos. São até 120 meses para pagamento, com redução de 25% nas parcelas até a contemplação — a maneira mais econômica de expandir uma frota ou iniciar um novo negócio.',
  corpo2: 'As cartas de crédito variam de R$ 180 mil a R$ 360 mil, e as contemplações ocorrem mensalmente por lance ou sorteio. O consórcio de veículos pesados da Porto Seguro não possui taxa de adesão.',
  stats: [
    { label: 'Crédito até', value: 'R$ 360 mil' },
    { label: 'Prazo de até', value: '120 meses' },
    { label: 'Sem taxa', value: 'de adesão' },
  ],
  badgeTopo: 'Sem juros · Sem taxa de adesão',
  badgeInferior: { value: '25% menos', label: 'nas parcelas até a contemplação' },
  imagem: '/imagens/produto-pesados.jpg',
};

const tiposPesados: TipoItem[] = [
  { icon: Truck,      label: 'Caminhão',         desc: 'Renove ou amplie sua frota de caminhões com parcelas fixas, zero juros e sem taxa de adesão.' },
  { icon: TrendingUp, label: 'Carreta / Bitrem',  desc: 'Crédito para carretas, biterms e conjuntos de veículos de carga de grande porte.' },
  { icon: Building2,  label: 'Ônibus',            desc: 'Para transportadoras e empresas de turismo que precisam renovar a frota de passageiros.' },
  { icon: Briefcase,  label: 'Frota Empresarial', desc: 'Monte ou expanda a frota do seu negócio com planejamento e sem imobilizar capital de giro.' },
  { icon: Shield,     label: 'Implementos Rodoviários', desc: 'Também é possível adquirir semirreboques e implementos rodoviários com o consórcio.' },
];

const ofertasPesados: Oferta[] = [
  { media: 'photo', badge: 'Início de frota',  credito: 'R$ 180.000', parcela: '', prazo: '90 meses',  descricao: 'Ideal para caminhões leves, ônibus ou início de frota com parcelas reduzidas.' },
  { media: 'photo', badge: 'Mais escolhido',   credito: 'R$ 270.000', parcela: '', prazo: '100 meses', descricao: 'O equilíbrio perfeito entre crédito e prazo para caminhões, carretas e implementos.' },
  { media: 'photo', badge: 'Maior crédito',    credito: 'R$ 360.000', parcela: '', prazo: '120 meses', descricao: 'Para renovação de frota completa ou aquisição de conjuntos bitrem e veículos de grande porte.' },
];

const implementosPesados = [
  'Base para container', 'Carrega-Tudo', 'Baú', 'Bitrem',
  'Basculante', 'Carga Seca', 'Florestal', 'Frigorífico',
  'Furgão', 'Graneleiro', 'Sider', 'Tanque',
];

function ImplementosSection() {
  return (
    <section style={{ backgroundColor: '#fff', padding: 'clamp(48px, 7vw, 80px) 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '28px', height: '2px', backgroundColor: '#009cde' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#009cde' }}>
              Implementos rodoviários
            </span>
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(20px, 2.4vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#111827', margin: 0 }}>
            Também adquira{' '}
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>semirreboques e implementos</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {implementosPesados.map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                background: '#F3F4F6',
                border: '1.5px solid #E5E7EB',
                borderRadius: '100px',
                padding: '8px 20px',
                whiteSpace: 'nowrap' as const,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Dados: Terreno ───────────────────────────────────────────────────────────

const editorialTerreno: EditorialConfig = {
  badge: 'Porto Vale × Porto Seguro',
  titulo: <>O primeiro passo para <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>conquistar o imóvel dos seus sonhos</span></>,
  intro: 'O consórcio de terreno do Porto permite que você utilize o crédito para a aquisição do terreno de sua preferência, com economia e planejamento.',
  corpo1: 'Os planos oferecem até R$ 240 mil e podem ser pagos em até 200 meses, sem juros e com taxas diferenciadas justas. Você pode escolher o crédito mais adequado ao seu objetivo, com a opção de parcelas reduzidas até a contemplação.',
  corpo2: 'Com o consórcio, você adquire um terreno com total tranquilidade financeira — dando os primeiros e mais importantes passos para construir o imóvel que sempre imaginou.',
  stats: [
    { label: 'Crédito de até', value: 'R$ 240 mil' },
    { label: 'Prazo de até', value: '200 meses' },
    { label: 'Taxa de juros', value: '0% a.a.' },
  ],
  badgeTopo: 'Sem juros · Sem entrada',
  badgeInferior: { value: 'Parcela', label: 'reduzida até a contemplação' },
};

const tiposTerreno: TipoItem[] = [
  { icon: MapPin,     label: 'Áreas residenciais ou comerciais', desc: 'Use a carta de crédito para adquirir lotes em zonas residenciais ou comerciais de sua preferência.' },
  { icon: Home,       label: 'Lote em condomínio fechado',       desc: 'Adquira seu lote em condomínios planejados com toda a segurança e infraestrutura já garantidas.' },
  { icon: Hammer,     label: 'Terreno para construção',          desc: 'Compre o terreno e já inicie o planejamento da obra — sem juros e com parcelas acessíveis.' },
  { icon: Sprout,     label: 'Área rural / Chácara',             desc: 'Invista em chácaras, sítios ou áreas rurais com o poder de compra à vista do consórcio.' },
  { icon: TrendingUp, label: 'Lote para investimento',           desc: 'Adquira terrenos em regiões de alta valorização e faça seu patrimônio crescer de forma planejada.' },
];

const ofertasTerreno: Oferta[] = [
  { media: 'photo', badge: 'Entrada acessível', credito: 'R$ 80.000',  parcela: '', prazo: '160 meses', descricao: 'Ideal para terrenos residenciais em regiões em crescimento, com parcelas reduzidas.' },
  { media: 'photo', badge: 'Mais escolhido',    credito: 'R$ 160.000', parcela: '', prazo: '180 meses', descricao: 'O equilíbrio perfeito entre crédito e prazo para lotes residenciais ou comerciais.' },
  { media: 'photo', badge: 'Maior crédito',     credito: 'R$ 240.000', parcela: '', prazo: '200 meses', descricao: 'Para quem busca terrenos maiores, em melhores localizações ou para fins de investimento.' },
];

export function ConsorcioTerreno() {
  return (
    <ProdutoPageBlank
      categoria="Consórcio de Imóveis"
      titulo="Consórcio de Terreno"
      subtitulo="Adquira seu terreno com parcelas que cabem no seu orçamento e sem pagar juros."
    >
      <EditorialProdutoSection cfg={editorialTerreno} />
      <TiposProdutoSection
        titulo={<>Como você pode usar a sua <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>carta de crédito</span></>}
        tipos={tiposTerreno}
      />
      <OfertasProdutoSection ofertas={ofertasTerreno} inicial={1} />
    </ProdutoPageBlank>
  );
}

// ── Dados: Construção e Reforma ──────────────────────────────────────────────

const editorialConstrucao: EditorialConfig = {
  badge: 'Porto Vale × Porto Seguro',
  titulo: <>Tire os planos do papel com <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>crédito para construir ou reformar</span></>,
  intro: 'Com o consórcio de imóveis da Porto, você pode utilizar os créditos para investir na construção ou reforma da sua residência, casa de praia ou outro projeto de seu interesse.',
  corpo1: 'Com parcelas acessíveis e sem taxa de juros, o consórcio é a melhor forma de tirar os planos do papel. São créditos a partir de R$ 70 mil e até 200 meses para pagar — com total flexibilidade para usar o valor no projeto que você desejar.',
  corpo2: 'Ao ser contemplado, você recebe a carta de crédito com poder de compra à vista, o que facilita a negociação com construtoras, arquitetos e fornecedores de material.',
  stats: [
    { label: 'Crédito a partir de', value: 'R$ 70 mil' },
    { label: 'Prazo de até', value: '200 meses' },
    { label: 'Taxa de juros', value: '0% a.a.' },
  ],
  badgeTopo: 'Sem juros · Sem entrada',
  badgeInferior: { value: 'Seu projeto', label: 'do jeito que você imaginou' },
  imagem: '/imagens/produto-reforma.jpg',
};

const tiposConstrucao: TipoItem[] = [
  { icon: Layers,     label: 'Construir',            desc: 'Use o crédito para construir sua residência do zero, com total liberdade de projeto e acabamento.' },
  { icon: Paintbrush, label: 'Reformar',              desc: 'Renove sua casa, apartamento ou espaço comercial com o poder de compra à vista do consórcio.' },
  { icon: Home,       label: 'Casa de praia / Campo', desc: 'Construa ou reforma o seu refúgio ideal — consórcio sem restrição de localização do imóvel.' },
  { icon: Hammer,     label: 'Ampliação',             desc: 'Expanda o seu imóvel com mais quartos, garagem ou área de lazer sem comprometer o orçamento.' },
  { icon: TrendingUp, label: 'Valorização do imóvel', desc: 'Invista em melhorias que aumentam o valor de mercado do seu patrimônio de forma planejada.' },
];

const ofertasConstrucao: Oferta[] = [
  { media: 'photo', badge: 'Para reformas',     credito: 'R$ 70.000',  parcela: '', prazo: '160 meses', descricao: 'Ideal para reformas, ampliações e acabamentos sem precisar recorrer ao financiamento.' },
  { media: 'photo', badge: 'Mais escolhido',    credito: 'R$ 140.000', parcela: '', prazo: '180 meses', descricao: 'O crédito certo para construções de médio porte ou reformas completas com projeto.' },
  { media: 'photo', badge: 'Construção completa', credito: 'R$ 240.000', parcela: '', prazo: '200 meses', descricao: 'Para quem quer construir do zero com folga de crédito e prazo máximo de pagamento.' },
];

export function ConsorcioConstrucaoReforma() {
  return (
    <ProdutoPageBlank
      categoria="Consórcio de Imóveis"
      titulo="Consórcio de Construção e Reforma"
      subtitulo="Construa ou renove seu imóvel com crédito planejado e sem as taxas do financiamento tradicional."
    >
      <EditorialProdutoSection cfg={editorialConstrucao} />
      <TiposProdutoSection
        titulo={<>O que você pode <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>realizar com o crédito</span></>}
        tipos={tiposConstrucao}
      />
      <OfertasProdutoSection ofertas={ofertasConstrucao} inicial={1} />
    </ProdutoPageBlank>
  );
}

// ── Consórcio de Automóveis ──────────────────────────────────────────────────

export function ConsorcioAutomovel() {
  return (
    <ProdutoPageBlank
      categoria="Consórcio de Automóveis"
      titulo="Consórcio de Automóvel"
      subtitulo="Troque de carro ou adquira o seu primeiro veículo pagando muito menos do que no financiamento."
    >
      <EditorialProdutoSection cfg={editorialAutomovel} />
      <TiposProdutoSection
        titulo={<>Como você pode usar a sua <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>carta de crédito</span></>}
        tipos={tiposAutomovel}
      />
      <OfertasProdutoSection ofertas={ofertasAutomovel} inicial={1} />
    </ProdutoPageBlank>
  );
}

export function ConsorcioPesados() {
  return (
    <ProdutoPageBlank
      categoria="Consórcio de Automóveis"
      titulo="Consórcio de Pesados"
      subtitulo="Caminhões, ônibus e carretas com crédito planejado para montar ou expandir sua frota."
    >
      <EditorialProdutoSection cfg={editorialPesados} />
      <TiposProdutoSection
        titulo={<>Como você pode usar a sua <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>carta de crédito</span></>}
        tipos={tiposPesados}
      />
      <ImplementosSection />
      <OfertasProdutoSection ofertas={ofertasPesados} inicial={1} />
    </ProdutoPageBlank>
  );
}

// ── Outros Consórcios ────────────────────────────────────────────────────────

// ── Dados: Agro ──────────────────────────────────────────────────────────────

const editorialAgro: EditorialConfig = {
  badge: 'Porto Vale × Porto Seguro',
  titulo: <>Invista no agro com <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>planejamento, sem juros e sem entrada</span></>,
  intro: 'O agronegócio é uma das áreas mais estratégicas para a economia e o PIB brasileiro — responsável por cerca de 10% de todos os empregos gerados no país e por 26,6% do Produto Interno Bruto do Brasil.',
  corpo1: 'Uma área tão importante merece atenção e investimentos. Por isso, o consórcio agro da Porto Seguro oferece créditos para a compra de tratores, caminhões, máquinas agrícolas e outros equipamentos e implementos necessários ao desenvolvimento das atividades agropecuárias.',
  corpo2: 'O consórcio oferece mais segurança e planejamento para o investimento de pequenos, médios e grandes produtores rurais — com parcelas acessíveis, sem taxa de juros e contemplação mensal.',
  stats: [
    { label: 'Contemplação', value: 'Mensal' },
    { label: 'Taxa de juros', value: '0% a.a.' },
    { label: 'Sem taxa', value: 'de adesão' },
  ],
  badgeTopo: 'Sem juros · Sem entrada',
  badgeInferior: { value: '26,6%', label: 'do PIB brasileiro é agro' },
  imagem: '/imagens/produto-agro.jpg',
  imagemPosition: 'left center',
};

const tiposAgro: TipoItem[] = [
  { icon: Sprout,     label: 'Maquinário Agrícola',   desc: 'Tratores, colheitadeiras, plantadeiras e toda a linha de maquinário para aumentar a produtividade da sua lavoura.' },
  { icon: Hammer,     label: 'Implementos',            desc: 'Arados, grades, pulverizadores, carretas agrícolas e todos os implementos que a sua operação precisa.' },
  { icon: Truck,      label: 'Caminhões para o Campo', desc: 'Caminhões e utilitários para transporte de grãos, insumos e produção agrícola dentro e fora da propriedade.' },
  { icon: Zap,        label: 'Irrigação e Energia',    desc: 'Sistemas de irrigação, painéis solares e equipamentos de automação para modernizar a produção rural.' },
  { icon: TrendingUp, label: 'Expansão da Produção',   desc: 'Use a carta de crédito de forma estratégica para escalar a produção e consolidar o seu negócio no campo.' },
];

const ofertasAgro: Oferta[] = [
  { media: 'photo', badge: 'Pequeno produtor', credito: 'R$ 100.000', parcela: '', prazo: '80 meses',  descricao: 'Ideal para implementos, tratores compactos e equipamentos para pequenas e médias propriedades.' },
  { media: 'photo', badge: 'Mais escolhido',   credito: 'R$ 250.000', parcela: '', prazo: '100 meses', descricao: 'O crédito certo para maquinário de médio porte e modernização completa da operação rural.' },
  { media: 'photo', badge: 'Grande produtor',  credito: 'R$ 500.000', parcela: '', prazo: '120 meses', descricao: 'Para grandes produtores que precisam de colheitadeiras, conjuntos completos ou renovação de frota.' },
];

export function ConsorcioAgro() {
  return (
    <ProdutoPageBlank
      categoria="Outros Consórcios"
      titulo="Consórcio Agro"
      subtitulo="Máquinas, implementos e equipamentos agrícolas com crédito acessível para o seu agronegócio."
    >
      <EditorialProdutoSection cfg={editorialAgro} />
      <TiposProdutoSection
        titulo={<>O que você pode adquirir com a sua <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>carta de crédito</span></>}
        tipos={tiposAgro}
      />
    </ProdutoPageBlank>
  );
}

// ── Dados: Investimento ──────────────────────────────────────────────────────

const editorialInvestimento: EditorialConfig = {
  badge: 'Porto Vale × Porto Seguro',
  titulo: <>Uma decisão <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>inteligente e estratégica</span> para o seu dinheiro</>,
  intro: 'O consórcio para investimento é uma decisão inteligente e estratégica. Na prática, o consórcio funciona como uma poupança, para a qual o consorciado destina recursos todos os meses com o objetivo de atingir uma meta predeterminada.',
  corpo1: 'Você pode aderir ao grupo de consórcio para investir seu dinheiro com garantia de rentabilidade e segurança. A modalidade é regulamentada pelo Banco Central do Brasil e o valor da carta de crédito é reajustado ao longo do período de duração do grupo.',
  corpo2: 'Dessa forma, o poder de compra do consorciado é garantido — protegendo o seu patrimônio da inflação e permitindo a realização de objetivos financeiros de médio e longo prazo com total previsibilidade.',
  stats: [
    { label: 'Regulamentado pelo', value: 'Banco Central' },
    { label: 'Taxa de juros', value: '0% a.a.' },
    { label: 'Poder de compra', value: 'Garantido' },
  ],
  badgeTopo: 'Rentabilidade · Segurança',
  badgeInferior: { value: 'Reajuste', label: 'anual da carta de crédito' },
  imagem: '/imagens/produto-investimento.jpg',
};

const tiposInvestimento: TipoItem[] = [
  { icon: TrendingUp, label: 'Investimento',  desc: 'Use o consórcio como instrumento de investimento programado, com rentabilidade protegida e sem as taxas do mercado financeiro tradicional.' },
  { icon: HandCoins,  label: 'Economia',      desc: 'Disciplina financeira com destino certo: acumule crédito mês a mês e realize seus objetivos sem comprometer o orçamento.' },
  { icon: PiggyBank,  label: 'Poupança',      desc: 'O consórcio funciona como uma poupança programada — com a vantagem de ter o poder de compra reajustado ao longo do tempo.' },
  { icon: Shield,     label: 'Proteção Patrimonial', desc: 'Proteja seu patrimônio da inflação e da desvalorização com um produto regulamentado pelo Banco Central do Brasil.' },
  { icon: Coins,      label: 'Diversificação', desc: 'Combine o consórcio com outros investimentos para uma carteira mais equilibrada, segura e com objetivos de longo prazo.' },
];

const ofertasInvestimento: Oferta[] = [
  { media: 'photo', badge: 'Início',        credito: 'R$ 50.000',  parcela: '', prazo: '80 meses',  descricao: 'Ideal para quem quer começar a investir de forma disciplinada com parcelas acessíveis.' },
  { media: 'photo', badge: 'Mais escolhido', credito: 'R$ 150.000', parcela: '', prazo: '100 meses', descricao: 'O equilíbrio perfeito entre meta de crédito e prazo para objetivos financeiros de médio prazo.' },
  { media: 'photo', badge: 'Maior retorno', credito: 'R$ 300.000', parcela: '', prazo: '120 meses', descricao: 'Para quem busca um instrumento robusto de acumulação patrimonial com total segurança.' },
];

export function ConsorcioInvestimento() {
  return (
    <ProdutoPageBlank
      categoria="Outros Consórcios"
      titulo="Consórcio de Investimento"
      subtitulo="Use a carta de crédito como instrumento de investimento inteligente e rentável."
    >
      <EditorialProdutoSection cfg={editorialInvestimento} />
      <TiposProdutoSection
        titulo={<>Por que o consórcio é um <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>bom investimento</span></>}
        tipos={tiposInvestimento}
      />
    </ProdutoPageBlank>
  );
}

// ── Dados: Placa Solar ───────────────────────────────────────────────────────

const editorialPlacaSolar: EditorialConfig = {
  badge: 'Porto Vale × Porto Seguro',
  titulo: <>Aproveite o sol do Brasil com <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>energia limpa e mais barata</span></>,
  intro: 'A energia solar é uma das fontes renováveis de maior potencial no Brasil. De acordo com o Atlas Brasileiro de Energia Solar, nosso país recebe mais de 3 mil horas de luz solar intensa por ano.',
  corpo1: 'Essa alta incidência de radiação solar é ideal para a implantação de projetos de energia fotovoltaica, com placas solares que geram energia limpa e mais barata. O consórcio de energia solar é a melhor forma de aproveitar a luz solar em sua casa ou empresa.',
  corpo2: 'Os sistemas podem ser instalados com diversas finalidades: automação industrial, abastecimento de residências e empresas, fornecimento de energia para baterias, segurança e automação agropecuária, entre outras aplicações.',
  stats: [
    { label: 'Crédito de até', value: 'R$ 50 mil' },
    { label: 'Prazo de até', value: '50 meses' },
    { label: 'Taxa de juros', value: '0% a.a.' },
  ],
  badgeTopo: 'Energia limpa · Sem juros',
  badgeInferior: { value: '+3.000h', label: 'de sol intenso por ano no Brasil' },
  imagem: '/imagens/produto-energiasolar.jpg',
};

const tiposPlacaSolar: TipoItem[] = [
  { icon: Sun,            label: 'Energia Solar Fotovoltaica', desc: 'Sistemas fotovoltaicos completos para geração de energia limpa a partir da luz solar.' },
  { icon: Home,           label: 'Residências',                desc: 'Reduza a conta de luz da sua casa e valorize o imóvel com um sistema solar próprio.' },
  { icon: Building2,      label: 'Empresas e Comércio',        desc: 'Corte os custos de energia do seu negócio e garanta autonomia com geração própria.' },
  { icon: BatteryCharging,label: 'Baterias e Armazenamento',   desc: 'Sistemas de armazenamento de energia para uso contínuo mesmo fora do horário de geração.' },
  { icon: Sprout,         label: 'Automação Agropecuária',     desc: 'Abastecimento de propriedades rurais, bombas de irrigação e segurança no campo.' },
];

const ofertasPlacaSolar: Oferta[] = [
  { media: 'photo', badge: 'Residencial',    credito: 'R$ 25.000', parcela: '', prazo: '40 meses', descricao: 'Sistema solar completo para residências com redução imediata na conta de energia elétrica.' },
  { media: 'photo', badge: 'Mais escolhido', credito: 'R$ 35.000', parcela: '', prazo: '45 meses', descricao: 'O crédito ideal para sistemas de médio porte com baterias para casas e pequenas empresas.' },
  { media: 'photo', badge: 'Empresarial',    credito: 'R$ 50.000', parcela: '', prazo: '50 meses', descricao: 'Para empresas, comércio ou propriedades rurais que precisam de maior capacidade de geração.' },
];

const beneficiosSolar = [
  { icon: Home,     titulo: 'Valorização do imóvel',  desc: 'Casa ou empresa' },
  { icon: Recycle,  titulo: 'Reciclável',              desc: 'Além da fácil instalação, ainda é 50% reciclável' },
  { icon: Globe,    titulo: 'Meio ambiente',           desc: 'Contribui para a preservação ambiental' },
  { icon: Lightbulb,titulo: 'Reduz a conta',           desc: 'Atua diretamente na redução da conta de energia elétrica' },
];

const beneficiosSolarAnimado = [
  { icon: Home,      titulo: 'Valorização do imóvel',  desc: 'Casa ou empresa',
    idleAnimate: { y: [0, -4, 0] } as object,      idleTransition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { y: [0, -8, 0] } as object,     hoverTransition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' as const } },
  { icon: Recycle,   titulo: 'Reciclável',              desc: 'Além da fácil instalação, ainda é 50% reciclável',
    idleAnimate: { rotate: [0, 180, 360] } as object, idleTransition: { duration: 4, repeat: Infinity, ease: 'linear' as const },
    hoverAnimate: { rotate: [0, 180, 360] } as object, hoverTransition: { duration: 1.2, repeat: Infinity, ease: 'linear' as const } },
  { icon: Globe,     titulo: 'Meio ambiente',           desc: 'Contribui para a preservação ambiental',
    idleAnimate: { rotate: [0, 360] } as object,    idleTransition: { duration: 8, repeat: Infinity, ease: 'linear' as const },
    hoverAnimate: { rotate: [0, 360] } as object,   hoverTransition: { duration: 2, repeat: Infinity, ease: 'linear' as const } },
  { icon: Lightbulb, titulo: 'Reduz a conta',           desc: 'Atua diretamente na redução da conta de energia elétrica',
    idleAnimate: { scale: [1, 1.14, 1] } as object, idleTransition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
    hoverAnimate: { scale: [1, 1.28, 1] } as object, hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' as const } },
];

function InstalacaoSolarSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{ backgroundColor: '#f8f7f5', padding: 'clamp(64px, 10vw, 104px) 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-stretch">

          {/* Esquerda — card escuro de instalação com mídia */}
          <div style={{ background: '#1E3A8A', borderRadius: '24px', padding: 'clamp(32px, 4vw, 48px)', display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative', overflow: 'hidden' }}>
            {/* Ícone decorativo */}
            <div style={{ position: 'absolute', top: '24px', right: '24px', opacity: 0.18 }}>
              <Settings2 size={64} color="#fff" strokeWidth={1} />
            </div>

            <div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3vw, 40px)', color: '#fff', lineHeight: 1.15, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                Instalação
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px, 1.3vw, 15px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, margin: '0 0 16px' }}>
                A instalação das placas de energia solar é um processo simples e que valoriza o imóvel, seja ele uma casa ou um estabelecimento para fins comerciais. Com ela, é possível ficar livre de tarifas de fornecimento de energia.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px, 1.3vw, 15px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, margin: 0 }}>
                Em regiões urbanas, o modelo mais usado é o <strong style={{ color: '#fff', fontWeight: 600 }}>on-grid</strong>. Ele mantém o sistema conectado à concessionária local e permite reduzir a conta de energia a partir do excedente produzido pelos painéis.
              </p>
            </div>

            {/* Placeholder de foto/vídeo */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', background: 'rgba(0,0,0,0.25)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}>
              {/* Botão play */}
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(0,156,222,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Vídeo de instalação — em breve</span>
            </div>
          </div>

          {/* Direita — grid 2x2 de benefícios com ícones animados */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {beneficiosSolarAnimado.map(({ icon: Icon, titulo, desc, idleAnimate, idleTransition, hoverAnimate, hoverTransition }, i) => (
              <div
                key={titulo}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  border: `1.5px solid ${hovered === i ? '#009cde' : 'transparent'}`,
                  transform: hovered === i ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
                  boxShadow: hovered === i ? '0 8px 24px rgba(0,156,222,0.12)' : 'none',
                  cursor: 'default',
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: hovered === i ? '#E0F4FC' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.25s' }}>
                  <motion.div
                    animate={hovered === i ? hoverAnimate : idleAnimate}
                    transition={hovered === i ? hoverTransition : idleTransition}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Icon size={20} color={hovered === i ? '#009cde' : '#6B7280'} strokeWidth={1.6} />
                  </motion.div>
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#111827', lineHeight: 1.25, margin: '0 0 8px' }}>
                    {titulo}
                  </h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280', lineHeight: 1.65, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export function ConsorcioPlacaSolar() {
  return (
    <ProdutoPageBlank
      categoria="Outros Consórcios"
      titulo="Consórcio de Placa Solar"
      subtitulo="Instale energia solar na sua casa ou empresa e reduza os custos com eletricidade sem pagar juros."
    >
      <EditorialProdutoSection cfg={editorialPlacaSolar} />
      <TiposProdutoSection
        titulo={<>Onde você pode instalar o seu <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>sistema solar</span></>}
        tipos={tiposPlacaSolar}
      />
      <InstalacaoSolarSection />
    </ProdutoPageBlank>
  );
}

// ── Dados: Empresarial ───────────────────────────────────────────────────────

const editorialEmpresarial: EditorialConfig = {
  badge: 'Porto Vale × Porto Seguro',
  titulo: <>Invista na sua empresa com <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>estratégia e sem comprometer o capital de giro</span></>,
  intro: 'O consórcio empresarial é um investimento interessante para pessoas jurídicas que precisam adquirir bens para suas empresas sem comprometer o capital de giro.',
  corpo1: 'É possível aderir ao consórcio com diversos objetivos empresariais, desde a construção, reforma ou compra de uma nova sede até a aquisição de equipamentos e maquinários. Com o consórcio, os empresários investem de maneira estratégica e com inteligência, fugindo dos juros exorbitantes cobrados nas linhas de crédito tradicionais.',
  corpo2: 'Com o consórcio Porto Seguro, as pessoas jurídicas têm a segurança de investir com o apoio de uma das maiores e mais conceituadas empresas do segmento de consórcios do Brasil.',
  stats: [
    { label: 'Para', value: 'Pessoas Jurídicas' },
    { label: 'Taxa de juros', value: '0% a.a.' },
    { label: 'Contemplação', value: 'Mensal' },
  ],
  badgeTopo: 'Sem juros · Sem comprometer o caixa',
  badgeInferior: { value: 'Porto Seguro', label: 'referência nacional em consórcios' },
  imagem: '/imagens/produto-empresarial.jpg',
};

const tiposEmpresarial: TipoItem[] = [
  { icon: Store,      label: 'Construção de imóvel comercial',        desc: 'Construa a sede própria da sua empresa com planejamento financeiro e sem juros.' },
  { icon: Layers,     label: 'Reforma ou compra de uma nova sede',    desc: 'Renove o espaço atual ou adquira um novo imóvel para expandir as operações do seu negócio.' },
  { icon: Briefcase,  label: 'Aquisição de equipamentos e maquinários', desc: 'Modernize o parque de máquinas e equipamentos da sua empresa sem imobilizar capital de giro.' },
  { icon: TrendingUp, label: 'Investimento com estratégia e inteligência', desc: 'Use o consórcio como instrumento de planejamento financeiro empresarial de longo prazo.' },
];

const ofertasEmpresarial: Oferta[] = [
  { media: 'photo', badge: 'Pequenas empresas', credito: 'R$ 100.000', parcela: '', prazo: '80 meses',  descricao: 'Ideal para reformas, equipamentos e aquisição de espaço para pequenos negócios.' },
  { media: 'photo', badge: 'Mais escolhido',    credito: 'R$ 300.000', parcela: '', prazo: '100 meses', descricao: 'O crédito certo para médias empresas que querem crescer com planejamento e zero juros.' },
  { media: 'photo', badge: 'Grandes negócios',  credito: 'R$ 600.000', parcela: '', prazo: '120 meses', descricao: 'Para construção de sede, renovação de frota ou aquisição de maquinário de grande porte.' },
];

export function ConsorcioEmpresarial() {
  return (
    <ProdutoPageBlank
      categoria="Outros Consórcios"
      titulo="Consórcio Empresarial"
      subtitulo="Soluções de crédito planejado para empresas que desejam crescer com inteligência financeira."
    >
      <EditorialProdutoSection cfg={editorialEmpresarial} />
      <TiposProdutoSection
        titulo={<>O que a sua empresa pode <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>realizar com o consórcio</span></>}
        tipos={tiposEmpresarial}
      />
    </ProdutoPageBlank>
  );
}
