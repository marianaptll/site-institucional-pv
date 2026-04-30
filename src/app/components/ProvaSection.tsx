import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SectionLabel } from './SectionLabel';

const allTestimonials = [
  [
    { name: 'Lucas Ferreira',  role: 'Contemplado no Consórcio Automóvel', avatar: 'https://i.pravatar.cc/80?img=11', content: 'Entrei no consórcio sem acreditar muito. Em 14 meses fui contemplado por sorteio e hoje tenho meu carro pago sem pagar um centavo de juros. Simplesmente incrível.', type: 'Automóvel' },
    { name: 'Camila Rocha',    role: 'Contemplada no Consórcio Imóvel',    avatar: 'https://i.pravatar.cc/80?img=47', content: 'Comparei com o financiamento e a diferença foi absurda. Economizei muito no total. O atendimento foi excelente do começo ao fim.', type: 'Imóvel', highlight: true },
    { name: 'Rafael Mendes',   role: 'Contemplado no Consórcio Automóvel', avatar: 'https://i.pravatar.cc/80?img=52', content: 'Fiz o lance e fui contemplado no 8º mês. O processo foi transparente e a equipe me ajudou em cada passo. Recomendo para todo mundo que quer comprar sem juros.', type: 'Automóvel' },
  ],
  [
    { name: 'Fernanda Costa',  role: 'Contemplada no Consórcio Imóvel',    avatar: 'https://i.pravatar.cc/80?img=25', content: 'O consultor me explicou tudo com clareza, não teve nenhuma surpresa. O consórcio é realmente a forma mais inteligente de adquirir um bem.', type: 'Imóvel' },
    { name: 'Thiago Oliveira', role: 'Contemplado no Consórcio Automóvel', avatar: 'https://i.pravatar.cc/80?img=68', content: 'Entrei com parcelas acessíveis e em menos de um ano já estava com meu carro novo. Nunca mais vou financiar nada na vida.', type: 'Automóvel', highlight: true },
    { name: 'Ana Paula Lima',  role: 'Contemplada no Consórcio Imóvel',    avatar: 'https://i.pravatar.cc/80?img=33', content: 'Usei a carta de crédito de forma inteligente. Foi ágil, sem burocracia e o valor corrigido me permitiu fazer tudo que planejei. Excelente opção.', type: 'Imóvel' },
  ],
];

const typeColors: Record<string, string> = {
  'Imóvel':    '#2563EB',
  'Automóvel': '#7C3AED',
  'Moto':      '#D97706',
  'Serviços':  '#16A34A',
};

const videoCards = [
  { name: 'Davi Araújo',        type: 'Consórcio de automóvel', icon: 'car',  img: '/imagens/davi-araújo.png'        },
  { name: 'Antonieta Amarante', type: 'Consórcio de imóvel',    icon: 'home', img: '/imagens/antonieta-amarante.png' },
  { name: 'Brenno Tavares',     type: 'Consórcio de automóvel', icon: 'car',  img: '/imagens/brenno-tavares.png'     },
  { name: 'Roberto Silva',      type: 'Consórcio de automóvel', icon: 'car',  img: '/imagens/roberto-silva.png'      },
];

export function ProvaSection() {
  const [hoveredCard, setHoveredCard] = useState<number>(0);
  const [page, setPage] = useState(0);
  const pageTestimonials = allTestimonials[page];
  const [highlightedCard, setHighlightedCard] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedCard(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16"
        style={{ paddingTop: '56px', paddingBottom: '56px' }}
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">

          {/* Esquerda: título + card Google */}
          <div>
            <SectionLabel>Depoimentos</SectionLabel>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(26px, 2.8vw, 44px)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '10px',
            }}>
              <span style={{ color: '#111827' }}>Clientes reais,</span>
              <br />
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>conquistas </span>
              <span style={{ color: '#111827' }}>incríveis!</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7280', lineHeight: 1.6, maxWidth: '400px', marginBottom: '24px' }}>
              Pessoas reais que realizaram seus sonhos com a Porto Vale.
              Veja os relatos por trás de nossas{' '}
              <span style={{ color: '#111827', fontWeight: 500 }}>histórias de sucesso</span>.
            </p>

            {/* Card Google */}
            <div style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '20px 24px',
              maxWidth: '360px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <svg width="72" height="24" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                  <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                  <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                  <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                  <path d="M35.29 41.41V32H63c.28 1.45.42 2.95.42 4.7 0 5.87-1.61 13.14-6.79 18.32-5.04 5.21-11.47 7.98-19.99 7.98C19.3 63 5 49.15 5 31.5S19.3 0 36.64 0c8.78 0 15.04 3.45 19.74 7.98l-5.55 5.55c-3.36-3.19-7.98-5.63-14.19-5.63-11.59 0-20.66 9.33-20.66 20.92s9.07 20.92 20.66 20.92c7.52 0 11.81-3.02 14.57-5.79 2.23-2.23 3.7-5.42 4.27-9.74H35.29z" fill="#4285F4"/>
                </svg>
                <div style={{ width: '1px', height: '28px', background: '#E5E7EB' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#6B7280', fontWeight: 500 }}>Meu Negócio</span>
              </div>

              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '52px', lineHeight: 1, color: '#111827', marginBottom: '6px' }}>4,9</div>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FBBF24">
                        <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/>
                      </svg>
                    ))}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#6B7280' }}>3.397 comentários</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', paddingTop: '4px' }}>
                  {[{ label: '5', pct: 92 }, { label: '4', pct: 5 }, { label: '3', pct: 1 }, { label: '2', pct: 1 }, { label: '1', pct: 1 }].map(({ label, pct }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B7280', width: '8px' }}>{label}</span>
                      <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: '#E5E7EB', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: pct > 10 ? '#FBBF24' : '#D1D5DB' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="/nossos-clientes"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#009cde', textDecoration: 'none', borderBottom: '1px solid rgba(0,156,222,0.3)', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0089c4'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,137,196,0.6)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#009cde'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,156,222,0.3)'; }}
            >
              Ver todos os clientes
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Direita: cards de vídeo — expansão hover no desktop, carrossel horizontal no mobile */}
          <div className="hidden lg:flex" style={{ gap: '10px', alignItems: 'stretch', height: '420px' }}>
            {videoCards.map((t, i) => {
              const isActive = hoveredCard === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredCard(i)}
                  style={{ flex: isActive ? '3' : '1', borderRadius: '20px', overflow: 'hidden', position: 'relative', transition: 'flex 0.4s ease', cursor: 'pointer', minWidth: 0 }}
                >
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '14px', right: '14px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {t.icon === 'car' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    )}
                  </div>
                  <div style={{ position: 'absolute', bottom: '56px', left: '18px', opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '4px' }}>{t.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{t.type}</div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '16px', left: isActive ? '18px' : '50%', transform: isActive ? 'none' : 'translateX(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease, left 0.4s ease, transform 0.4s ease' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><path d="M3 2l9 5-9 5V2z"/></svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: carrossel horizontal de cards */}
          <div className="lg:hidden -mx-4 px-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div style={{ display: 'flex', gap: '10px', paddingBottom: '8px' }}>
              {videoCards.map((t, i) => (
                <div key={i} style={{ flexShrink: 0, width: '160px', height: '220px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '13px', color: '#fff', marginBottom: '2px' }}>{t.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>{t.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards de depoimento */}
        <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #E5E7EB', position: 'relative', paddingBottom: '64px' }}>
          <div style={{ position: 'absolute', bottom: '-0.18em', left: '50%', transform: 'translateX(-50%)', width: '100vw', textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '18vw', letterSpacing: '-0.04em', color: '#111827', opacity: 0.05, whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', lineHeight: 1, zIndex: 0 }}>
            feedback
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '24px' }}>
              <button onClick={() => setPage(0)} disabled={page === 0} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === 0 ? 0.3 : 1, transition: 'opacity 0.2s' }}>
                <ArrowLeft size={16} />
              </button>
              <button onClick={() => setPage(1)} disabled={page === 1} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === 1 ? 0.3 : 1, transition: 'opacity 0.2s' }}>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Grid: 1 coluna mobile, 3 colunas desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pageTestimonials.map((t, i) => {
                const isHighlight = highlightedCard === i;
                const tagColor = typeColors[t.type] ?? '#2563EB';
                return (
                  <div key={i} style={{ borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: isHighlight ? '#2563EB' : 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: isHighlight ? 'none' : '1px solid rgba(0,0,0,0.07)', transition: 'background-color 0.8s ease, border 0.8s ease' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={13} fill={isHighlight ? '#fff' : '#FBBF24'} color={isHighlight ? '#fff' : '#FBBF24'} />
                      ))}
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.65, flex: 1, color: isHighlight ? 'rgba(255,255,255,0.9)' : '#374151' }}>
                      "{t.content}"
                    </p>
                    <span style={{ alignSelf: 'flex-start', fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px', backgroundColor: isHighlight ? 'rgba(255,255,255,0.2)' : `${tagColor}18`, color: isHighlight ? '#fff' : tagColor }}>
                      Consórcio {t.type}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px', borderTop: `1px solid ${isHighlight ? 'rgba(255,255,255,0.2)' : '#F3F4F6'}` }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `2px solid ${isHighlight ? 'rgba(255,255,255,0.4)' : '#E5E7EB'}` }}>
                        <ImageWithFallback src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '13px', color: isHighlight ? '#fff' : '#111827' }}>{t.name}</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: isHighlight ? 'rgba(255,255,255,0.65)' : '#6B7280' }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
