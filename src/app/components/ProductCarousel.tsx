import { Home, MapPin, Hammer, Car, Truck, Sprout, TrendingUp, Sun, Briefcase } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

const BLUE = '#009cde';
const SPEED = 0.25;
const DRAG_THRESHOLD = 6;

const products = [
  { icon: Home,       label: 'Imóvel',              href: '/consorcio-imovel' },
  { icon: MapPin,     label: 'Terreno',              href: '/consorcio-terreno' },
  { icon: Hammer,     label: 'Construção e Reforma', href: '/consorcio-construcao-reforma' },
  { icon: Car,        label: 'Automóvel',            href: '/consorcio-automovel' },
  { icon: Truck,      label: 'Pesados',              href: '/consorcio-pesados' },
  { icon: Sprout,     label: 'Agro',                 href: '/consorcio-agro' },
  { icon: TrendingUp, label: 'Investimento',         href: '/consorcio-investimento' },
  { icon: Sun,        label: 'Placa Solar',          href: '/consorcio-placa-solar' },
  { icon: Briefcase,  label: 'Empresarial',          href: '/consorcio-empresarial' },
];

const loopItems = [...products, ...products, ...products];

// ── IconButton ────────────────────────────────────────────────────────────────
function IconButton({
  icon: Icon,
  label,
  href,
  wasDrag,        // getter: retorna true se o gesto atual foi um drag
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  wasDrag: () => boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (wasDrag()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    navigate(href);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="relative flex-shrink-0"
      style={{ zIndex: hovered ? 30 : 'auto', userSelect: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 10px)',
          left: '50%',
          transform: `translateX(-50%) scale(${hovered ? 1 : 0.88})`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          backgroundColor: '#111827',
          color: '#FFFFFF',
          borderRadius: '8px',
          padding: '5px 11px',
          fontSize: '12px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
          letterSpacing: '0.01em',
        }}
      >
        {label}
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #111827',
          }}
        />
      </div>

      {/* Botão */}
      <button
        onClick={handleClick}
        aria-label={label}
        className="flex items-center justify-center"
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '16px',
          backgroundColor: 'transparent',
          border: `1.5px solid ${hovered ? BLUE : 'rgba(0,0,0,0.12)'}`,
          boxShadow: hovered
            ? '0 4px 18px rgba(0,156,222,0.22)'
            : '0 1px 4px rgba(0,0,0,0.06)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
          cursor: 'pointer',
        }}
      >
        <Icon size={28} style={{ color: hovered ? BLUE : '#6B7280', transition: 'color 0.2s' }} />
      </button>
    </div>
  );
}

// ── ProductCarousel ───────────────────────────────────────────────────────────
export function ProductCarousel() {
  const trackRef      = useRef<HTMLDivElement>(null);
  const offsetRef     = useRef(0);
  const rafRef        = useRef<number>(0);
  const loopWidthRef  = useRef(0);
  const draggingRef   = useRef(false);   // true enquanto o ponteiro está pressionado e moveu
  const hasDraggedRef = useRef(false);   // persiste até o próximo pointerdown (para o onClick ler)
  const dragStartX    = useRef(0);
  const dragStartOff  = useRef(0);
  const lastVelocity  = useRef(0);
  const lastMoveX     = useRef(0);

  const [isDragging, setIsDragging] = useState(false);

  // RAF de auto-scroll
  useEffect(() => {
    const tick = () => {
      if (loopWidthRef.current === 0 && trackRef.current) {
        const sw = trackRef.current.scrollWidth;
        if (sw > 0) loopWidthRef.current = sw / 3;
      }
      if (!draggingRef.current && loopWidthRef.current > 0) {
        offsetRef.current -= SPEED;
        if (offsetRef.current <= -loopWidthRef.current) offsetRef.current += loopWidthRef.current;
        if (trackRef.current)
          trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const normalize = useCallback((val: number, lw: number) => {
    let o = val % lw;
    if (o > 0) o -= lw;
    if (o <= -lw) o += lw;
    return o;
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current  = e.clientX;
    dragStartOff.current = offsetRef.current;
    lastVelocity.current = 0;
    lastMoveX.current   = e.clientX;
    hasDraggedRef.current = false; // reset a cada novo gesto
    draggingRef.current = true;    // pausa o auto-scroll imediatamente
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = e.clientX - dragStartX.current;

    // Só marca como drag visual depois do threshold
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    lastVelocity.current = e.clientX - lastMoveX.current;
    lastMoveX.current    = e.clientX;
    const lw = loopWidthRef.current;
    offsetRef.current = lw > 0
      ? normalize(dragStartOff.current + delta, lw)
      : dragStartOff.current + delta;
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
  }, [normalize]);

  const onPointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    offsetRef.current += lastVelocity.current * 4;
    const lw = loopWidthRef.current;
    if (lw > 0) offsetRef.current = normalize(offsetRef.current, lw);
    draggingRef.current = false;
    setIsDragging(false);
    // hasDraggedRef.current NÃO reseta aqui — o onClick dos filhos ainda vai ler o valor
    // e só vai ser resetado no próximo onPointerDown
  }, [normalize]);

  // getter estável para os filhos
  const wasDrag = useCallback(() => hasDraggedRef.current, []);

  return (
    <div
      className="relative z-20 py-4"
      style={{
        marginBottom: '24px',
        overflowX: 'clip',
        overflowY: 'visible',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Fade esquerda */}
      <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #eeebe6, transparent)' }} />
      {/* Fade direita */}
      <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #eeebe6, transparent)' }} />

      <div ref={trackRef} className="flex gap-5 w-max" style={{ willChange: 'transform' }}>
        {loopItems.map((item, i) => (
          <IconButton
            key={i}
            icon={item.icon}
            label={item.label}
            href={item.href}
            wasDrag={wasDrag}
          />
        ))}
      </div>
    </div>
  );
}
