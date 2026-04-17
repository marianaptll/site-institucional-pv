import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookmarkIcon } from 'lucide-react';
import { SectionLabel } from './SectionLabel';

const noticias = [
  {
    id: '1',
    veiculo: 'G1 Globo',
    tag: 'Especial Publicitário',
    data: '7 Abr 2026',
    local: 'Vale do Paraíba, SP',
    titulo: 'Porto Vale acelera crescimento e registra alta de 80% em março',
    href: 'https://g1.globo.com/sp/vale-do-paraiba-regiao/especial-publicitario/ep-porto-vale-consorcio/noticia/2026/04/07/porto-vale-acelera-crescimento-e-registra-alta-de-80percent-em-marco.ghtml',
    imagem: '/imagens/materia1.jpg',
    gradientColors: ['from-blue-500/20', 'to-indigo-500/20'],
  },
  {
    id: '2',
    veiculo: 'G1 Globo',
    tag: 'Especial Publicitário',
    data: '22 Mar 2026',
    local: 'Vale do Paraíba, SP',
    titulo: 'Copom reduz Selic e consórcio se mantém como estratégia para a casa própria',
    href: 'https://g1.globo.com/sp/vale-do-paraiba-regiao/especial-publicitario/ep-porto-vale-consorcio/noticia/2026/03/22/copom-reduz-selic-e-consorcio-se-mantem-como-estrategia-para-a-casa-propria.ghtml',
    imagem: '/imagens/materia2.jpg',
    gradientColors: ['from-green-500/20', 'to-teal-500/20'],
  },
  {
    id: '3',
    veiculo: 'G1 Globo',
    tag: 'Especial Publicitário',
    data: '9 Mar 2026',
    local: 'Vale do Paraíba, SP',
    titulo: 'De 4 a 600 colaboradores: Porto Vale reforça liderança em consórcios e seguros',
    href: 'https://g1.globo.com/sp/vale-do-paraiba-regiao/especial-publicitario/ep-porto-vale-consorcio/noticia/2026/03/09/de-4-a-600-colaboradores-porto-vale-reforca-lideranca-em-consorcios-e-seguros.ghtml',
    imagem: '/imagens/materia3.jpg',
    gradientColors: ['from-orange-500/20', 'to-red-500/20'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.8 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 28, mass: 0.8 },
  },
};

const statusBars = [
  { id: '1', width: '100%', opacity: 1 },
  { id: '2', width: '66%',  opacity: 0.6 },
  { id: '3', width: '33%',  opacity: 0.35 },
];

export function MidiaSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion;

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={shouldAnimate ? { opacity: 0, y: -20, filter: 'blur(4px)' } : false}
          animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <SectionLabel>Na mídia</SectionLabel>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 2.8vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#111827' }}>
            Porto Vale nas{' '}
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>notícias</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          variants={shouldAnimate ? containerVariants : {}}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
        >
          {noticias.map((card) => (
            <motion.a
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden group"
              variants={shouldAnimate ? cardVariants : {}}
              whileHover={shouldAnimate ? { y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 400, damping: 25 } } : {}}
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', textDecoration: 'none', display: 'block' }}
            >
              {/* Imagem */}
              <div className="relative overflow-hidden" style={{ height: '160px' }}>
                <img
                  src={card.imagem}
                  alt={card.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Bookmark */}
                <motion.div
                  className="absolute top-3 right-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 25 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => toggleBookmark(card.id, e)}
                >
                  <BookmarkIcon className={`w-5 h-5 cursor-pointer transition-colors drop-shadow ${bookmarked.has(card.id) ? 'text-yellow-400 fill-yellow-400' : 'text-white/80 hover:text-white'}`} />
                </motion.div>

                {/* Tag + data */}
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xs mb-0.5 opacity-90" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                    {card.veiculo}, {card.tag}
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
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
