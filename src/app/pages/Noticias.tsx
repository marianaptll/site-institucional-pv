import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { SectionLabel } from '../components/SectionLabel';
import { NOTICIAS, type Noticia } from '../data/noticias';

// ─── CARD ─────────────────────────────────────────────────────────────────────

function CardNoticia({ noticia }: { noticia: Noticia }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={noticia.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#fff',
        border: `1px solid ${hovered ? '#009cde' : '#E5E7EB'}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        boxShadow: hovered ? '0 8px 32px rgba(0,156,222,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {/* Imagem */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0 }}>
        {noticia.imagem ? (
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: noticia.objectPosition ?? 'center',
              transition: 'transform 0.7s ease-out',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e3a5f 0%, #009cde 100%)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />

        {noticia.destaque && (
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            background: '#009cde', color: '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
            fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: '999px',
          }}>
            Destaque
          </div>
        )}

        <div style={{ position: 'absolute', bottom: '12px', left: '12px', color: '#fff' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '12px', opacity: 0.95, marginBottom: '2px' }}>
            {noticia.veiculo}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', opacity: 0.7 }}>
            {noticia.data} · {noticia.local}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
          fontSize: '15px', lineHeight: 1.4, letterSpacing: '-0.01em',
          color: hovered ? '#009cde' : '#111827', margin: 0,
          transition: 'color 0.2s',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {noticia.titulo}
        </h3>

        <div style={{
          marginTop: 'auto', paddingTop: '8px',
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '12px',
          color: '#009cde',
        }}>
          Ler matéria
          <ExternalLink size={12} />
        </div>
      </div>
    </a>
  );
}

// ─── CARD DESTAQUE ────────────────────────────────────────────────────────────

function CardDestaque({ noticia }: { noticia: Noticia }) {
  return (
    <a
      href={noticia.href}
      target="_blank"
      rel="noopener noreferrer"
      className="grid sm:grid-cols-2"
      style={{
        borderRadius: '24px', overflow: 'hidden',
        background: '#fff', border: '1px solid #E5E7EB',
        minHeight: '360px', textDecoration: 'none', display: 'grid',
      }}
    >
      {/* Imagem */}
      <div style={{
        position: 'relative', minHeight: '260px', overflow: 'hidden',
        background: noticia.imagem
          ? `url(${noticia.imagem}) ${noticia.objectPosition ?? 'center'}/cover no-repeat`
          : 'linear-gradient(135deg, #1e3a5f 0%, #009cde 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
        <div style={{
          position: 'absolute', top: '20px', left: '20px',
          background: '#009cde', color: '#fff',
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
          fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: '999px',
        }}>
          Mais recente
        </div>
        <div style={{
          position: 'absolute', bottom: '20px', left: '20px',
          background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
          borderRadius: '8px', padding: '5px 10px',
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
            {noticia.veiculo} · {noticia.data}
          </span>
        </div>
      </div>

      {/* Texto */}
      <div style={{ padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
          {noticia.local}
        </p>

        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
          fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.2,
          letterSpacing: '-0.02em', color: '#111827', margin: 0,
        }}>
          {noticia.titulo}
        </h2>

        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#111827', color: '#fff', borderRadius: '12px',
          padding: '12px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700, fontSize: '13px', width: 'fit-content',
        }}>
          Ler matéria completa
          <ExternalLink size={14} />
        </span>
      </div>
    </a>
  );
}

// ─── PÁGINA ───────────────────────────────────────────────────────────────────

export function Noticias() {
  const destaque = NOTICIAS.find(n => n.destaque) ?? NOTICIAS[0];
  const demais = NOTICIAS.filter(n => n.id !== destaque.id);

  return (
    <>
      <Header />
      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif", backgroundColor: '#F9FAFB', minHeight: '80vh' }}>

        {/* Hero */}
        <section style={{ backgroundColor: '#111827', padding: 'clamp(56px, 10vw, 96px) 24px' }}>
          <div className="max-w-4xl mx-auto text-center">
            <SectionLabel center dark>Imprensa</SectionLabel>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 1.08,
              letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px',
            }}>
              Porto Vale na{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>
                Imprensa
              </span>
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
              Notícias sobre a Porto Vale, o mercado de consórcios e tudo que pode ajudar você a tomar melhores decisões financeiras.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 flex flex-col gap-12">

          {/* Destaque */}
          <section>
            <SectionLabel>Mais recente</SectionLabel>
            <CardDestaque noticia={destaque} />
          </section>

          {/* Grid */}
          {demais.length > 0 && (
            <section>
              <SectionLabel>Todas as matérias</SectionLabel>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                gap: '20px',
              }}>
                {demais.map(noticia => (
                  <CardNoticia key={noticia.id} noticia={noticia} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
