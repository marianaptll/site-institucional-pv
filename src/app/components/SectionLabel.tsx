interface SectionLabelProps {
  children: React.ReactNode;
  /** Coloca linhas dos dois lados (para seções centralizadas) */
  center?: boolean;
  /** Versão clara para fundos escuros */
  dark?: boolean;
  className?: string;
}

export function SectionLabel({ children, center = false, dark = false, className }: SectionLabelProps) {
  const color = dark ? 'rgba(255,255,255,0.75)' : '#009cde';
  const line = (
    <span style={{
      display: 'inline-block',
      width: '28px',
      height: '2px',
      borderRadius: '1px',
      background: color,
      flexShrink: 0,
    }} />
  );
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px',
        ...(center ? { justifyContent: 'center' } : {}),
      }}
    >
      {line}
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color,
      }}>
        {children}
      </span>
      {center && line}
    </div>
  );
}
