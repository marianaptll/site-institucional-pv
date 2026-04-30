import { useRef, useState, useEffect } from 'react';
import { useInView, motion } from 'motion/react';

const stats = [
  { numeric: 53.3, label: 'Clientes',                 format: (v: number) => `+${v.toFixed(1).replace('.', ',')} mil`,    highlighted: true  },
  { numeric: 80,   label: 'Cotas negociadas',          format: (v: number) => `+${Math.round(v)} mil`,                    highlighted: false },
  { numeric: 20.5, label: 'Em crédito comercializado', format: (v: number) => `+R$ ${v.toFixed(1).replace('.', ',')}bi`,  highlighted: false },
  { numeric: 3,    label: 'Cidades atendidas',         format: (v: number) => `+${Math.round(v)} mil`,                    highlighted: false },
];

function AnimatedStat({ stat, index, total }: { stat: typeof stats[number]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setDisplayed(eased * stat.numeric);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, stat.numeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
      className="flex flex-col items-center text-center"
      style={{
        padding: '16px 12px',
        borderRight: index < total - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <motion.div
        animate={isInView ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 2.8 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(24px, 3vw, 48px)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '8px',
          color: stat.highlighted ? '#009cde' : '#fff',
        }}
      >
        {stat.format(displayed)}
      </motion.div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export function NumerosBar() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16" style={{ paddingTop: 'clamp(24px, 5vw, 64px)', paddingBottom: 'clamp(40px, 6vw, 72px)' }}>
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 'clamp(24px, 4vw, 48px)', gap: '0' }}
      >
        {stats.map((s, i) => (
          <AnimatedStat key={i} stat={s} index={i} total={stats.length} />
        ))}
      </div>
    </div>
  );
}
