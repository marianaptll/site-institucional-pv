const stats = [
  { value: '32.000+', label: 'Consorciados ativos' },
  { value: '98%',     label: 'Índice de satisfação' },
  { value: 'R$ 2bi+', label: 'Em créditos entregues' },
  { value: '18 anos', label: 'De experiência' },
];

export function StatsFloatingBar() {
  return (
    <div
      className="relative z-20 px-4 sm:px-8 lg:px-16"
      style={{ marginTop: '0px', paddingTop: '48px', paddingBottom: '48px' }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl px-4 sm:px-8 py-6 sm:py-8"
          style={{
            backgroundColor: '#111827',
            boxShadow: '0 16px 48px rgba(0,0,0,0.28)',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-gray-700">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center px-3 sm:px-6 py-5 relative"
                style={{
                  /* Linha divisória horizontal no mobile (entre linha 1 e linha 2) */
                  borderTop: i >= 2 ? '1px solid rgba(255,255,255,0.08)' : undefined,
                }}
              >
                {i === 0 && (
                  <div
                    className="absolute inset-x-2 inset-y-2 rounded-xl"
                    style={{ backgroundColor: '#0055c4' }}
                  />
                )}
                <div
                  className="relative leading-none mb-2"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    /* Menor no mobile, maior no desktop */
                    fontSize: 'clamp(24px, 4vw, 44px)',
                    color: '#FFFFFF',
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[11px] text-center uppercase tracking-widest"
                  style={{ color: '#9CA3AF', fontFamily: "'Inter', sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
