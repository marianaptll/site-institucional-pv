import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { MapaLeaflet } from '../components/MapaLeaflet';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '../constants';
import { SectionLabel } from '../components/SectionLabel';

const unidades = [
  {
    city: 'São José dos Campos',
    role: 'Matriz',
    address: 'Av. Comendador Vicente de Paulo Penido, 374, Parque Res. Aquarius, São José dos Campos, SP, 12246-856',
    lat: -23.2174,
    lng: -45.9028,
  },
  {
    city: 'Jacareí',
    role: 'Filial',
    address: 'Endereço em breve em Jacareí, SP',
    lat: -23.3056,
    lng: -45.9661,
  },
  {
    city: 'São Paulo',
    role: 'Filial',
    address: 'Av. Luiz Dumont Villares, 1160, 11º andar, salas 111 a 116, Jardim São Paulo, SP, 02085-100',
    lat: -23.4973,
    lng: -46.6127,
  },
];

export function Contato() {
  const [selectedUnidade, setSelectedUnidade] = useState(0);

  return (
    <>
      <Header />

      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif" }}>

        {/* ── Hero ── */}
        <section
          style={{
            backgroundColor: '#111827',
            padding: 'clamp(56px, 10vw, 96px) clamp(24px, 6vw, 96px)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 0 28px 28px',
          }}
        >
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,156,222,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <SectionLabel center>Fale com a gente</SectionLabel>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(28px, 3.5vw, 52px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#fff',
                maxWidth: '720px',
                margin: 0,
              }}
            >
              Conheça as unidades Porto Vale e conte com nosso{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>
                suporte e atendimento personalizado
              </span>
            </h1>
          </div>
        </section>

        {/* ── Contato + Mapa ── */}
        <section style={{ backgroundColor: '#fff', padding: 'clamp(56px, 10vw, 96px) 24px' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Esquerda — unidades + canais */}
              <div>
                <SectionLabel>Nossas unidades</SectionLabel>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(24px, 2.8vw, 38px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#111827',
                    marginBottom: '32px',
                  }}
                >
                  Onde você{' '}
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>
                    nos encontra
                  </span>
                </h2>

                {/* Cards de unidade */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
                  {unidades.map((u, i) => {
                    const active = selectedUnidade === i;
                    return (
                      <button
                        key={u.city}
                        onClick={() => setSelectedUnidade(i)}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '14px',
                          padding: '16px 20px', borderRadius: '14px', cursor: 'pointer',
                          textAlign: 'left', width: '100%',
                          background: active ? '#EFF6FF' : '#F9FAFB',
                          border: active ? '1.5px solid #BFDBFE' : '1.5px solid transparent',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: active ? '#2563EB' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s ease' }}>
                          <MapPin size={16} color={active ? '#fff' : '#6B7280'} strokeWidth={2}/>
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700, color: active ? '#1D4ED8' : '#111827' }}>{u.city}</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: active ? '#3B82F6' : '#9CA3AF', background: active ? '#DBEAFE' : '#F3F4F6', padding: '2px 8px', borderRadius: '20px' }}>{u.role}</span>
                          </div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: active ? '#3B82F6' : '#9CA3AF', margin: 0, lineHeight: 1.5 }}>{u.address}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Canais de atendimento */}
                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '32px' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: '#9CA3AF', marginBottom: '16px' }}>
                    Canais de atendimento
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', background: '#F0FDF4', borderRadius: '12px', border: '1px solid #BBF7D0', textDecoration: 'none' }}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Phone size={16} color="#fff" strokeWidth={2}/>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#15803D' }}>WhatsApp</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#4ADE80' }}>Atendimento imediato</div>
                      </div>
                      <ArrowRight size={14} color="#16A34A"/>
                    </a>

                    <a
                      href="tel:08004946600"
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB', textDecoration: 'none' }}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Phone size={16} color="#fff" strokeWidth={2}/>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#111827' }}>Telefone</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#9CA3AF' }}>0800 494 6600</div>
                      </div>
                      <ArrowRight size={14} color="#374151"/>
                    </a>

                    <a
                      href="mailto:contato@portovaleconsorcios.com.br"
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', background: '#EFF6FF', borderRadius: '12px', border: '1px solid #BFDBFE', textDecoration: 'none' }}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Mail size={16} color="#fff" strokeWidth={2}/>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#1D4ED8' }}>E-mail</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#93C5FD' }}>contato@portovaleconsorcios.com.br</div>
                      </div>
                      <ArrowRight size={14} color="#2563EB"/>
                    </a>
                  </div>
                </div>
              </div>

              {/* Direita — Mapa */}
              <div
                className="lg:sticky lg:top-[88px]"
                style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', height: 'clamp(300px, 50vw, 480px)' }}
              >
                <MapaLeaflet
                  lat={unidades[selectedUnidade].lat}
                  lng={unidades[selectedUnidade].lng}
                />
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
