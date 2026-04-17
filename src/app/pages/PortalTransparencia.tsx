import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { SectionLabel } from '../components/SectionLabel';

const BLUE = '#009cde';
const DARK = '#111827';

const composicao = {
  mulheres: {
    total: 63.2,
    grupos: [
      { label: 'Não Negras', pct: 45.2, cor: '#C084FC' },
      { label: 'Pretas e Pardas', pct: 17.9, cor: '#7C3AED' },
      { label: 'Amarelas / Indígenas', pct: 0.1, cor: '#A78BFA' },
    ],
  },
  homens: {
    total: 36.8,
    grupos: [
      { label: 'Não Negros', pct: 30.4, cor: '#60A5FA' },
      { label: 'Pretos e Pardos', pct: 6.4, cor: '#1D4ED8' },
      { label: 'Amarelos / Indígenas', pct: 0.0, cor: '#93C5FD' },
    ],
  },
};

const gruposOcupacionais = [
  {
    label: 'Dirigentes e Gerentes',
    rmm: 49.2,
    scm: null,
  },
  {
    label: 'Profissionais em Ocupações de Nível Superior',
    rmm: 117.5,
    scm: 100.0,
  },
  {
    label: 'Técnicos de Nível Médio',
    rmm: null,
    scm: null,
  },
  {
    label: 'Trabalhadores de Serviços Administrativos',
    rmm: null,
    scm: null,
  },
  {
    label: 'Trabalhadores em Atividades Operacionais',
    rmm: 100.0,
    scm: 100.0,
  },
];

const criterios = [
  'Plano de Cargos e Salários / Plano de Carreira',
  'Critério de produção',
  'Disponibilidade para horas extras, reuniões com clientes e viagens',
  'Disponibilidade de passar em ocupações específicas',
  'Tempo de experiência profissional',
  'Capacidade de trabalho em equipe',
  'Proatividade, desenvolvimento de ideias e sugestões',
];

const acoes = [
  'Ações de apoio ao compartilhamento de obrigações familiares para todos os sexos',
  'Políticas de contratação de mulheres negras, com deficiência, em situação de violência, chefes de família, LGBTQIA+ e Indígenas',
  'Políticas de promoção de mulheres para cargos de direção e gerência',
];

function RazaoBar({ value, label }: { value: number | null; label: string }) {
  if (value === null) {
    return (
      <div className="flex items-center gap-3">
        <div style={{ width: 'clamp(90px, 25vw, 160px)', flexShrink: 0 }}>
          <div style={{ height: '10px', borderRadius: '5px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '9px', color: '#9CA3AF' }}>—</span>
          </div>
        </div>
        <span style={{ fontSize: '13px', color: '#9CA3AF', fontFamily: "'Inter', sans-serif" }}>—</span>
        <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: "'Inter', sans-serif" }}>{label}</span>
      </div>
    );
  }

  const isAbove = value >= 100;
  const barColor = isAbove ? '#16A34A' : '#DC2626';
  const barWidth = isAbove
    ? Math.min(((value - 100) / 50) * 50, 100)
    : Math.min(((100 - value) / 100) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <div style={{ width: '160px', flexShrink: 0, position: 'relative', height: '10px', background: '#F3F4F6', borderRadius: '5px', overflow: 'hidden' }}>
        {isAbove ? (
          <div style={{ position: 'absolute', left: '50%', width: `${barWidth / 2}%`, height: '100%', background: barColor, borderRadius: '0 5px 5px 0' }} />
        ) : (
          <div style={{ position: 'absolute', right: '50%', width: `${barWidth / 2}%`, height: '100%', background: barColor, borderRadius: '5px 0 0 5px' }} />
        )}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: '#D1D5DB' }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", color: barColor, minWidth: '50px' }}>
        {value.toFixed(1).replace('.', ',')}%
      </span>
      <span style={{ fontSize: '11px', color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>{label}</span>
    </div>
  );
}

export function PortalTransparencia() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif", backgroundColor: '#F9FAFB' }}>

        {/* Hero */}
        <section style={{ backgroundColor: DARK, padding: 'clamp(56px, 10vw, 96px) 24px', textAlign: 'center' }}>
          <div className="max-w-4xl mx-auto">
            <SectionLabel center>Governança · Lei 14.611/2023</SectionLabel>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px' }}>
              Relatório de Transparência e{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: BLUE }}>
                Igualdade Salarial
              </span>
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              Mulheres e Homens · 1º Semestre 2026
            </p>

            {/* Info bar */}
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', marginTop: '32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px 28px' }}>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>Empregador</p>
                <p style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>Porto Vale Consórcios</p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>CNPJ</p>
                <p style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>07.081.058/0001-56</p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>Trabalhadores ativos em 31/12/2025</p>
                <p style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>285</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 flex flex-col gap-16">

          {/* 1. Indicadores principais */}
          <section>
            <SectionLabel>Diferença salarial entre mulheres e homens</SectionLabel>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 2.5vw, 32px)', color: DARK, marginBottom: '8px', marginTop: '4px' }}>
              Indicadores de remuneração
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.7, marginBottom: '32px', maxWidth: '680px' }}>
              A Razão M/H representa o quanto o salário/remuneração das mulheres equivale ao recebido pelos homens.
              Um valor de 100% indica paridade; abaixo de 100% indica que as mulheres recebem menos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Salário Contratual Mediano */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', marginBottom: '16px' }}>
                  Salário Contratual Mediano
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1, color: '#16A34A' }}>
                    100,0%
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>
                  O salário contratual mediano das mulheres equivale a <strong>100,0%</strong> do recebido pelos homens.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16A34A' }} />
                  <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 600 }}>Paridade salarial</span>
                </div>
              </div>

              {/* Remuneração Mensal Média */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', marginBottom: '16px' }}>
                  Remuneração Mensal Média
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1, color: '#D97706' }}>
                    97,5%
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>
                  A remuneração média mensal das mulheres equivale a <strong>97,5%</strong> da recebida pelos homens.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#D97706' }} />
                  <span style={{ fontSize: '12px', color: '#D97706', fontWeight: 600 }}>Diferença de 2,5%</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Composição por sexo e raça */}
          <section>
            <SectionLabel>Diversidade</SectionLabel>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 2.5vw, 32px)', color: DARK, marginBottom: '8px', marginTop: '4px' }}>
              Composição por sexo e raça/cor
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.7, marginBottom: '32px', maxWidth: '680px' }}>
              Distribuição dos 285 trabalhadores ativos por gênero e raça/cor, como percentual do total de empregados.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mulheres */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7C3AED' }}>Mulheres</p>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '36px', color: DARK, lineHeight: 1 }}>
                      63,2%
                    </p>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>≈ 180 trabalhadoras</p>
                  </div>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="18" r="11" fill="#C084FC" opacity="0.3"/>
                    <ellipse cx="28" cy="42" rx="16" ry="12" fill="#C084FC" opacity="0.3"/>
                    <circle cx="28" cy="18" r="8" fill="#7C3AED"/>
                    <ellipse cx="28" cy="40" rx="12" ry="9" fill="#7C3AED"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-3">
                  {composicao.mulheres.grupos.filter(g => g.pct > 0).map(g => (
                    <div key={g.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#374151', fontFamily: "'Inter', sans-serif" }}>{g.label}</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: g.cor }}>{g.pct.toFixed(1).replace('.', ',')}%</span>
                      </div>
                      <div style={{ height: '6px', borderRadius: '3px', background: '#F3F4F6', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(g.pct / composicao.mulheres.total) * 100}%`, background: g.cor, borderRadius: '3px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Homens */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1D4ED8' }}>Homens</p>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '36px', color: DARK, lineHeight: 1 }}>
                      36,8%
                    </p>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>≈ 105 trabalhadores</p>
                  </div>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="18" r="11" fill="#93C5FD" opacity="0.3"/>
                    <ellipse cx="28" cy="42" rx="16" ry="12" fill="#93C5FD" opacity="0.3"/>
                    <circle cx="28" cy="18" r="8" fill="#1D4ED8"/>
                    <ellipse cx="28" cy="40" rx="12" ry="9" fill="#1D4ED8"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-3">
                  {composicao.homens.grupos.filter(g => g.pct > 0).map(g => (
                    <div key={g.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#374151', fontFamily: "'Inter', sans-serif" }}>{g.label}</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: g.cor }}>{g.pct.toFixed(1).replace('.', ',')}%</span>
                      </div>
                      <div style={{ height: '6px', borderRadius: '3px', background: '#F3F4F6', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(g.pct / composicao.homens.total) * 100}%`, background: g.cor, borderRadius: '3px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. Diferença salarial por grupos ocupacionais */}
          <section>
            <SectionLabel>Por grupos ocupacionais</SectionLabel>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 2.5vw, 32px)', color: DARK, marginBottom: '8px', marginTop: '4px' }}>
              Diferença salarial por categoria
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.7, marginBottom: '8px', maxWidth: '680px' }}>
              Razão M/H por grandes grupos ocupacionais. Valores acima de 100% indicam que as mulheres recebem mais que os homens naquela categoria; abaixo de 100%, o inverso.
            </p>
            <p style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '28px', maxWidth: '680px' }}>
              Grupos com "—" não apresentam cálculo por ausência de trabalhadores de um dos sexos ou número inferior a 3.
            </p>

            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              {/* Legenda */}
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#DC2626' }} />
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Remuneração Mensal Média (RMM)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#009cde' }} />
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Salário Contratual Mediano (SCM)</span>
                </div>
              </div>

              {/* Rows */}
              <div className="flex flex-col divide-y divide-[#F3F4F6]">
                {gruposOcupacionais.map((g) => (
                  <div key={g.label} style={{ padding: '20px 24px' }}>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '14px', color: DARK, marginBottom: '12px' }}>
                      {g.label}
                    </p>
                    <div className="flex flex-col gap-2">
                      <RazaoBar value={g.rmm} label="RMM" />
                      <RazaoBar value={g.scm} label="SCM" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Critérios e Ações */}
          <section>
            <SectionLabel>Políticas internas</SectionLabel>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 2.5vw, 32px)', color: DARK, marginBottom: '8px', marginTop: '4px' }}>
              Critérios de remuneração e ações para diversidade
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.7, marginBottom: '32px', maxWidth: '680px' }}>
              Declaração sobre a existência formal de critérios remuneratórios e ações afirmativas adotadas pela empresa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Critérios remuneratórios */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', marginBottom: '20px' }}>
                  Critérios remuneratórios
                </p>
                <div className="flex flex-col gap-3">
                  {criterios.map((c) => (
                    <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '6px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 2L8 8M8 2L2 8" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>{c}</span>
                        <span style={{ display: 'block', fontSize: '11px', color: '#DC2626', fontWeight: 600, marginTop: '2px' }}>Não adotado</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ações para diversidade */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', marginBottom: '20px' }}>
                  Ações para aumentar a diversidade
                </p>
                <div className="flex flex-col gap-4">
                  {acoes.map((a) => (
                    <div key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '6px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 2L8 8M8 2L2 8" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>{a}</span>
                        <span style={{ display: 'block', fontSize: '11px', color: '#DC2626', fontWeight: 600, marginTop: '2px' }}>Não adotado</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nota de rodapé */}
          <section style={{ background: '#fff', borderRadius: '20px', padding: '24px 28px', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: '10px' }}>
              Fonte e metodologia
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.8 }}>
              <strong>Fonte:</strong> MTE – eSocial, RAIS Mensal (Dezembro/2025) e Portal Emprego Brasil (Fevereiro/2026).
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.8, marginTop: '6px' }}>
              <strong>Nota:</strong> Os vínculos ativos correspondem a trabalhadores ativos em dezembro de 2025, enquanto as remunerações consideram o período de janeiro a dezembro de 2025. Os demais indicadores referem-se ao 1º semestre de 2026.
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.8, marginTop: '6px' }}>
              Este relatório é publicado em cumprimento à <strong>Lei nº 14.611/2023</strong> e ao Decreto nº 11.795/2023, que dispõem sobre a igualdade salarial e de critérios remuneratórios entre mulheres e homens.
            </p>
          </section>

        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
