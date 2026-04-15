import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { Target, Eye, CheckCircle2 } from 'lucide-react';

const valores = [
  { word: 'Excelência',      desc: 'buscamos resultados consistentes e melhoria contínua' },
  { word: 'Ética',           desc: 'atuamos com transparência, responsabilidade e respeito' },
  { word: 'Parceria',        desc: 'valorizamos relações duradouras com clientes, colaboradores e parceiros' },
  { word: 'Entusiasmo',      desc: 'acreditamos no poder de pessoas engajadas para transformar resultados' },
  { word: 'Foco no cliente', desc: 'colocamos as necessidades e objetivos dos clientes no centro das decisões' },
];

function Label({ text, light }: { text: string; light?: boolean }) {
  const color = light ? '#009cde' : '#2563EB';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <div style={{ width: '28px', height: '2px', backgroundColor: color }} />
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color }}>
        {text}
      </span>
    </div>
  );
}

export function NossaCultura() {
  return (
    <>
      <Header />

      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif" }}>

        {/* ── 1. HERO ── */}
        <section
          style={{
            backgroundColor: '#111827',
            padding: 'clamp(56px, 10vw, 96px) clamp(24px, 6vw, 96px)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 0 28px 28px',
          }}
        >
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,156,222,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Label text="Quem somos" light />
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(36px, 5vw, 72px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#fff',
                margin: '0 0 24px',
              }}
            >
              Nossa{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>
                cultura
              </span>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(15px, 1.5vw, 18px)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
                maxWidth: '560px',
                margin: 0,
              }}
            >
              Os princípios que orientam nossas decisões, fortalecem nossas relações e impulsionam nossos resultados.
            </p>
          </div>
        </section>

        {/* ── 2. MISSÃO, VISÃO E VALORES ── */}
        <section style={{ backgroundColor: '#fff', padding: 'clamp(56px, 10vw, 96px) 24px' }}>
          <div className="max-w-7xl mx-auto">

            <div style={{ marginBottom: '56px' }}>
              <Label text="Identidade" />
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
                Missão, Visão e{' '}
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>
                  Valores
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">

              {/* MISSÃO */}
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '24px',
                  padding: '40px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', opacity: 0.045, pointerEvents: 'none' }}>
                  <Target size={160} color="#2563EB" strokeWidth={1} />
                </div>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  <Target size={24} color="#2563EB" strokeWidth={1.6} />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#2563EB', marginBottom: '8px' }}>
                    Missão
                  </p>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '20px', color: '#111827', lineHeight: 1.3, marginBottom: '16px' }}>
                    Gerar oportunidades e transformar vidas
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#374151', lineHeight: 1.85, margin: 0 }}>
                    por meio de soluções em consórcios e seguros. Oferecemos produtos que unem planejamento financeiro, segurança e acompanhamento próximo, garantindo que clientes, parceiros e colaboradores vivenciem conquistas reais e experiências positivas ao longo de sua jornada.
                  </p>
                </div>
              </div>

              {/* VISÃO */}
              <div
                style={{
                  background: '#111827',
                  borderRadius: '24px',
                  padding: '40px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', opacity: 0.07, pointerEvents: 'none' }}>
                  <Eye size={160} color="#009cde" strokeWidth={1} />
                </div>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(0,156,222,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  <Eye size={24} color="#009cde" strokeWidth={1.6} />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#009cde', marginBottom: '8px' }}>
                    Visão
                  </p>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '20px', color: '#fff', lineHeight: 1.3, marginBottom: '16px' }}>
                    Ser a maior corretora de consórcios e seguros do Brasil
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0 }}>
                    Buscamos consolidar nossa liderança com crescimento sustentável, inovação e excelência no atendimento, mantendo a confiança de clientes, parceiros e colaboradores em cada etapa do nosso desenvolvimento.
                  </p>
                </div>
              </div>

              {/* VALORES */}
              <div
                style={{
                  background: '#f8f7f5',
                  borderRadius: '24px',
                  padding: '40px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', opacity: 0.06, pointerEvents: 'none' }}>
                  <CheckCircle2 size={160} color="#2563EB" strokeWidth={1} />
                </div>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'relative', zIndex: 1 }}>
                  <CheckCircle2 size={24} color="#2563EB" strokeWidth={1.6} />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#2563EB', marginBottom: '8px' }}>
                    Valores
                  </p>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '20px', color: '#111827', lineHeight: 1.3, marginBottom: '20px' }}>
                    Os princípios que orientam nossas decisões e relações
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {valores.map(({ word, desc }) => (
                      <div key={word} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: '7px' }} />
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#374151', lineHeight: 1.6, margin: 0 }}>
                          <strong style={{ color: '#111827' }}>{word}</strong> — {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. BLOCO COMPLEMENTAR ── */}
        <section
          style={{
            backgroundColor: '#111827',
            padding: 'clamp(56px, 10vw, 96px) 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">

              {/* Esquerda */}
              <div>
                <Label text="Na prática" light />
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(26px, 3vw, 42px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#fff',
                    marginTop: '4px',
                  }}
                >
                  Nossa cultura{' '}
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>
                    na prática
                  </span>
                </h2>
              </div>

              {/* Direita */}
              <div>
                <div style={{ width: '40px', height: '1.5px', background: 'rgba(255,255,255,0.15)', marginBottom: '28px' }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, margin: 0 }}>
                  Na Porto Vale, cultura é mais do que um conceito. É o que orienta nossas decisões, fortalece nossas relações e impulsiona nossos resultados. Acreditamos que pessoas engajadas, valores sólidos e foco no cliente são a base para construir uma empresa sustentável e relevante no mercado.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
