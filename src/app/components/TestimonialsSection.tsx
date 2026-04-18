import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';


const stats = [
  { value: '32.000+', label: 'Consorciados ativos' },
  { value: '98%',     label: 'Índice de satisfação' },
  { value: 'R$ 2bi+', label: 'Em créditos entregues' },
  { value: '18 anos', label: 'De experiência' },
];

const allTestimonials = [
  [
    {
      name: 'Lucas Ferreira',
      role: 'Contemplado no Consórcio Automóvel',
      avatar: 'https://i.pravatar.cc/80?img=11',
      content: 'Entrei no consórcio sem acreditar muito. Em 14 meses fui contemplado por sorteio e hoje tenho meu carro pago sem pagar um centavo de juros. Simplesmente incrível.',
      type: 'Automóvel',
    },
    {
      name: 'Camila Rocha',
      role: 'Contemplada no Consórcio Imóvel',
      avatar: 'https://i.pravatar.cc/80?img=47',
      content: 'Comparei com o financiamento e a diferença foi absurda. Economizei muito no total. O atendimento foi excelente do começo ao fim.',
      type: 'Imóvel',
      highlight: true,
    },
    {
      name: 'Rafael Mendes',
      role: 'Contemplado no Consórcio Automóvel',
      avatar: 'https://i.pravatar.cc/80?img=52',
      content: 'Fiz o lance e fui contemplado no 8º mês. O processo foi transparente e a equipe me ajudou em cada passo. Recomendo para todo mundo que quer comprar sem juros.',
      type: 'Automóvel',
    },
  ],
  [
    {
      name: 'Fernanda Costa',
      role: 'Contemplada no Consórcio Imóvel',
      avatar: 'https://i.pravatar.cc/80?img=25',
      content: 'O consultor me explicou tudo com clareza, não teve nenhuma surpresa. O consórcio é realmente a forma mais inteligente de adquirir um bem.',
      type: 'Imóvel',
    },
    {
      name: 'Thiago Oliveira',
      role: 'Contemplado no Consórcio Automóvel',
      avatar: 'https://i.pravatar.cc/80?img=68',
      content: 'Entrei com parcelas acessíveis e em menos de um ano já estava com meu carro novo. Nunca mais vou financiar nada na vida.',
      type: 'Automóvel',
      highlight: true,
    },
    {
      name: 'Ana Paula Lima',
      role: 'Contemplada no Consórcio Imóvel',
      avatar: 'https://i.pravatar.cc/80?img=33',
      content: 'Usei a carta de crédito de forma inteligente. Foi ágil, sem burocracia e o valor corrigido me permitiu fazer tudo que planejei. Excelente opção.',
      type: 'Imóvel',
    },
  ],
];

const typeColors: Record<string, string> = {
  'Imóvel':    '#2563EB',
  'Automóvel': '#7C3AED',
  'Moto':      '#D97706',
  'Serviços':  '#16A34A',
};

export function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const testimonials = allTestimonials[page];

  return (
    <section
      id="depoimentos"
      className="bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-300"
    >
      {/* Stats bar — moved to StatsFloatingBar component in App.tsx */}

      {/* Testimonials */}
      <div className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2
                className="text-[36px] leading-[1.15]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
              >
                <span className="block text-[#111827] dark:text-white">Quem já realizou</span>
                <span className="block text-[#2563EB]">o sonho com a gente</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 self-start mt-2">
              <button
                onClick={() => setPage(0)}
                disabled={page === 0}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-gray-700 flex items-center justify-center hover:border-[#2563EB] hover:text-[#2563EB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 text-[#111827] dark:text-gray-300"
                aria-label="Anterior"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-gray-700 flex items-center justify-center hover:border-[#2563EB] hover:text-[#2563EB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 text-[#111827] dark:text-gray-300"
                aria-label="Próximo"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => {
              const isHighlight = t.highlight;
              const tagColor = typeColors[t.type] ?? '#2563EB';
              return (
                <div
                  key={i}
                  className="rounded-xl p-5 flex flex-col gap-4 transition-all duration-300"
                  style={{
                    backgroundColor: isHighlight ? '#2563EB' : '#FFFFFF',
                    border: isHighlight ? 'none' : '1px solid #E5E7EB',
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={13}
                        fill={isHighlight ? '#FFFFFF' : '#FBBF24'}
                        color={isHighlight ? '#FFFFFF' : '#FBBF24'}
                      />
                    ))}
                  </div>

                  {/* Body */}
                  <p
                    className="text-[14px] leading-relaxed flex-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: isHighlight ? 'rgba(255,255,255,0.9)' : '#374151',
                      lineHeight: '1.65',
                    }}
                  >
                    "{t.content}"
                  </p>

                  {/* Type tag */}
                  <span
                    className="self-start text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: isHighlight ? 'rgba(255,255,255,0.2)' : `${tagColor}18`,
                      color: isHighlight ? '#FFFFFF' : tagColor,
                    }}
                  >
                    Consórcio {t.type}
                  </span>

                  {/* Avatar */}
                  <div className="flex items-center gap-3 pt-1 border-t"
                    style={{ borderColor: isHighlight ? 'rgba(255,255,255,0.2)' : '#F3F4F6' }}
                  >
                    <div
                      className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
                      style={{ border: isHighlight ? '2px solid rgba(255,255,255,0.4)' : '2px solid #E5E7EB' }}
                    >
                      <ImageWithFallback src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div
                        className="text-[13px]"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          color: isHighlight ? '#FFFFFF' : '#111827',
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        className="text-[12px]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: isHighlight ? 'rgba(255,255,255,0.65)' : '#6B7280',
                        }}
                      >
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}