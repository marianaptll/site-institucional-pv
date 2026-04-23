import { useParams, Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { ARTIGOS, getGradiente, getCor, type Bloco, type Artigo } from '../data/artigos';

function CategoriaBadge({ cat }: { cat: string }) {
  const cor = getCor(cat);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      backgroundColor: cor.bg, color: cor.text,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700, fontSize: '11px',
      letterSpacing: '0.06em', textTransform: 'uppercase',
      padding: '4px 10px', borderRadius: '999px',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cor.dot, flexShrink: 0 }} />
      {cat}
    </span>
  );
}

function RenderBloco({ bloco }: { bloco: Bloco }) {
  const bodyFont = "'Inter', sans-serif";
  const headFont = "'Plus Jakarta Sans', sans-serif";

  switch (bloco.tipo) {
    case 'p':
      return (
        <p style={{
          fontFamily: bodyFont, fontSize: '17px', lineHeight: 1.85,
          color: '#374151', margin: '0 0 24px',
        }}>
          {bloco.texto}
        </p>
      );

    case 'h2':
      return (
        <h2 style={{
          fontFamily: headFont, fontWeight: 800,
          fontSize: 'clamp(20px, 2.5vw, 26px)', lineHeight: 1.2,
          letterSpacing: '-0.02em', color: '#111827',
          margin: '52px 0 16px', paddingTop: '4px',
        }}>
          {bloco.texto}
        </h2>
      );

    case 'h3':
      return (
        <h3 style={{
          fontFamily: headFont, fontWeight: 700,
          fontSize: '18px', lineHeight: 1.3,
          color: '#1F2937', margin: '32px 0 10px',
        }}>
          {bloco.texto}
        </h3>
      );

    case 'lista':
      return (
        <ul style={{ margin: '0 0 28px', paddingLeft: '0', listStyle: 'none' }}>
          {bloco.itens.map((item, i) => (
            <li key={i} style={{
              fontFamily: bodyFont, fontSize: '17px', lineHeight: 1.75,
              color: '#374151', marginBottom: '10px',
              paddingLeft: '24px', position: 'relative',
            }}>
              <span style={{
                position: 'absolute', left: 0, top: '10px',
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#009cde', flexShrink: 0,
              }} />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'destaque':
      return (
        <div style={{
          background: '#EFF6FF', borderLeft: '4px solid #009cde',
          borderRadius: '0 12px 12px 0', padding: '20px 24px',
          margin: '32px 0',
        }}>
          <p style={{
            fontFamily: headFont, fontWeight: 700, fontSize: '16px',
            lineHeight: 1.65, color: '#1e3a5f', margin: 0,
          }}>
            {bloco.texto}
          </p>
        </div>
      );

    case 'citacao':
      return (
        <blockquote style={{
          borderLeft: '3px solid #E5E7EB',
          margin: '40px 0', padding: '8px 0 8px 28px',
        }}>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: '20px', fontStyle: 'italic',
            lineHeight: 1.65, color: '#4B5563', margin: '0 0 10px',
          }}>
            "{bloco.texto}"
          </p>
          {bloco.autor && (
            <p style={{
              fontFamily: bodyFont, fontSize: '13px',
              color: '#9CA3AF', margin: 0, fontWeight: 500,
            }}>
              — {bloco.autor}
            </p>
          )}
        </blockquote>
      );

    default:
      return null;
  }
}

function MiniCard({ artigo }: { artigo: Artigo }) {
  const gradient = getGradiente(artigo.categoria);
  return (
    <a
      href={`/artigos/${artigo.slug}`}
      style={{
        display: 'flex', flexDirection: 'column',
        borderRadius: '16px', overflow: 'hidden',
        background: '#fff', border: '1px solid #E5E7EB',
        textDecoration: 'none',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,156,222,0.12)';
        e.currentTarget.style.borderColor = '#009cde';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#E5E7EB';
      }}
    >
      <div style={{ background: gradient, height: '120px', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <CategoriaBadge cat={artigo.categoria} />
        </div>
      </div>
      <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '11px',
          color: '#9CA3AF', fontWeight: 500, margin: 0,
        }}>
          {artigo.data} · {artigo.leitura} min
        </p>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
          fontSize: '14px', lineHeight: 1.4, color: '#111827', margin: 0,
        }}>
          {artigo.titulo}
        </h3>
        <span style={{
          marginTop: 'auto', paddingTop: '8px',
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
          fontSize: '12px', color: '#009cde',
        }}>
          Ler artigo
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

export function ArtigoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const artigo = ARTIGOS.find(a => a.slug === slug);

  if (!artigo) {
    return (
      <>
        <Header />
        <main style={{ paddingTop: '68px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB' }}>
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#9CA3AF', marginBottom: '12px' }}>404</p>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '28px', color: '#111827', margin: '0 0 24px' }}>
              Artigo não encontrado
            </h1>
            <Link to="/artigos" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#111827', color: '#fff', borderRadius: '12px',
              padding: '12px 24px', fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: '14px', textDecoration: 'none',
            }}>
              ← Voltar para Artigos
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const gradient = getGradiente(artigo.categoria);
  const relacionados = ARTIGOS.filter(a => a.slug !== artigo.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main style={{ paddingTop: '68px', backgroundColor: '#fff' }}>

        {/* Hero */}
        <section style={{
          background: gradient,
          minHeight: 'clamp(300px, 42vw, 460px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
          }} />
          <div style={{
            position: 'relative', zIndex: 1,
            maxWidth: '780px', margin: '0 auto', width: '100%',
            padding: 'clamp(24px, 5vw, 56px) clamp(20px, 5vw, 48px)',
          }}>
            <CategoriaBadge cat={artigo.categoria} />
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.1,
              letterSpacing: '-0.03em', color: '#fff',
              margin: '18px 0 0', maxWidth: '680px',
            }}>
              {artigo.titulo}
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '14px',
              color: 'rgba(255,255,255,0.65)', marginTop: '16px', fontWeight: 500,
            }}>
              {artigo.data} · {artigo.leitura} min de leitura
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto', padding: '14px clamp(20px, 5vw, 48px)' }}>
            <Link to="/artigos" style={{
              fontFamily: "'Inter', sans-serif", fontSize: '13px',
              color: '#6B7280', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontWeight: 500,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#009cde'}
            onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar para Artigos
            </Link>
          </div>
        </div>

        {/* Article body */}
        <article style={{
          maxWidth: '780px', margin: '0 auto',
          padding: 'clamp(36px, 6vw, 72px) clamp(20px, 5vw, 48px) clamp(36px, 6vw, 72px)',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '18px', lineHeight: 1.75,
            color: '#6B7280', margin: '0 0 40px',
            borderBottom: '1px solid #F3F4F6', paddingBottom: '40px',
            fontStyle: 'italic',
          }}>
            {artigo.resumo}
          </p>

          {artigo.conteudo.map((bloco, i) => (
            <RenderBloco key={i} bloco={bloco} />
          ))}
        </article>

        {/* CTA */}
        <section style={{
          backgroundColor: '#111827',
          padding: 'clamp(48px, 8vw, 80px) 24px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '13px',
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em',
            textTransform: 'uppercase', fontWeight: 600, margin: '0 0 16px',
          }}>
            Porto Vale Consórcios
          </p>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.15,
            letterSpacing: '-0.02em', color: '#fff',
            margin: '0 0 12px',
          }}>
            Pronto para dar o próximo passo?
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '16px',
            color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
            maxWidth: '440px', margin: '0 auto 32px',
          }}>
            Fale com um consultor e descubra o grupo ideal para o seu perfil. Sem compromisso.
          </p>
          <a
            href="/contato"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#009cde', color: '#fff', borderRadius: '14px',
              padding: '14px 28px', fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: '15px', textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#0082ba'}
            onMouseLeave={e => e.currentTarget.style.background = '#009cde'}
          >
            Fale com um consultor
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </section>

        {/* Related articles */}
        {relacionados.length > 0 && (
          <section style={{
            backgroundColor: '#F9FAFB',
            padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)',
          }}>
            <div style={{ maxWidth: '780px', margin: '0 auto' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '11px',
                color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase',
                fontWeight: 700, margin: '0 0 8px',
              }}>
                Continue lendo
              </p>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 2.5vw, 26px)', color: '#111827',
                letterSpacing: '-0.02em', margin: '0 0 28px',
              }}>
                Leia também
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))',
                gap: '16px',
              }}>
                {relacionados.map(a => <MiniCard key={a.slug} artigo={a} />)}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
