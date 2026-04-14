import { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQItem } from './FAQItem';
import type { FAQEntry } from './FAQItem';

function SourceTooltip({ href, label, onLight }: { href: string; label: string; onLight?: boolean }) {
  const [visible, setVisible] = useState(false);
  const iconBg = onLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)';
  const iconColor = onLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)';
  return (
    <div
      style={{ position: 'absolute', top: '12px', right: '12px' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%',
        background: iconBg, display: 'flex',
        alignItems: 'center', justifyContent: 'center', cursor: 'default',
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill={iconColor}>
          <text x="3.2" y="8.5" fontSize="9" fontFamily="serif" fontStyle="italic">i</text>
        </svg>
      </div>
      {visible && (
        <div style={{
          position: 'absolute',
          bottom: '24px',
          right: 0,
          background: '#1F2937',
          color: '#fff',
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          lineHeight: 1.5,
          padding: '8px 12px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          zIndex: 10,
        }}>
          Fonte:{' '}
          <a href={href} target="_blank" rel="noopener noreferrer"
            style={{ color: '#60A5FA', textDecoration: 'underline' }}>
            {label}
          </a>
          {/* seta */}
          <div style={{
            position: 'absolute', bottom: '-5px', right: '6px',
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #1F2937',
          }} />
        </div>
      )}
    </div>
  );
}

const faqs: FAQEntry[] = [
  {
    question: 'O consórcio demora para contemplar?',
    answer:
      'Você pode ser contemplado por sorteio ou lance, que permite antecipar a retirada do crédito. Além disso, a Porto Vale tem um alto volume de contemplações mensais, o que aumenta suas chances.',
  },
  {
    question: 'Só consigo minha casa ou meu carro no final do consórcio?',
    answer:
      'Não! Você pode antecipar a contemplação dando um lance, ou ser sorteado antes do prazo final.',
  },
  {
    question: 'Posso usar o crédito contemplado como quiser?',
    answer:
      'Sim! Você pode usar o crédito para comprar qualquer bem dentro da categoria do seu consórcio, negociar descontos à vista e até complementar um valor maior na compra.',
  },
  {
    question: 'O consórcio é um investimento?',
    answer:
      'O consórcio não é um investimento financeiro tradicional, mas pode ser uma excelente estratégia para adquirir bens com economia e planejamento, sem juros.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="py-24 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-24">
            <h2
              className="text-[40px] leading-[1.1] mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
            >
              <span className="block text-[#111827] dark:text-white">Começando no</span>
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>consórcio?</span>
            </h2>
            <p
              className="text-[14px] text-[#6B7280] dark:text-gray-400 max-w-xs mb-8"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.7' }}
            >
              Confira algumas dúvidas e informações que pode achar importante para realizar o seu investimento.
            </p>
            <button
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13px] font-medium rounded-lg px-5 py-2.5 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Falar com consultor
            </button>

            {/* Stats cards */}
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

              {/* Card 1 — cinza */}
              <div style={{ backgroundColor: '#eeebe6', borderRadius: '18px', padding: '20px 22px', position: 'relative' }}>
                <SourceTooltip href="#" label="Dados internos Porto Vale" onLight />
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 5vw, 38px)', lineHeight: 1, color: '#111827', marginBottom: '6px' }}>
                  98%
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#4B5563', lineHeight: 1.6 }}>
                  dos nossos clientes indicariam o consórcio a amigos e família.
                </p>
              </div>

              {/* Cards 2 e 3 lado a lado */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

                {/* Card 2 — preto */}
                <div style={{ backgroundColor: '#111827', borderRadius: '18px', padding: '20px 18px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <SourceTooltip href="https://blog.abac.org.br/drops-de-mercado/sistema-de-consorcios-o-que-esperar-de-2026" label="ABAC" />
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 4vw, 28px)', lineHeight: 1, color: '#fff' }}>
                    +11%
                  </div>
                  <svg width="100%" height="38" viewBox="0 0 110 38" preserveAspectRatio="none" style={{ display: 'block' }}>
                    <line x1="0" y1="37" x2="110" y2="37" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                    {[14, 18, 16, 22, 20, 26, 24, 30, 28, 38].map((h, i) => (
                      <rect key={i} x={i * 12 + 1} y={38 - h} width="9" height={h} rx="2"
                        fill={i === 9 ? '#3B82F6' : 'rgba(255,255,255,0.18)'}/>
                    ))}
                  </svg>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
                    de crescimento projetado para o setor em 2026
                  </p>
                </div>

                {/* Card 3 — azul claro */}
                <div style={{ backgroundColor: '#009cde', borderRadius: '18px', padding: '20px 18px', position: 'relative' }}>
                  <SourceTooltip href="https://www.portalconectanews.com.br/consorcio-conquista-coracao-dos-brasileiros-e-projeta-crescimento-de-11-em-2026/" label="Conecta News" />
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 4vw, 28px)', lineHeight: 1, color: '#fff', marginBottom: '8px' }}>
                    12,2M
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                    participantes ativos — crescimento de 10,2% em 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
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