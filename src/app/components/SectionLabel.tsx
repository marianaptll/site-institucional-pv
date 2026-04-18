interface SectionLabelProps {
  children: React.ReactNode;
  center?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionLabel({ children, center = false, dark = false, className }: SectionLabelProps) {
  const color = dark ? 'rgba(255,255,255,0.85)' : '#009cde';
  const badge = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,156,222,0.10)';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        marginBottom: '16px',
        ...(center ? { justifyContent: 'center' } : {}),
      }}
    >
      <span style={{
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase' as const,
        color,
        padding: '4px 10px',
        borderRadius: '6px',
        background: badge,
      }}>
        {children}
      </span>
    </div>
  );
}
