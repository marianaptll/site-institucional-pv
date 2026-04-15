import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import heroImage from '../../assets/casacarroemoto.png';

/* ── Card 1: Vídeo ─────────────────────────────────────────────── */
function VideoCard() {
  return (
    <div
      className="relative rounded-3xl overflow-hidden flex flex-col justify-end"
      style={{
        flex: '1 1 0',
        minHeight: '320px',
        background: '#111827',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: '64px',
            height: '64px',
            background: 'rgba(255,255,255,0.12)',
            border: '1.5px solid rgba(255,255,255,0.22)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Play size={26} fill="white" color="white" style={{ marginLeft: '3px' }} />
        </div>
      </div>

      <div
        className="relative z-10 p-6"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Porto Vale Explica
        </span>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: '18px',
            color: '#fff',
            marginTop: '4px',
          }}
        >
          Entenda o consórcio em<br />2 minutos
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '8px',
          }}
        >
          • Vídeo · 2 min
        </p>
      </div>
    </div>
  );
}

/* ── Card 2: Texto azul ────────────────────────────────────────── */
function TextCard() {
  return (
    <div
      className="relative rounded-3xl flex flex-col justify-between overflow-hidden"
      style={{
        flex: '1 1 0',
        minHeight: '320px',
        background: '#0055c4',
        padding: '24px',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-48px',
          right: '-48px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }}
      />

      {/* Topo: mini image card + título */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>

        {/* Mini image card */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            height: '172px',
            position: 'relative',
            background: '#fff',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={heroImage}
            alt="Casa, carro e moto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>

        {/* Título */}
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(22px, 2.4vw, 34px)',
            color: '#fff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          Mas afinal, o que é consórcio?
        </h2>
      </div>

      {/* Base: body text */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '18px' }}>
        <div
          style={{
            width: '32px',
            height: '1.5px',
            background: 'rgba(255,255,255,0.25)',
            marginBottom: '14px',
          }}
        />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
          }}
        >
          O consórcio é uma modalidade de compra regulamentada pelo Banco Central, baseada na associação de pessoas físicas e jurídicas que desejam adquirir um bem.
        </p>
      </div>
    </div>
  );
}

/* ── Card 3: Guia do consórcio (branco) ───────────────────────── */
function GuideCard() {
  const [hovered, setHovered] = useState(false);
  const expanded = hovered;
  return (
    <div
      className="relative rounded-3xl flex flex-col justify-between p-8 overflow-hidden"
      style={{
        flex: '1 1 0',
        minHeight: '320px',
        background: '#fff',
        border: '1.5px solid rgba(0,0,0,0.07)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(0,85,196,0.05)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
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
            marginBottom: '28px',
          }}
        >
          Guia completo
        </span>

        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 4vw, 60px)',
            color: '#111827',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}
        >
          O Guia do{' '}
          <span
            style={{
              display: 'inline',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#0055c4',
            }}
          >
            Consórcio
          </span>
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#6B7280',
            lineHeight: 1.65,
            maxWidth: '280px',
          }}
        >
          Descomplicando o consórcio com você. Um guia simples para entender como funciona, do início ao fim.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: '24px' }}>
        {/* Desktop: expansão ao hover | Mobile: sempre expandido */}
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="lg:inline-flex hidden"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: expanded ? '8px' : '0px',
            height: '48px',
            width: expanded ? '148px' : '48px',
            borderRadius: '999px',
            background: '#0055c4',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: expanded ? '0 6px 28px rgba(0,85,196,0.40)' : '0 4px 20px rgba(0,85,196,0.25)',
            transition: 'width 0.28s cubic-bezier(.4,0,.2,1), box-shadow 0.2s',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            paddingLeft: expanded ? '20px' : '0px',
            paddingRight: expanded ? '16px' : '0px',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              color: '#fff',
              maxWidth: expanded ? '100px' : '0px',
              opacity: expanded ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-width 0.28s cubic-bezier(.4,0,.2,1), opacity 0.2s 0.1s',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Ler o guia
          </span>
          <ArrowRight size={18} style={{ flexShrink: 0 }} />
        </button>
        {/* Mobile: botão sempre expandido */}
        <button
          className="lg:hidden inline-flex"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: '48px',
            paddingLeft: '20px',
            paddingRight: '16px',
            borderRadius: '999px',
            background: '#0055c4',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,85,196,0.25)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px', color: '#fff' }}>
            Ler o guia
          </span>
          <ArrowRight size={18} style={{ flexShrink: 0 }} />
        </button>
      </div>
    </div>
  );
}

/* ── Section principal ─────────────────────────────────────────── */
export function WhatIsConsorcioSection() {
  return (
    <section className="py-16 lg:py-24 relative z-20" style={{ paddingBottom: '40px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        {/* Stack vertical no mobile, horizontal no desktop */}
        <div className="flex flex-col lg:flex-row gap-5" style={{ alignItems: 'stretch' }}>
          <VideoCard />
          <TextCard />
          <GuideCard />
        </div>
      </div>
    </section>
  );
}
