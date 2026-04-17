import { useState, useMemo } from 'react';
import { SectionLabel } from './SectionLabel';
import { ArrowRight, TrendingDown, Info, Home, Car } from 'lucide-react';
import { motion } from 'motion/react';

type ConsorcioType = 'imovel' | 'auto';
type SimMode = 'credito' | 'parcela';

interface TypeConfig {
  label: string;
  icon: string;
  creditMin: number;
  creditMax: number;
  creditStep: number;
  adminRate: number;
  duration: number;
}

const configs: Record<ConsorcioType, TypeConfig> = {
  imovel: { label: 'Imóvel',    icon: '', creditMin: 100000, creditMax: 1000000, creditStep: 10000, adminRate: 0.18, duration: 100 },
  auto:   { label: 'Automóvel', icon: '', creditMin: 100000, creditMax: 1000000, creditStep: 10000, adminRate: 0.22, duration: 60  },
};

const parcelaRange = (cfg: TypeConfig) => ({
  min:  Math.round((cfg.creditMin  * (1 + cfg.adminRate)) / cfg.duration / 50) * 50,
  max:  Math.round((cfg.creditMax  * (1 + cfg.adminRate)) / cfg.duration / 50) * 50,
  step: Math.round((cfg.creditStep * (1 + cfg.adminRate)) / cfg.duration / 10) * 10 || 10,
});

const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

/* ── Tabela ─────────────────────────────────────────────────────── */
const rows = [
  { criteria: 'Cobrança de juros',              consortio: 'Nenhum',                    financiamento: 'Sim, elevados',              badge: false },
  { criteria: 'Entrada obrigatória',             consortio: 'Não exigida',               financiamento: 'Sim, entre 20–30%',          badge: false },
  { criteria: 'Custo total da operação',         consortio: 'Significativamente menor',  financiamento: 'Muito mais alto',            badge: false },
  { criteria: 'Burocracia',                      consortio: 'Mínima',                    financiamento: 'Alta',                       badge: false },
  { criteria: 'Flexibilidade de uso do crédito', consortio: 'Ampla',                     financiamento: 'Restrita ao bem',            badge: false },
  { criteria: 'Planejamento financeiro',         consortio: 'Previsível e controlado',   financiamento: 'Parcelas crescem com juros', badge: false },
  { criteria: 'Suporte ao longo do plano',       consortio: 'Atendimento dedicado',      financiamento: 'Atendimento padrão',         badge: true  },
];

function TableRow({ row, index, isLast }: { row: typeof rows[number]; index: number; isLast?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid grid-cols-3 cursor-default select-none"
      style={{
        borderTop: '1px solid #E5E7EB',
        backgroundColor: hovered ? 'rgba(0,85,196,0.04)' : index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
        transition: 'background-color 0.18s ease',
      }}
    >
      {/* Critério */}
      <div className="py-3 px-3 sm:py-4 sm:px-4 flex items-center" style={{ borderRight: '1px solid #E5E7EB' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(11px, 2.5vw, 13px)', color: hovered ? '#111827' : '#6B7280', fontWeight: hovered ? 500 : 400, transition: 'color 0.18s', lineHeight: 1.4 }}>
          {row.criteria}
        </span>
      </div>

      {/* Consórcio — coluna destacada */}
      <div
        className="py-3 px-2 sm:py-4 sm:px-4 flex items-center justify-center"
        style={{
          backgroundColor: hovered ? 'rgba(0,85,196,0.08)' : 'rgba(0,85,196,0.04)',
          transition: 'background-color 0.18s ease',
          position: 'relative',
          zIndex: 2,
          borderRadius: isLast ? '0 0 12px 12px' : undefined,
        }}
      >
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(10px, 2.2vw, 13px)', color: '#0055c4', display: 'inline-flex', alignItems: 'center', gap: '4px', transition: 'color 0.18s, transform 0.18s', transform: hovered ? 'scale(1.04)' : 'scale(1)', textAlign: 'center', lineHeight: 1.3 }}>
          {row.consortio}
          {row.badge && (
            <span style={{ display: 'inline-block', backgroundColor: '#0055c4', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 800, letterSpacing: '0.1em', padding: '2px 5px', borderRadius: '4px', verticalAlign: 'middle', flexShrink: 0 }}>
              PORTO
            </span>
          )}
        </span>
      </div>

      {/* Financiamento */}
      <div className="py-3 px-2 sm:py-4 sm:px-4 flex items-center justify-center">
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(10px, 2.2vw, 13px)', color: '#C4C9D4', transition: 'color 0.18s', fontWeight: 400, textAlign: 'center', lineHeight: 1.3 }}>
          {row.financiamento}
        </span>
      </div>
    </div>
  );
}

/* ── Pill Switch ─────────────────────────────────────────────────── */
interface SwitchOption<T> {
  value: T;
  label: string;
  Icon?: React.ComponentType<{ size?: number; color?: string }>;
  idleAnimate?: object;
  idleTransition?: object;
  hoverAnimate?: object;
  hoverTransition?: object;
}

function PillSwitch<T extends string>({
  options, value, onChange,
}: {
  options: SwitchOption<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  const [hoveredOpt, setHoveredOpt] = useState<T | null>(null);

  return (
    <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '999px', padding: '3px', gap: '2px', border: '1px solid rgba(255,255,255,0.12)' }}>
      {options.map((opt) => {
        const active = opt.value === value;
        const hovered = hoveredOpt === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            onMouseEnter={() => setHoveredOpt(opt.value)}
            onMouseLeave={() => setHoveredOpt(null)}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: active ? 700 : 500,
              padding: opt.Icon ? '6px 14px' : '6px 16px',
              borderRadius: '999px', border: 'none', cursor: 'pointer',
              backgroundColor: active ? '#111827' : 'transparent',
              color: active ? '#fff' : 'rgba(255,255,255,0.65)',
              boxShadow: active ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
              transition: 'all 0.18s ease', whiteSpace: 'nowrap',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}
          >
            {opt.Icon && (
              <motion.span
                animate={hovered && opt.hoverAnimate ? opt.hoverAnimate : opt.idleAnimate}
                transition={hovered && opt.hoverTransition ? opt.hoverTransition : opt.idleTransition}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <opt.Icon size={13} color={active ? '#fff' : 'rgba(255,255,255,0.65)'} />
              </motion.span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */
export function ComparisonSimulatorSection() {
  const [type, setType]       = useState<ConsorcioType>('imovel');
  const [mode, setMode]       = useState<SimMode>('credito');
  const [credit, setCredit]   = useState(300000);
  const [parcela, setParcela] = useState(0);

  const cfg = configs[type];
  const pr  = parcelaRange(cfg);

  const safeCredit     = Math.min(Math.max(credit, cfg.creditMin), cfg.creditMax);
  const defaultParcela = Math.round((cfg.creditMin + cfg.creditMax) / 2 * (1 + cfg.adminRate) / cfg.duration / pr.step) * pr.step;
  const safeParcela    = Math.min(Math.max(parcela === 0 ? defaultParcela : parcela, pr.min), pr.max);

  const { savingsVsFinancing } = useMemo(() => {
    if (mode === 'credito') {
      const totalCost      = safeCredit * (1 + cfg.adminRate);
      const financingTotal = safeCredit * Math.pow(1 + 0.017, cfg.duration);
      return { savingsVsFinancing: financingTotal - totalCost };
    } else {
      const totalCost      = safeParcela * cfg.duration;
      const derivedCredit  = totalCost / (1 + cfg.adminRate);
      const financingTotal = derivedCredit * Math.pow(1 + 0.017, cfg.duration);
      return { savingsVsFinancing: financingTotal - totalCost };
    }
  }, [mode, safeCredit, safeParcela, cfg]);

  const sliderPct = mode === 'credito'
    ? ((safeCredit  - cfg.creditMin) / (cfg.creditMax - cfg.creditMin)) * 100
    : ((safeParcela - pr.min)        / (pr.max        - pr.min))        * 100;

  const handleTypeChange = (t: ConsorcioType) => {
    setType(t);
    setCredit(Math.min(Math.max(safeCredit, configs[t].creditMin), configs[t].creditMax));
    setParcela(0);
  };

  const typeOptions: SwitchOption<ConsorcioType>[] = [
    {
      value: 'imovel',
      label: 'Imóvel',
      Icon: Home,
      idleAnimate: { y: [0, -3, 0] },
      idleTransition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
      hoverAnimate: { y: [0, -6, 0] },
      hoverTransition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
    },
    {
      value: 'auto',
      label: 'Automóvel',
      Icon: Car,
      idleAnimate: { x: [0, 3, 0] },
      idleTransition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      hoverAnimate: { x: [0, 7, 0] },
      hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' },
    },
  ];
  const modeOptions = [{ value: 'credito' as SimMode, label: 'Por crédito' }, { value: 'parcela' as SimMode, label: 'Por parcela' }];

  return (
    <section
      className="relative z-10 px-4 sm:px-8 lg:px-16"
      style={{ paddingTop: '64px', paddingBottom: '80px', backgroundColor: '#F9FAFB', overflowX: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-start lg:items-end">

          {/* ══ ESQUERDA: Comparativo ══ */}
          <div>
            <SectionLabel>Comparativo</SectionLabel>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 50px)', color: '#111827', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Consórcio ou{' '}
              <span style={{ display: 'block', fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#0055c4' }}>
                financiamento?
              </span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', lineHeight: 1.75, maxWidth: '380px', marginBottom: '28px' }}>
              Entender a diferença entre os dois é o primeiro passo para fazer uma escolha que cabe no seu bolso — e no seu planejamento de vida.
            </p>

            <div className="relative" style={{ paddingTop: '28px' }}>
              {/* Badge "Melhor escolha" flutuante acima da coluna Consórcio */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 'calc(33.33% + 1px)',
                  width: 'calc(33.33% - 2px)',
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: '#0055c4', borderRadius: '999px', padding: '4px 12px' }}>
                  <span style={{ fontSize: '9px', color: '#93C5FD' }}>★</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>
                    Melhor escolha
                  </span>
                </div>
              </div>

              <div style={{ border: '1px solid #E5E7EB', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', borderRadius: '16px', position: 'relative', overflow: 'visible' }}>
                {/* Overlay flutuante da coluna Consórcio */}
                <div
                  style={{
                    position: 'absolute',
                    left: 'calc(33.333% - 1px)',
                    width: 'calc(33.334% + 2px)',
                    top: '-8px',
                    bottom: '-8px',
                    borderRadius: '14px',
                    boxShadow: '0 4px 20px rgba(0, 85, 196, 0.15)',
                    border: '1.5px solid rgba(0, 85, 196, 0.4)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />
                <div className="grid grid-cols-3">
                  <div className="py-3.5 px-4" style={{ backgroundColor: '#F3F4F6', borderRadius: '16px 0 0 0' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CA3AF' }}>Critério</span>
                  </div>
                  <div
                    className="py-3.5 px-4 flex items-center justify-center gap-1.5"
                    style={{
                      backgroundColor: '#0055c4',
                      position: 'relative',
                      zIndex: 2,
                      borderRadius: '12px 12px 0 0',
                      marginTop: '-8px',
                      paddingTop: 'calc(14px + 8px)',
                    }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>Consórcio</span>
                    <span style={{ color: '#93C5FD', fontSize: '12px' }}>✓</span>
                  </div>
                  <div className="py-3.5 px-4 flex items-center justify-center" style={{ backgroundColor: '#374151', borderRadius: '0 16px 0 0' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280' }}>Financiamento</span>
                  </div>
                </div>
                {rows.map((row, i) => <TableRow key={i} row={row} index={i} isLast={i === rows.length - 1} />)}
                {/* Rodapé azul da coluna flutuante */}
                <div
                  style={{
                    position: 'absolute',
                    left: 'calc(33.333% - 1px)',
                    width: 'calc(33.334% + 2px)',
                    bottom: '-8px',
                    height: '8px',
                    backgroundColor: '#0055c4',
                    borderRadius: '0 0 12px 12px',
                    zIndex: 2,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ══ DIREITA: Simulador ══ */}
          <div className="flex flex-col">

            {/* Card azul */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(160deg, #0044a8 0%, #0066d6 100%)', boxShadow: '0 16px 56px rgba(0,85,196,0.35), 0 4px 16px rgba(0,0,0,0.12)' }}>
              <div className="px-6 py-6 flex flex-col gap-5">

                {/* Switches lado a lado centralizados */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <PillSwitch options={typeOptions} value={type} onChange={handleTypeChange} />
                  <PillSwitch options={modeOptions} value={mode} onChange={setMode} />
                </div>

                {/* Valor em destaque + Slider */}
                <div>
                  <div className="mb-4">
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 5vw, 44px)', color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
                      {mode === 'credito' ? brl(safeCredit) : brl(safeParcela)}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>
                      {mode === 'credito' ? 'valor do crédito' : 'parcela mensal'}
                    </div>
                  </div>

                  {mode === 'credito' ? (
                    <>
                      <input
                        type="range" min={cfg.creditMin} max={cfg.creditMax} step={cfg.creditStep}
                        value={safeCredit} onChange={(e) => setCredit(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
                        style={{ background: `linear-gradient(to right, #fff ${sliderPct}%, rgba(255,255,255,0.2) ${sliderPct}%)` }}
                      />
                      <div className="flex justify-between mt-2">
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{brl(cfg.creditMin)}</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{brl(cfg.creditMax)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="range" min={pr.min} max={pr.max} step={pr.step}
                        value={safeParcela} onChange={(e) => setParcela(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
                        style={{ background: `linear-gradient(to right, #fff ${sliderPct}%, rgba(255,255,255,0.2) ${sliderPct}%)` }}
                      />
                      <div className="flex justify-between mt-2">
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{brl(pr.min)}/mês</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{brl(pr.max)}/mês</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Economia */}
                <div className="rounded-xl p-4 flex items-center gap-3" style={{ backgroundColor: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <TrendingDown size={16} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Economia vs. financiamento*</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '18px', color: '#fff' }}>{brl(savingsVsFinancing)}</div>
                  </div>
                </div>

                {/* Fine print */}
                <div className="flex items-start gap-2">
                  <Info size={11} color="rgba(255,255,255,0.3)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                    *Comparado a financiamento com taxa de 1,7% a.m. Valores sujeitos a ajuste pelo índice de correção contratual.
                  </p>
                </div>

                {/* CTA */}
                <button
                  style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '50px', borderRadius: '12px', backgroundColor: '#111827', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700, transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0f172a'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#111827'; }}
                >
                  Quero começar agora
                  <ArrowRight size={15} />
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid rgba(255,255,255,0.4);
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid rgba(255,255,255,0.4);
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}