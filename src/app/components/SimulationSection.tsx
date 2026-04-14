import { useState, useMemo } from 'react';
import { ArrowRight, Info, TrendingDown } from 'lucide-react';

type ConsorcioType = 'imovel' | 'auto' | 'moto' | 'servicos';

interface TypeConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  adminRate: number;
  durations: number[];
}

const configs: Record<ConsorcioType, TypeConfig> = {
  imovel:   { label: 'Imóvel',      min: 50000,  max: 500000, step: 5000,  adminRate: 0.18, durations: [60, 80, 100, 120, 180, 200] },
  auto:     { label: 'Automóvel',   min: 20000,  max: 120000, step: 2000,  adminRate: 0.22, durations: [36, 48, 60, 72, 84, 100] },
  moto:     { label: 'Moto',        min: 5000,   max: 30000,  step: 1000,  adminRate: 0.20, durations: [24, 36, 48, 60] },
  servicos: { label: 'Serviços',    min: 5000,   max: 30000,  step: 1000,  adminRate: 0.20, durations: [24, 36, 48, 60] },
};

// Format to Brazilian currency
const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export function SimulationSection() {
  const [type, setType]         = useState<ConsorcioType>('imovel');
  const [credit, setCredit]     = useState(200000);
  const [duration, setDuration] = useState(100);

  const cfg = configs[type];

  // When type changes, clamp credit and reset duration
  const safeCredit   = Math.min(Math.max(credit, cfg.min), cfg.max);
  const safeDuration = cfg.durations.includes(duration) ? duration : cfg.durations[Math.floor(cfg.durations.length / 2)];

  const { monthlyInstallment, totalCost, savingsVsFinancing } = useMemo(() => {
    const totalCost          = safeCredit * (1 + cfg.adminRate);
    const monthlyInstallment = totalCost / safeDuration;
    // financing estimate: ~2% monthly interest
    const financingTotal     = safeCredit * Math.pow(1 + 0.017, safeDuration);
    const savingsVsFinancing = financingTotal - totalCost;
    return { monthlyInstallment, totalCost, savingsVsFinancing };
  }, [safeCredit, safeDuration, cfg]);

  const handleTypeChange = (t: ConsorcioType) => {
    const newCfg = configs[t];
    setType(t);
    setCredit(Math.min(Math.max(safeCredit, newCfg.min), newCfg.max));
    setDuration(newCfg.durations[Math.floor(newCfg.durations.length / 2)]);
  };

  const sliderPct = ((safeCredit - cfg.min) / (cfg.max - cfg.min)) * 100;

  return (
    <section
      id="simulacao"
      className="py-24 px-4 sm:px-8 lg:px-16 bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-[13px] uppercase tracking-widest text-[#6B7280] dark:text-gray-400 mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Simulador
          </p>
          <h2
            className="text-[36px] leading-[1.15] mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
          >
            <span className="block text-[#111827] dark:text-white">Simule seu consórcio</span>
            <span className="block text-[#2563EB]">em segundos</span>
          </h2>
          <p
            className="text-[14px] text-[#6B7280] dark:text-gray-400 max-w-sm mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.7' }}
          >
            Ajuste o valor e o prazo. Veja quanto você paga por mês e quanto economiza em relação ao financiamento.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">

          {/* ── Form Panel ── */}
          <div
            className="rounded-2xl p-7 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700 flex flex-col gap-7"
          >
            {/* Step 1 — Type */}
            <div>
              <label
                className="block text-[13px] font-semibold text-[#374151] dark:text-gray-300 mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                1. Tipo de consórcio
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(configs) as ConsorcioType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTypeChange(t)}
                    className="rounded-xl py-2.5 px-3 text-[13px] font-medium transition-all duration-200 border"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: type === t ? '#2563EB' : '#F9FAFB',
                      color: type === t ? '#FFFFFF' : '#374151',
                      borderColor: type === t ? '#2563EB' : '#E5E7EB',
                    }}
                  >
                    {configs[t].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — Credit Value */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  className="text-[13px] font-semibold text-[#374151] dark:text-gray-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  2. Valor do crédito
                </label>
                <span
                  className="text-[15px] text-[#2563EB]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                >
                  {brl(safeCredit)}
                </span>
              </div>

              {/* Range slider */}
              <div className="relative">
                <input
                  type="range"
                  min={cfg.min}
                  max={cfg.max}
                  step={cfg.step}
                  value={safeCredit}
                  onChange={(e) => setCredit(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
                  style={{
                    background: `linear-gradient(to right, #2563EB ${sliderPct}%, #E5E7EB ${sliderPct}%)`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[11px] text-[#9CA3AF]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {brl(cfg.min)}
                </span>
                <span className="text-[11px] text-[#9CA3AF]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {brl(cfg.max)}
                </span>
              </div>
            </div>

            {/* Step 3 — Duration */}
            <div>
              <label
                className="block text-[13px] font-semibold text-[#374151] dark:text-gray-300 mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                3. Prazo (meses)
              </label>
              <div className="flex flex-wrap gap-2">
                {cfg.durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className="rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 border"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: safeDuration === d ? '#111827' : '#F9FAFB',
                      color: safeDuration === d ? '#FFFFFF' : '#374151',
                      borderColor: safeDuration === d ? '#111827' : '#E5E7EB',
                    }}
                  >
                    {d}x
                  </button>
                ))}
              </div>
            </div>

            {/* Fine print */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-[#F3F4F6] dark:bg-gray-800">
              <Info size={14} className="text-[#6B7280] mt-0.5 flex-shrink-0" />
              <p
                className="text-[12px] text-[#6B7280] dark:text-gray-400"
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.6' }}
              >
                Simulação com base na taxa administrativa do grupo. Valores sujeitos a ajuste pelo índice de correção contratual.
              </p>
            </div>
          </div>

          {/* ── Result Panel ── */}
          <div className="flex flex-col gap-4">

            {/* Main result card */}
            <div
              className="rounded-2xl p-7"
              style={{ backgroundColor: '#2563EB' }}
            >
              <p
                className="text-[12px] uppercase tracking-widest text-blue-200 mb-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Parcela estimada
              </p>
              <div
                className="text-[52px] leading-none text-white mb-1"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
              >
                {brl(monthlyInstallment)}
              </div>
              <p
                className="text-[13px] text-blue-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                por mês · {safeDuration} meses · {configs[type].label}
              </p>

              <div
                className="mt-5 pt-5 border-t border-blue-400/40 grid grid-cols-2 gap-4"
              >
                {[
                  { label: 'Crédito contratado', value: brl(safeCredit) },
                  { label: 'Total a pagar', value: brl(totalCost) },
                  { label: 'Taxa adm. total', value: `${(cfg.adminRate * 100).toFixed(0)}%` },
                  { label: 'Juros cobrados', value: 'R$ 0,00' },
                ].map((item, i) => (
                  <div key={i}>
                    <div
                      className="text-[11px] uppercase tracking-wide text-blue-200 mb-0.5"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-[15px] text-white"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings card */}
            <div
              className="rounded-2xl p-5 flex items-center gap-4 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-700"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#DCFCE7' }}
              >
                <TrendingDown size={22} color="#16A34A" />
              </div>
              <div>
                <div
                  className="text-[13px] text-[#6B7280] dark:text-gray-400 mb-0.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Economia vs. financiamento*
                </div>
                <div
                  className="text-[22px] text-[#16A34A]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                >
                  {brl(savingsVsFinancing)}
                </div>
                <div
                  className="text-[11px] text-[#9CA3AF]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  *Comparado a financiamento com taxa de 1,7% a.m.
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#111827] hover:bg-[#1F2937] text-white text-[14px] font-semibold rounded-xl py-4 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Quero começar agora
              <ArrowRight size={16} />
            </button>
            <p
              className="text-center text-[12px] text-[#9CA3AF]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Consultoria gratuita · Sem compromisso
            </p>
          </div>

        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563EB;
          border: 3px solid #ffffff;
          box-shadow: 0 1px 6px rgba(37,99,235,0.4);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563EB;
          border: 3px solid #ffffff;
          box-shadow: 0 1px 6px rgba(37,99,235,0.4);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}