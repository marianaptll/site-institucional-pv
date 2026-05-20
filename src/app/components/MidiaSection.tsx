import { motion, useReducedMotion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { SectionLabel } from './SectionLabel';
import { NOTICIAS } from '../data/noticias';

const VISIBLE = 3;

export function MidiaSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion;

  const total = NOTICIAS.length;
  const maxIndex = Math.max(0, total - VISIBLE);
  const canPrev = current > 0;
  const canNext = current < maxIndex;

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  function prev() { setCurrent(i => Math.max(0, i - 1)); }
  function next() { setCurrent(i => Math.min(maxIndex, i + 1)); }

  const visible = NOTICIAS.slice(current, current + VISIBLE);

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10 flex items-end justify-between gap-4 flex-wrap"
          initial={shouldAnimate ? { opacity: 0, y: -20, filter: 'blur(4px)' } : false}
          animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <div>
            <SectionLabel>Notícias</SectionLabel>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 2.8vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#111827', margin: 0 }}>
              Porto Vale na{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>Imprensa</span>
            </h2>
          </div>

          {/* Setas (só aparecem quando há mais que VISIBLE itens) */}
          {total > VISIBLE && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={prev}
                disabled={!canPrev}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  border: '1px solid #E5E7EB', background: canPrev ? '#111827' : '#F3F4F6',
                  color: canPrev ? '#fff' : '#D1D5DB', cursor: canPrev ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                disabled={!canNext}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  border: '1px solid #E5E7EB', background: canNext ? '#111827' : '#F3F4F6',
                  color: canNext ? '#fff' : '#D1D5DB', cursor: canNext ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </motion.div>

        {/* Cards */}
        <motion.div
          key={current}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          initial={shouldAnimate ? { opacity: 0, x: 24 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {visible.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden group"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', textDecoration: 'none', display: 'block', transition: 'box-shadow 0.2s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,156,222,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; }}
            >
              {/* Imagem */}
              <div className="relative overflow-hidden" style={{ height: '160px' }}>
                {card.imagem ? (
                  <img
                    src={card.imagem}
                    alt={card.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ objectPosition: card.objectPosition ?? 'center' }}
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #009cde 100%)' }} />
                )}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xs mb-0.5 opacity-90" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                    {card.veiculo}
                  </div>
                  <div className="text-xs opacity-70" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {card.data} · {card.local}
                  </div>
                </div>
              </div>

              {/* Título */}
              <div className="p-4">
                <h3
                  className="font-semibold text-[15px] leading-snug line-clamp-3 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {card.titulo}
                </h3>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Dots (quando há mais que VISIBLE) */}
        {total > VISIBLE && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '24px' }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px', borderRadius: '999px', border: 'none',
                  background: i === current ? '#009cde' : '#D1D5DB',
                  cursor: 'pointer', padding: 0, transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link
            to="/noticias"
            onClick={() => window.scrollTo(0, 0)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '14px',
              color: '#111827', border: '1px solid #E5E7EB', borderRadius: '12px',
              padding: '12px 24px', textDecoration: 'none', background: '#fff',
              transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#111827'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#111827'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#111827'; (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; }}
          >
            Ver todas as notícias
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
