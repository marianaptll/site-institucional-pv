import { MouseEvent, useEffect, useRef, useState } from "react";

const identityMatrix =
  "1, 0, 0, 0, " +
  "0, 1, 0, 0, " +
  "0, 0, 1, 0, " +
  "0, 0, 0, 1";

const maxRotate = 0.25;
const minRotate = -0.25;
const maxScale = 1;
const minScale = 0.97;

const overlayLayers: { color: string; offset: number }[] = [
  { color: "hsl(210, 100%, 45%)", offset: 0  },
  { color: "hsl(220, 90%,  60%)", offset: 10 },
  { color: "hsl(195, 100%, 50%)", offset: 20 },
  { color: "hsl(180, 90%,  45%)", offset: 30 },
  { color: "hsl(165, 80%,  45%)", offset: 40 },
  { color: "hsl(185, 100%, 60%)", offset: 50 },
  { color: "hsl(200, 70%,  40%)", offset: 60 },
  { color: "hsl(175, 60%,  70%)", offset: 70 },
  { color: "transparent",         offset: 80 },
  { color: "white",               offset: 90 },
];

export function ExperienceBadge({ variant = 'floating' }: { variant?: 'floating' | 'inline' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [firstOverlayPosition, setFirstOverlayPosition] = useState(0);
  const [matrix, setMatrix] = useState(identityMatrix);
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix);
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState(true);
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState(false);
  const [isTimeoutFinished, setIsTimeoutFinished] = useState(false);
  const enterTimeout  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getDimensions = () => {
    const r = ref.current?.getBoundingClientRect();
    return { left: r?.left ?? 0, right: r?.right ?? 0, top: r?.top ?? 0, bottom: r?.bottom ?? 0 };
  };

  const getMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;
    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xCenter - clientX) / (xCenter - left),
      maxScale - (maxScale - minScale) * Math.abs(yCenter - clientY) / (yCenter - top),
      maxScale - (maxScale - minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY)) / (xCenter - left + yCenter - top),
    ];
    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / yCenter - (xCenter - clientX) / xCenter),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left),
      x3: 0, y0: 0,
      y2: maxRotate - (maxRotate - minRotate) * (top - clientY) / (top - bottom),
      y3: 0,
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left)),
      z1: 0.2 - (0.2 + 0.6) * (top - clientY) / (top - bottom),
      z3: 0,
    };
    return `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`;
  };

  const getOppositeMatrix = (_matrix: string, clientY: number, onMouseEnter?: boolean) => {
    const { top, bottom } = getDimensions();
    const oppositeY = bottom - clientY + top;
    const weakening = onMouseEnter ? 0.7 : 4;
    const multiplier = onMouseEnter ? -1 : 1;
    return _matrix.split(", ").map((item, index) => {
      if (index === 2 || index === 4 || index === 8) return String(-parseFloat(item) * multiplier / weakening);
      if (index === 0 || index === 5 || index === 10) return "1";
      if (index === 6) return String(multiplier * (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening);
      if (index === 9) return String((maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening);
      return item;
    }).join(", ");
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    [leaveTimeout1, leaveTimeout2, leaveTimeout3].forEach(t => { if (t.current) clearTimeout(t.current); });
    setDisableOverlayAnimation(true);
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;
    setDisableInOutOverlayAnimation(false);
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5);
    }));
    const m = getMatrix(e.clientX, e.clientY);
    setMatrix(getOppositeMatrix(m, e.clientY, true));
    setIsTimeoutFinished(false);
    setTimeout(() => setIsTimeoutFinished(true), 200);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;
    setTimeout(() => setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5), 150);
    if (isTimeoutFinished) setCurrentMatrix(getMatrix(e.clientX, e.clientY));
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY);
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
    setCurrentMatrix(oppositeMatrix);
    setTimeout(() => setCurrentMatrix(identityMatrix), 200);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setDisableInOutOverlayAnimation(false);
      leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150);
      leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300);
      leaveTimeout3.current = setTimeout(() => { setDisableOverlayAnimation(false); setDisableInOutOverlayAnimation(true); }, 500);
    }));
  };

  useEffect(() => {
    if (isTimeoutFinished) setMatrix(currentMatrix);
  }, [currentMatrix, isTimeoutFinished]);

  const overlayAnimations = overlayLayers.map((_, i) => `
    @keyframes expBadgeAnim${i + 1} {
      0%   { transform: rotate(${i * 10}deg); }
      50%  { transform: rotate(${(i + 1) * 10}deg); }
      100% { transform: rotate(${i * 10}deg); }
    }
  `).join(" ");

  return (
    <div
      ref={ref}
      className={variant === 'floating' ? "hidden sm:block" : "block"}
      style={{
        ...(variant === 'floating' ? { position: "absolute", top: "-20px", right: "-12px", zIndex: 2 } : {}),
        cursor: "default",
        transform: `perspective(700px) matrix3d(${matrix})`,
        transformOrigin: "center center",
        transition: "transform 200ms ease-out",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <style>{overlayAnimations}</style>

      {/* Mesma estrutura SVG do AwardBadge — viewBox 260×54 */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 54" style={{ width: "260px", height: "54px", display: "block" }}>
        <defs>
          <filter id="expBadgeBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
          <mask id="expBadgeMask">
            <rect width="260" height="54" fill="white" rx="10" />
          </mask>
        </defs>

        {/* Fundo prata */}
        <rect width="260" height="54" rx="10" fill="#ddd" />
        {/* Borda interna */}
        <rect x="4" y="4" width="252" height="46" rx="8" fill="transparent" stroke="#bbb" strokeWidth="1" />

        {/* Laurel wreath — path idêntico ao AwardBadge */}
        <g transform="translate(8, 9)">
          <path fill="#666" d="M14.963 9.075c.787-3-.188-5.887-.188-5.887S12.488 5.175 11.7 8.175c-.787 3 .188 5.887.188 5.887s2.25-1.987 3.075-4.987m-4.5 1.987c.787 3-.188 5.888-.188 5.888S7.988 14.962 7.2 11.962c-.787-3 .188-5.887.188-5.887s2.287 1.987 3.075 4.987m.862 10.388s-.6-2.962-2.775-5.175C6.337 14.1 3.375 13.5 3.375 13.5s.6 2.962 2.775 5.175c2.213 2.175 5.175 2.775 5.175 2.775m3.3 3.413s-1.988-2.288-4.988-3.075-5.887.187-5.887.187 1.987 2.287 4.988 3.075c3 .787 5.887-.188 5.887-.188Zm6.75 0s1.988-2.288 4.988-3.075c3-.826 5.887.187 5.887.187s-1.988 2.287-4.988 3.075c-3 .787-5.887-.188-5.887-.188ZM32.625 13.5s-2.963.6-5.175 2.775c-2.213 2.213-2.775 5.175-2.775 5.175s2.962-.6 5.175-2.775c2.175-2.213 2.775-5.175 2.775-5.175M28.65 6.075s.975 2.887.188 5.887c-.826 3-3.076 4.988-3.076 4.988s-.974-2.888-.187-5.888c.788-3 3.075-4.987 3.075-4.987m-4.5 7.987s.975-2.887.188-5.887c-.788-3-3.076-4.988-3.076-4.988s-.974 2.888-.187 5.888c.788 3 3.075 4.988 3.075 4.988ZM18 26.1c.975-.225 3.113-.6 5.325 0 3 .788 5.063 3.038 5.063 3.038s-2.888.975-5.888.187a13 13 0 0 1-1.425-.525c.563.788 1.125 1.425 2.288 1.913l-.863 2.062c-2.063-.862-2.925-2.137-3.675-3.262-.262-.375-.525-.713-.787-1.05-.26.293-.465.586-.686.903l-.102.147-.048.068c-.775 1.108-1.643 2.35-3.627 3.194l-.862-2.062c1.162-.488 1.725-1.125 2.287-1.913-.45.225-.938.375-1.425.525-3 .788-5.887-.187-5.887-.187s1.987-2.288 4.987-3.075c2.212-.563 4.35-.188 5.325.037" />
        </g>

        {/* Label superior */}
        <text fontFamily="Helvetica-Bold, Helvetica" fontSize="9" fontWeight="bold" fill="#666" x="53" y="20">
          PORTO VALE
        </text>
        {/* Título principal */}
        <text fontFamily="Helvetica-Bold, Helvetica" fontSize="16" fontWeight="bold" fill="#666" x="52" y="40">
          +20 anos de experiência
        </text>

        {/* Overlay holográfico */}
        <g style={{ mixBlendMode: "overlay" }} mask="url(#expBadgeMask)">
          {overlayLayers.map((layer, i) => (
            <g
              key={i}
              style={{
                transform: `rotate(${firstOverlayPosition + layer.offset}deg)`,
                transformOrigin: "center center",
                transition: !disableInOutOverlayAnimation ? "transform 200ms ease-out" : "none",
                animation: disableOverlayAnimation ? "none" : `expBadgeAnim${i + 1} 5s infinite`,
                willChange: "transform",
              }}
            >
              <polygon
                points="0,0 260,54 260,0 0,54"
                fill={layer.color}
                filter="url(#expBadgeBlur)"
                opacity="0.5"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
