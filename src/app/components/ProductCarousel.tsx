import { Home, MapPin, Hammer, Car, Truck, Sprout, TrendingUp, Sun, Briefcase } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

const BLUE = '#009cde';
const SPEED = 0.25;

const products = [
  { icon: Home,       label: 'Imóvel',               href: '/consorcio-imovel' },
  { icon: MapPin,     label: 'Terreno',               href: '/consorcio-terreno' },
  { icon: Hammer,     label: 'Construção e Reforma',  href: '/consorcio-construcao-reforma' },
  { icon: Car,        label: 'Automóvel',             href: '/consorcio-automovel' },
  { icon: Truck,      label: 'Pesados',               href: '/consorcio-pesados' },
  { icon: Sprout,     label: 'Agro',                  href: '/consorcio-agro' },
  { icon: TrendingUp, label: 'Investimento',          href: '/consorcio-investimento' },
  { icon: Sun,        label: 'Placa Solar',           href: '/consorcio-placa-solar' },
  { icon: Briefcase,  label: 'Empresarial',           href: '/consorcio-empresarial' },
];

const loopItems = [...products, ...products, ...products];

function IconButton({
  icon: Icon,
  label,
  href,
  isDragging,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  isDragging: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered && !isDragging;
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isDragging) {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className="relative flex-shrink-0"
      style={{ zIndex: active ? 30 : 'auto', userSelect: 'none' }}
    >
      {/* Tooltip */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 10px)',
          left: '50%',
          transform: `translateX(-50%) scale(${active ? 1 : 0.88})`,
          opacity: active ? 1 : 0,
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

      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
        className="flex items-center justify-center transition-all duration-200"
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '16px',
          backgroundColor: 'transparent',
          border: `1.5px solid ${active ? BLUE : 'rgba(0,0,0,0.12)'}`,
          boxShadow: active
            ? '0 4px 18px rgba(0,156,222,0.22)'
            : '0 1px 4px rgba(0,0,0,0.06)',
          transform: active ? 'scale(1.1)' : 'scale(1)',
          cursor: isDragging ? 'grabbing' : 'pointer',
          pointerEvents: isDragging ? 'none' : 'auto',
        }}
      >
        <Icon size={28} style={{ color: active ? BLUE : '#6B7280' }} />
      </button>
    </div>
  );
}

export function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const loopWidthRef = useRef(0);
  const draggingRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const lastVelocity = useRef(0);
  const lastMoveX = useRef(0);
  const hasDraggedRef = useRef(false);

  // RAF loop
  useEffect(() => {
    const applyTransform = () => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
    };

    const tick = () => {
      if (loopWidthRef.current === 0 && trackRef.current) {
        const sw = trackRef.current.scrollWidth;
        if (sw > 0) loopWidthRef.current = sw / 3;
      }

      const lw = loopWidthRef.current;
      if (!draggingRef.current && lw > 0) {
        offsetRef.current -= SPEED;
        if (offsetRef.current <= -lw) offsetRef.current += lw;
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const normalizeOffset = useCallback((val: number, loopWidth: number) => {
    let o = val % loopWidth;
    if (o > 0) o -= loopWidth;
    if (o <= -loopWidth) o += loopWidth;
    return o;
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    lastVelocity.current = 0;
    lastMoveX.current = e.clientX;
    hasDraggedRef.current = false;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const delta = e.clientX - dragStartX.current;
    if (!hasDraggedRef.current && Math.abs(delta) < 6) return;

    if (!hasDraggedRef.current) {
      hasDraggedRef.current = true;
      draggingRef.current = true;
      setIsDragging(true);
    }

    lastVelocity.current = e.clientX - lastMoveX.current;
    lastMoveX.current = e.clientX;
    const lw = loopWidthRef.current;
    offsetRef.current = lw > 0
      ? normalizeOffset(dragStartOffset.current + delta, lw)
      : dragStartOffset.current + delta;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }
  }, [normalizeOffset]);

  const onPointerUp = useCallback(() => {
    if (!hasDraggedRef.current) return;
    offsetRef.current += lastVelocity.current * 4;
    const lw = loopWidthRef.current;
    if (lw > 0) offsetRef.current = normalizeOffset(offsetRef.current, lw);
    draggingRef.current = false;
    hasDraggedRef.current = false;
    setIsDragging(false);
  }, [normalizeOffset]);

  return (
    <div
      className="relative z-20 py-4"
      style={{
        marginTop: '0px',
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
      <div
        className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #eeebe6 0%, transparent 100%)' }}
      />
      {/* Fade direita */}
      <div
        className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #eeebe6 0%, transparent 100%)' }}
      />

      <div
        ref={trackRef}
        className="flex gap-5 w-max"
        style={{ willChange: 'transform' }}
      >
        {loopItems.map((item, i) => (
          <IconButton
            key={i}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isDragging={isDragging}
          />
        ))}
      </div>
    </div>
  );
}
