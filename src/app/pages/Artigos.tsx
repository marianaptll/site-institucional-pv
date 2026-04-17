import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { SectionLabel } from '../components/SectionLabel';

// ─── DADOS DOS ARTIGOS ────────────────────────────────────────────────────────
// Para adicionar um novo artigo: copie um objeto abaixo e preencha os campos.
// Deixe `image: null` enquanto não tiver imagem — aparecerá um gradiente.
// ─────────────────────────────────────────────────────────────────────────────

type Artigo = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  data: string;          // formato: 'DD/MM/AAAA'
  leitura: number;       // minutos estimados
  destaque?: boolean;    // true = aparece no card grande
  image: string | null;  // caminho da imagem ou null
};

const ARTIGOS: Artigo[] = [
  {
    slug: 'baixa-selic-conquistar-imovel',
    titulo: 'Como aproveitar a baixa da Selic para conquistar seu imóvel?',
    resumo: 'Com a queda da taxa básica de juros, o consórcio imobiliário se torna ainda mais competitivo. Entenda por que este é o momento certo para planejar a compra do seu imóvel sem pagar juros.',
    categoria: 'Imóveis',
    data: '10/04/2026',
    leitura: 6,
    destaque: true,
    image: null,
  },
  {
    slug: 'poupanca-forcada-2026',
    titulo: 'Como usar o consórcio para fazer uma poupança forçada em 2026?',
    resumo: 'Disciplina financeira é difícil. Veja como o consórcio funciona como uma ferramenta automática de poupança que garante seu patrimônio no longo prazo.',
    categoria: 'Planejamento',
    data: '05/04/2026',
    leitura: 5,
    image: null,
  },
  {
    slug: 'consorcio-casa-patrimonio-2026',
    titulo: 'Consórcio de casa: conquiste seu patrimônio em 2026',
    resumo: 'Descubra como planejar a compra da sua casa própria com consórcio, sem entrada e sem juros. Um guia prático para quem quer sair do aluguel este ano.',
    categoria: 'Imóveis',
    data: '28/03/2026',
    leitura: 7,
    image: null,
  },
  {
    slug: 'tipos-de-lance-como-escolher',
    titulo: 'Quais os tipos de lance e como escolher para você?',
    resumo: 'Lance livre, fixo ou embutido — cada modalidade tem suas vantagens. Aprenda a calcular o melhor tipo de lance para ser contemplado mais rápido no seu grupo.',
    categoria: 'Lances',
    data: '20/03/2026',
    leitura: 8,
    image: null,
  },
  {
    slug: 'sistema-consorcios-58-milhoes-2025',
    titulo: 'Sistema de consórcios registra 5,8 milhões de cotas vendidas em 2025',
    resumo: 'O mercado de consórcios bate novo recorde histórico. Veja os dados do Banco Central e o que esse crescimento significa para quem está planejando entrar em um grupo.',
    categoria: 'Mercado',
    data: '14/03/2026',
    leitura: 4,
    image: null,
  },
  {
    slug: 'porto-vale-guia-consorcio',
    titulo: 'A Porto Vale e o Guia do Consórcio: tudo que você precisa saber',
    resumo: 'Reunimos as principais dúvidas de quem está começando no mundo dos consórcios. Um material completo para você tomar a melhor decisão.',
    categoria: 'Guia',
    data: '07/03/2026',
    leitura: 10,
    image: null,
  },
  // ── Adicione os demais 25 artigos abaixo seguindo o mesmo formato ──────────
];

// ─── CATEGORIAS ──────────────────────────────────────────────────────────────

const TODAS = 'Todas';

const CATEGORIA_CORES: Record<string, { bg: string; text: string; dot: string }> = {
  'Imóveis':     { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  'Planejamento':{ bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
  'Mercado':     { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  'Lances':      { bg: '#FDF4FF', text: '#7E22CE', dot: '#A855F7' },
  'Veículos':    { bg: '#F0F9FF', text: '#0369A1', dot: '#0EA5E9' },
  'Investimento':{ bg: '#FEFCE8', text: '#854D0E', dot: '#EAB308' },
  'Guia':        { bg: '#F8FAFC', text: '#475569', dot: '#94A3B8' },
};

function getCor(cat: string) {
  return CATEGORIA_CORES[cat] ?? { bg: '#F3F4F6', text: '#374151', dot: '#9CA3AF' };
}

// Gradientes de placeholder por categoria (enquanto não há imagem)
const GRADIENTES: Record<string, string> = {
  'Imóveis':     'linear-gradient(135deg, #1e3a5f 0%, #009cde 100%)',
  'Planejamento':'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
  'Mercado':     'linear-gradient(135deg, #7c2d12 0%, #f97316 100%)',
  'Lances':      'linear-gradient(135deg, #4a1d96 0%, #a855f7 100%)',
  'Veículos':    'linear-gradient(135deg, #0c4a6e 0%, #38bdf8 100%)',
  'Investimento':'linear-gradient(135deg, #713f12 0%, #eab308 100%)',
  'Guia':        'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
};

function getGradiente(cat: string) {
  return GRADIENTES[cat] ?? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
}

// ─── COMPONENTES ─────────────────────────────────────────────────────────────

function CategoriaBadge({ cat, small }: { cat: string; small?: boolean }) {
  const cor = getCor(cat);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      backgroundColor: cor.bg, color: cor.text,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700, fontSize: small ? '10px' : '11px',
      letterSpacing: '0.06em', textTransform: 'uppercase',
      padding: small ? '3px 8px' : '4px 10px', borderRadius: '999px',
    }}>
      <span style={{ width: small ? '5px' : '6px', height: small ? '5px' : '6px', borderRadius: '50%', background: cor.dot, flexShrink: 0 }} />
      {cat}
    </span>
  );
}

function CardDestaque({ artigo }: { artigo: Artigo }) {
  return (
    <article
      className="grid sm:grid-cols-2"
      style={{
        borderRadius: '24px', overflow: 'hidden',
        background: '#fff', border: '1px solid #E5E7EB',
        minHeight: '360px',
      }}
    >
      {/* Imagem / Gradiente */}
      <div style={{
        background: artigo.image ? `url(${artigo.image}) center/cover` : getGradiente(artigo.categoria),
        minHeight: '260px', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <CategoriaBadge cat={artigo.categoria} />
        </div>
        <div style={{
          position: 'absolute', bottom: '20px', left: '20px',
          background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
          borderRadius: '8px', padding: '5px 10px',
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
            {artigo.data} · {artigo.leitura} min de leitura
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#FFF7ED', borderRadius: '999px', padding: '4px 12px', width: 'fit-content',
        }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C2410C' }}>
            Mais recente
          </span>
        </div>

        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
          fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.2,
          letterSpacing: '-0.02em', color: '#111827', margin: 0,
        }}>
          {artigo.titulo}
        </h2>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
          {artigo.resumo}
        </p>

        <a href={`/artigos/${artigo.slug}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#111827', color: '#fff', borderRadius: '12px',
          padding: '12px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700, fontSize: '13px', textDecoration: 'none',
          width: 'fit-content', transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#009cde')}
        onMouseLeave={e => (e.currentTarget.style.background = '#111827')}
        >
          Ler artigo
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  );
}

function Card({ artigo }: { artigo: Artigo }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px', overflow: 'hidden',
        background: '#fff', border: `1px solid ${hovered ? '#009cde' : '#E5E7EB'}`,
        display: 'flex', flexDirection: 'column',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 8px 32px rgba(0,156,222,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
        cursor: 'pointer',
      }}
    >
      {/* Imagem / Gradiente */}
      <div style={{
        background: artigo.image ? `url(${artigo.image}) center/cover` : getGradiente(artigo.categoria),
        height: '180px', position: 'relative', flexShrink: 0,
        transition: 'height 0.2s',
      }}>
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
          <CategoriaBadge cat={artigo.categoria} small />
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#9CA3AF', fontWeight: 500, margin: 0 }}>
          {artigo.data} · {artigo.leitura} min
        </p>

        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
          fontSize: '15px', lineHeight: 1.35, letterSpacing: '-0.01em',
          color: hovered ? '#009cde' : '#111827', margin: 0,
          transition: 'color 0.2s',
        }}>
          {artigo.titulo}
        </h3>

        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280',
          lineHeight: 1.65, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {artigo.resumo}
        </p>

        <a href={`/artigos/${artigo.slug}`} style={{
          marginTop: 'auto', paddingTop: '12px',
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '12px',
          color: '#009cde', textDecoration: 'none',
        }}>
          Ler artigo
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  );
}

// ─── PÁGINA ──────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 9;

export function Artigos() {
  const categorias = [TODAS, ...Array.from(new Set(ARTIGOS.map(a => a.categoria)))];
  const [catAtiva, setCatAtiva] = useState(TODAS);
  const [pagina, setPagina] = useState(1);

  const destacado = ARTIGOS.find(a => a.destaque) ?? ARTIGOS[0];
  const filtrados = ARTIGOS.filter(a =>
    a.slug !== destacado.slug &&
    (catAtiva === TODAS || a.categoria === catAtiva)
  );
  const visiveis = filtrados.slice(0, pagina * ITEMS_PER_PAGE);
  const temMais = visiveis.length < filtrados.length;

  function handleCat(cat: string) {
    setCatAtiva(cat);
    setPagina(1);
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif", backgroundColor: '#F9FAFB', minHeight: '80vh' }}>

        {/* Hero */}
        <section style={{ backgroundColor: '#111827', padding: 'clamp(56px, 10vw, 96px) 24px' }}>
          <div className="max-w-4xl mx-auto text-center">
            <SectionLabel center dark>Blog</SectionLabel>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 1.08,
              letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px',
            }}>
              Conteúdo sobre{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>
                consórcios
              </span>
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
              Artigos, guias e análises para você tomar as melhores decisões financeiras.
            </p>

            {/* Contadores */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '40px', flexWrap: 'wrap' }}>
              {[
                { n: ARTIGOS.length, label: 'artigos publicados' },
                { n: categorias.length - 1, label: 'categorias' },
              ].map(({ n, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '32px', color: '#fff', lineHeight: 1, margin: '0 0 4px' }}>
                    {n}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 flex flex-col gap-12">

          {/* Destaque */}
          <section>
            <SectionLabel>Mais recente</SectionLabel>
            <CardDestaque artigo={destacado} />
          </section>

          {/* Filtros de categoria */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categorias.map(cat => {
              const ativo = cat === catAtiva;
              return (
                <button
                  key={cat}
                  onClick={() => handleCat(cat)}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                    fontSize: '12px', letterSpacing: '0.04em',
                    padding: '8px 16px', borderRadius: '999px', cursor: 'pointer',
                    border: ativo ? 'none' : '1px solid #E5E7EB',
                    background: ativo ? '#111827' : '#fff',
                    color: ativo ? '#fff' : '#6B7280',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                  {cat !== TODAS && (
                    <span style={{
                      marginLeft: '6px', background: ativo ? 'rgba(255,255,255,0.2)' : '#F3F4F6',
                      color: ativo ? '#fff' : '#9CA3AF',
                      borderRadius: '999px', padding: '1px 6px', fontSize: '10px', fontWeight: 600,
                    }}>
                      {ARTIGOS.filter(a => a.categoria === cat).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Grid de artigos */}
          {filtrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#9CA3AF' }}>
              <p style={{ fontSize: '15px' }}>Nenhum artigo encontrado nessa categoria.</p>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                gap: '20px',
              }}>
                {visiveis.map(artigo => (
                  <Card key={artigo.slug} artigo={artigo} />
                ))}
              </div>

              {temMais && (
                <div style={{ textAlign: 'center', paddingTop: '8px' }}>
                  <button
                    onClick={() => setPagina(p => p + 1)}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                      fontSize: '14px', padding: '14px 36px', borderRadius: '14px',
                      background: '#fff', border: '1px solid #E5E7EB', color: '#111827',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#111827'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#111827'; }}
                  >
                    Ver mais {Math.min(ITEMS_PER_PAGE, filtrados.length - visiveis.length)} artigos
                  </button>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#9CA3AF', marginTop: '10px' }}>
                    Mostrando {visiveis.length} de {filtrados.length} artigos
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
