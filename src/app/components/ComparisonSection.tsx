import { useState } from 'react';

const rows = [
  { criteria: 'Juros',               consortio: 'Zero juros',      financiamento: 'Até 18% a.a.' },
  { criteria: 'Custo total',         consortio: 'Bem menor',       financiamento: 'Bem maior' },
  { criteria: 'Entrada obrigatória', consortio: 'Não',             financiamento: 'Sim (20–30%)' },
  { criteria: 'Regulação',           consortio: 'Banco Central',   financiamento: 'Banco Central' },
  { criteria: 'Burocracia',          consortio: 'Mínima',          financiamento: 'Alta' },
  { criteria: 'Prazo para o bem',    consortio: 'Sorteio ou lance',financiamento: 'Imediato' },
];

function TableRow({ row, index, isLast }: { row: typeof rows[number]; index: number; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid grid-cols-3 text-center cursor-default select-none"
      style={{
        borderTop: '1px solid #E5E7EB',
        backgroundColor: hovered
          ? 'rgba(0, 85, 196, 0.06)'
          : index % 2 === 0
          ? '#FFFFFF'
          : '#F9FAFB',
        transition: 'background-color 0.2s ease',
      }}
    >
      {/* Critério */}
      <div
        className="py-4 px-5 flex items-center"
        style={{
          borderRight: '1px solid #E5E7EB',
          borderRadius: isLast ? '0 0 0 16px' : undefined,
        }}
      >
        <span
          className="text-[13px]"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: hovered ? '#111827' : '#6B7280',
            fontWeight: hovered ? 500 : 400,
            transition: 'color 0.2s, font-weight 0.2s',
          }}
        >
          {row.criteria}
        </span>
      </div>

      {/* Consórcio */}
      <div
        className="py-4 px-5 flex items-center justify-center"
        style={{
          position: 'relative',
          zIndex: 2,
          transition: 'background-color 0.2s',
          backgroundColor: hovered ? 'rgba(0, 85, 196, 0.08)' : 'transparent',
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            color: hovered ? '#003fa3' : '#0055c4',
            transition: 'color 0.2s, transform 0.2s',
            display: 'inline-block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        >
          {row.consortio}
        </span>
      </div>

      {/* Financiamento */}
      <div
        className="py-4 px-5 flex items-center justify-center"
        style={{
          borderRadius: isLast ? '0 0 16px 0' : undefined,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '3px 10px',
            borderRadius: '6px',
            backgroundColor: hovered ? '#F3F4F6' : 'transparent',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#9CA3AF',
            transition: 'background-color 0.2s',
          }}
        >
          {row.financiamento}
        </span>
      </div>
    </div>
  );
}

export function ComparisonSection() {
  return (
    <section
      className="relative z-10 px-4 sm:px-8 lg:px-16"
      style={{ paddingTop: '80px', paddingBottom: '96px' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Lado esquerdo: título + stat ── */}
          <div style={{ paddingTop: '8px' }}>
            {/* Badge */}
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(0,156,222,0.10)',
                color: '#009cde',
                fontSize: '11px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Comparativo
            </span>

            {/* Título */}
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(36px, 4vw, 54px)',
                color: '#111827',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
              }}
            >
              Consórcio ou{' '}
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#0055c4',
                }}
              >
                financiamento?
              </span>
            </h2>

            {/* Subtítulo */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: '#6B7280',
                lineHeight: 1.7,
                maxWidth: '340px',
                marginBottom: '32px',
              }}
            >
              Entender a diferença entre os dois é o primeiro passo para fazer uma escolha que cabe no seu bolso — e no seu planejamento.
            </p>

            {/* Divisor azul */}
            <div
              style={{
                width: '36px',
                height: '3px',
                borderRadius: '2px',
                backgroundColor: '#0055c4',
                marginBottom: '24px',
              }}
            />

            {/* Stat */}
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(30px, 3.5vw, 42px)',
                color: '#009cde',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              ~R$ 110k
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#6B7280',
                lineHeight: 1.6,
                maxWidth: '280px',
              }}
            >
              economia média em um crédito de R$ 200k no consórcio frente ao financiamento tradicional.
            </p>
          </div>

          {/* ── Lado direito: tabela ── */}
          <div
            style={{
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Overlay flutuante da coluna Consórcio */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(33.333% - 1px)',
                width: 'calc(33.334% + 2px)',
                top: '-14px',
                bottom: '-14px',
                borderRadius: '20px',
                boxShadow: '0 8px 40px rgba(0, 85, 196, 0.35), 0 2px 12px rgba(0, 85, 196, 0.2)',
                border: '2px solid #0055c4',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

            {/* Header */}
            <div className="grid grid-cols-3 text-center">
              <div
                className="py-4 px-5"
                style={{
                  backgroundColor: '#F3F4F6',
                  borderRadius: '16px 0 0 0',
                }}
              >
                <span
                  className="text-[11px] uppercase tracking-widest"
                  style={{ fontFamily: "'Inter', sans-serif", color: '#9CA3AF', fontWeight: 600 }}
                >
                  Critério
                </span>
              </div>
              <div
                className="py-4 px-5 flex items-center justify-center gap-1.5"
                style={{
                  backgroundColor: '#0055c4',
                  position: 'relative',
                  zIndex: 2,
                  borderRadius: '18px 18px 0 0',
                  marginTop: '-14px',
                  paddingTop: 'calc(16px + 14px)',
                }}
              >
                <span
                  className="text-[11px] uppercase tracking-widest text-white"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
                >
                  Consórcio
                </span>
                <span className="text-white text-[14px]">✓</span>
              </div>
              <div
                className="py-4 px-5 flex items-center justify-center"
                style={{
                  backgroundColor: '#374151',
                  borderRadius: '0 16px 0 0',
                }}
              >
                <span
                  className="text-[11px] uppercase tracking-widest"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: '#9CA3AF' }}
                >
                  Financiamento
                </span>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <TableRow key={i} row={row} index={i} isLast={i === rows.length - 1} />
            ))}

            {/* Última linha: célula consórcio estendida para baixo */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(33.333% - 1px)',
                width: 'calc(33.334% + 2px)',
                bottom: '-14px',
                height: '14px',
                backgroundColor: '#0055c4',
                borderRadius: '0 0 18px 18px',
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
