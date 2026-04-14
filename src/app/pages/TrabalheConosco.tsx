import { useRef, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { Heart, TrendingUp, BookOpen, Award, Users, MapPin, ExternalLink, Briefcase, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

const beneficios = [
  {
    icon: Heart,
    title: 'Cultura',
    desc: 'Cultura baseada em valores sólidos: ética, excelência, parceria, entusiasmo e foco no cliente.',
    color: '#EFF6FF',
    iconColor: '#2563EB',
  },
  {
    icon: TrendingUp,
    title: 'Crescimento',
    desc: 'Ambiente colaborativo com oportunidades reais de desenvolvimento de carreira.',
    color: '#111827',
    iconColor: '#009cde',
    dark: true,
  },
  {
    icon: BookOpen,
    title: 'Treinamento',
    desc: 'Programas de capacitação e desenvolvimento contínuo para todos os colaboradores.',
    color: '#f8f7f5',
    iconColor: '#2563EB',
  },
  {
    icon: Award,
    title: 'Reconhecimento',
    desc: 'Valorização e reconhecimento do desempenho de cada colaborador ao longo da jornada.',
    color: '#EFF6FF',
    iconColor: '#2563EB',
  },
];

// ── Adicione ou remova vagas aqui ──
const vagas = [
  {
    titulo: 'Analista de Marketing (Social Media)',
    local: 'São José dos Campos, SP',
    tipo: 'CLT',
    area: 'Marketing',
    link: 'https://portovaleconsorcio.gupy.io/jobs/11074104?jobBoardSource=gupy_public_page',
  },
  {
    titulo: 'Analista de Recursos Humanos (Recrutamento e Seleção)',
    local: 'São José dos Campos, SP',
    tipo: 'CLT',
    area: 'Recursos Humanos',
    link: 'https://portovaleconsorcio.gupy.io/jobs/11029524?jobBoardSource=gupy_public_page',
  },
  {
    titulo: 'Assistente de Departamento Pessoal (Ponto Eletrônico)',
    local: 'São José dos Campos, SP',
    tipo: 'CLT',
    area: 'Dep. Pessoal',
    link: 'https://portovaleconsorcio.gupy.io/jobs/11126148?jobBoardSource=gupy_public_page',
  },
  {
    titulo: 'Auxiliar Administrativo',
    local: 'São José dos Campos, SP',
    tipo: 'PCD',
    area: 'Administrativo',
    link: 'https://portovaleconsorcio.gupy.io/jobs/10723375?jobBoardSource=gupy_public_page',
  },
  {
    titulo: 'Jovem Aprendiz — SDR',
    local: 'São José dos Campos, SP',
    tipo: 'Aprendiz',
    area: 'Comercial',
    link: 'https://portovaleconsorcio.gupy.io/jobs/11076866?jobBoardSource=gupy_public_page',
  },
  {
    titulo: 'Vendedor de Consórcios — Presencial',
    local: 'São José dos Campos, SP',
    tipo: 'CLT',
    area: 'Comercial',
    link: 'https://portovaleconsorcio.gupy.io/jobs/10989025?jobBoardSource=gupy_public_page',
  },
  {
    titulo: 'Vendedor de Consórcios — Presencial',
    local: 'São Paulo — Zona Norte',
    tipo: 'CLT',
    area: 'Comercial',
    link: 'https://portovaleconsorcio.gupy.io/jobs/10967391?jobBoardSource=gupy_public_page',
  },
];

const tipoBadge: Record<string, { bg: string; color: string }> = {
  CLT:      { bg: '#EFF6FF', color: '#2563EB' },
  PCD:      { bg: '#F0FDF4', color: '#16A34A' },
  Aprendiz: { bg: '#F5F3FF', color: '#7C3AED' },
};

const equipe = [
  { icon: Users,     stat: '+600',       desc: 'colaboradores engajados em todo o Brasil' },
  { icon: MapPin,    stat: '3 unidades', desc: 'em São José dos Campos, Jacareí e São Paulo' },
  { icon: Lightbulb, stat: 'Projetos',   desc: 'internos que promovem integração, aprendizado e inovação' },
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

export function TrabalheConosco() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 4);
  };

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: dir === 'next' ? w : -w, behavior: 'smooth' });
  };

  return (
    <>
      <Header />

      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif" }}>

        {/* ── 1. HERO ── */}
        <section style={{ backgroundColor: '#111827', padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,156,222,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <Label text="Carreiras" light />
                <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 24px' }}>
                  Venha crescer com a{' '}
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>Porto Vale</span>
                </h1>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: '480px', margin: 0 }}>
                  Faça parte de um time que transforma oportunidades em conquistas e valoriza cada colaborador em sua jornada.
                </p>
              </div>

              <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3' }}>
                <img
                  src="/imagens/fachada-pv.png"
                  alt="Fachada Porto Vale"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. POR QUE TRABALHAR CONOSCO ── */}
        <section style={{ backgroundColor: '#fff', padding: '96px 24px' }}>
          <div className="max-w-7xl mx-auto">
            <div style={{ marginBottom: '56px' }}>
              <Label text="Por que a Porto Vale" />
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827', marginTop: '4px', maxWidth: '560px' }}>
                O que nos torna um lugar{' '}
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>único para trabalhar</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {beneficios.map(({ icon: Icon, title, desc, color, iconColor, dark }) => (
                <div key={title} style={{ background: color, borderRadius: '24px', padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: '-12px', right: '-12px', opacity: dark ? 0.07 : 0.05, pointerEvents: 'none' }}>
                    <Icon size={120} color={iconColor} strokeWidth={1} />
                  </div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: dark ? 'rgba(0,156,222,0.15)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: dark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)', position: 'relative', zIndex: 1 }}>
                    <Icon size={22} color={iconColor} strokeWidth={1.6} />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: dark ? '#009cde' : '#2563EB', marginBottom: '8px' }}>{title}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: dark ? 'rgba(255,255,255,0.60)' : '#374151', lineHeight: 1.75, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. NOSSA EQUIPE ── */}
        <section style={{ backgroundColor: '#111827', padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
              <div>
                <Label text="Nossa equipe" light />
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', marginTop: '4px' }}>
                  Juntos construímos{' '}
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>resultados</span>
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden' }}>
                {equipe.map(({ icon: Icon, stat, desc }) => (
                  <div key={stat} style={{ backgroundColor: '#111827', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0,156,222,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color="#009cde" strokeWidth={1.6} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '22px', color: '#009cde', lineHeight: 1 }}>{stat}</div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: '4px 0 0', lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. VAGAS ABERTAS ── */}
        <section style={{ backgroundColor: '#f8f7f5', padding: '96px 24px' }}>
          <div className="max-w-7xl mx-auto">

            {/* Cabeçalho + setas */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <Label text="Vagas abertas" />
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827', marginTop: '4px', marginBottom: '10px' }}>
                  Faça parte do{' '}
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>nosso time</span>
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7280', lineHeight: 1.7, maxWidth: '480px', margin: 0 }}>
                  Confira as oportunidades disponíveis e candidate-se diretamente pelo Gupy.
                </p>
              </div>

              {/* Botões de navegação */}
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button
                  onClick={() => scroll('prev')}
                  disabled={!canPrev}
                  style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1.5px solid', borderColor: canPrev ? '#D1D5DB' : '#E5E7EB', background: canPrev ? '#fff' : '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: canPrev ? 'pointer' : 'default', transition: 'all 0.2s' }}
                >
                  <ChevronLeft size={18} color={canPrev ? '#374151' : '#D1D5DB'} strokeWidth={2} />
                </button>
                <button
                  onClick={() => scroll('next')}
                  disabled={!canNext}
                  style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1.5px solid', borderColor: canNext ? '#D1D5DB' : '#E5E7EB', background: canNext ? '#fff' : '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: canNext ? 'pointer' : 'default', transition: 'all 0.2s' }}
                >
                  <ChevronRight size={18} color={canNext ? '#374151' : '#D1D5DB'} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Carrossel */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              style={{
                display: 'flex',
                gap: '20px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingBottom: '4px',
              }}
            >
              {vagas.map((vaga) => {
                const badge = tipoBadge[vaga.tipo] ?? tipoBadge.CLT;
                return (
                  <a
                    key={vaga.link}
                    href={vaga.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: '0 0 calc(33.33% - 14px)',
                      minWidth: '260px',
                      scrollSnapAlign: 'start',
                      background: '#fff',
                      borderRadius: '20px',
                      padding: '28px 24px',
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      textDecoration: 'none',
                      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.09)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Topo: ícone + tipo */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Briefcase size={20} color="#2563EB" strokeWidth={1.6} />
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: badge.color, background: badge.bg, padding: '4px 10px', borderRadius: '20px', whiteSpace: 'nowrap' as const }}>
                        {vaga.tipo}
                      </span>
                    </div>

                    {/* Área */}
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#9CA3AF', margin: 0 }}>
                      {vaga.area}
                    </p>

                    {/* Título */}
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#111827', margin: 0, lineHeight: 1.4 }}>
                      {vaga.titulo}
                    </p>

                    {/* Local */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={12} color="#9CA3AF" strokeWidth={2} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280' }}>{vaga.local}</span>
                    </div>

                    {/* CTA */}
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '8px', borderTop: '1px solid #F3F4F6' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#2563EB' }}>Ver vaga</span>
                      <ExternalLink size={12} color="#2563EB" strokeWidth={2} />
                    </div>
                  </a>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── 5. CTA FINAL ── */}
        <section style={{ backgroundColor: '#111827', padding: '120px 24px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(22px, 3vw, 40px)', lineHeight: 1.35, color: '#fff', marginBottom: '48px' }}>
              "Aqui, você encontra oportunidades, crescimento e um time que faz a diferença todos os dias."
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://portovaleconsorcio.gupy.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#009cde', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', letterSpacing: '0.01em' }}
              >
                Ver todas as vagas no Gupy
                <ExternalLink size={15} strokeWidth={2} />
              </a>
              <a
                href="https://www.linkedin.com/company/porto-vale-consorcios"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', letterSpacing: '0.01em' }}
              >
                LinkedIn
                <ExternalLink size={15} strokeWidth={2} />
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
