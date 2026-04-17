import { useState } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { TestimonialsColumn } from '../components/ui/testimonials-columns';
import { WHATSAPP_URL } from '../constants';
import { SectionLabel } from '../components/SectionLabel';

// ── Depoimentos ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    text: 'Entrei no consórcio sem acreditar muito. Em 14 meses fui contemplado por sorteio e hoje tenho meu carro pago sem pagar um centavo de juros. Simplesmente incrível.',
    image: 'https://i.pravatar.cc/80?img=11',
    name: 'Lucas Ferreira',
    role: 'Contemplado — Consórcio Automóvel',
  },
  {
    text: 'Comparei com o financiamento e a diferença foi absurda. Economizei muito no total. O atendimento foi excelente do começo ao fim.',
    image: 'https://i.pravatar.cc/80?img=47',
    name: 'Camila Rocha',
    role: 'Contemplada — Consórcio Imóvel',
  },
  {
    text: 'Fiz o lance e fui contemplado no 8º mês. O processo foi transparente e a equipe me ajudou em cada passo. Recomendo para todo mundo que quer comprar sem juros.',
    image: 'https://i.pravatar.cc/80?img=52',
    name: 'Rafael Mendes',
    role: 'Contemplado — Consórcio Automóvel',
  },
  {
    text: 'O consultor me explicou tudo com clareza, não teve nenhuma surpresa. O consórcio é realmente a forma mais inteligente de adquirir um bem.',
    image: 'https://i.pravatar.cc/80?img=25',
    name: 'Fernanda Costa',
    role: 'Contemplada — Consórcio Imóvel',
  },
  {
    text: 'Entrei com parcelas acessíveis e em menos de um ano já estava com meu carro novo. Nunca mais vou financiar nada na vida.',
    image: 'https://i.pravatar.cc/80?img=68',
    name: 'Thiago Oliveira',
    role: 'Contemplado — Consórcio Automóvel',
  },
  {
    text: 'Usei a carta de crédito de forma inteligente. Foi ágil, sem burocracia e o valor corrigido me permitiu fazer tudo que planejei.',
    image: 'https://i.pravatar.cc/80?img=33',
    name: 'Ana Paula Lima',
    role: 'Contemplada — Consórcio Imóvel',
  },
  {
    text: 'A Porto Vale me deu suporte em tudo desde o primeiro contato. Senti segurança em cada etapa e o resultado foi incrível.',
    image: 'https://i.pravatar.cc/80?img=57',
    name: 'Marcos Vieira',
    role: 'Contemplado — Consórcio Imóvel',
  },
  {
    text: 'Indiquei para minha família toda. É a melhor forma de planejar a compra de um bem sem se endividar com juros absurdos.',
    image: 'https://i.pravatar.cc/80?img=44',
    name: 'Juliana Mendonça',
    role: 'Contemplada — Consórcio Automóvel',
  },
  {
    text: 'Já fiz dois consórcios com a Porto Vale. O atendimento é sempre impecável e a transparência faz toda a diferença na hora de decidir.',
    image: 'https://i.pravatar.cc/80?img=15',
    name: 'Eduardo Santana',
    role: 'Contemplado — Consórcio Imóvel',
  },
  {
    text: 'Não acreditava que conseguiria minha moto tão rápido. No 6º mês fui sorteado e hoje já estou rodando sem dever nada.',
    image: 'https://i.pravatar.cc/80?img=60',
    name: 'Rodrigo Pinheiro',
    role: 'Contemplado — Consórcio Moto',
  },
  {
    text: 'A equipe da Porto Vale é diferenciada. Me senti acolhida e com todas as informações claras para tomar a melhor decisão.',
    image: 'https://i.pravatar.cc/80?img=38',
    name: 'Patricia Alves',
    role: 'Contemplada — Consórcio Imóvel',
  },
  {
    text: 'O consórcio foi a saída mais inteligente para conquistar meu apartamento. Planejei, contribuí e realizei. Obrigado Porto Vale!',
    image: 'https://i.pravatar.cc/80?img=22',
    name: 'Bruno Carvalho',
    role: 'Contemplado — Consórcio Imóvel',
  },
];

const col1 = testimonials.slice(0, 4);
const col2 = testimonials.slice(4, 8);
const col3 = testimonials.slice(8, 12);

// ── Cards de vídeo ────────────────────────────────────────────────────────────
const videoCards = [
  { name: 'Davi Araújo',        type: 'Consórcio de Automóvel', icon: 'car',  img: '/imagens/davi-araújo.png'        },
  { name: 'Antonieta Amarante', type: 'Consórcio de Imóvel',    icon: 'home', img: '/imagens/antonieta-amarante.png' },
  { name: 'Brenno Tavares',     type: 'Consórcio de Automóvel', icon: 'car',  img: '/imagens/brenno-tavares.png'     },
  { name: 'Roberto Silva',      type: 'Consórcio de Automóvel', icon: 'car',  img: '/imagens/roberto-silva.png'      },
];

export function NossosClientes() {
  const [hoveredCard, setHoveredCard] = useState(0);

  return (
    <>
      <Header />

      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif" }}>

        {/* ── HERO ── */}
        <section style={{ backgroundColor: '#111827', padding: 'clamp(56px, 10vw, 96px) clamp(24px, 6vw, 96px)', position: 'relative', overflow: 'hidden', borderRadius: '0 0 28px 28px' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,156,222,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <SectionLabel center>Clientes</SectionLabel>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 24px' }}>
              Experiência do{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>Cliente</span>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 1.5vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: '600px', margin: 0 }}>
              A opinião de nossos clientes e parceiros é uma prova de confiança e de reconhecimento do nosso esforço em sempre fazer o melhor para você!
            </p>
          </div>
        </section>

        {/* ── GOOGLE + VÍDEOS ── */}
        <section style={{ backgroundColor: '#fff', padding: '80px 24px 64px' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">

              {/* Texto */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <SectionLabel>Histórias reais</SectionLabel>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 2.8vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                  <span style={{ color: '#111827' }}>Clientes reais,</span><br />
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>conquistas </span>
                  <span style={{ color: '#111827' }}>incríveis!</span>
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7280', lineHeight: 1.7, maxWidth: '420px', marginBottom: '24px' }}>
                  Pessoas reais que realizaram seus sonhos com a Porto Vale. Veja os relatos por trás de nossas{' '}
                  <span style={{ color: '#111827', fontWeight: 500 }}>histórias de sucesso</span> — em vídeo e em texto.
                </p>
                <a
                  href="https://www.youtube.com/@portovaleconsorcio676"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#6B7280', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, padding: '9px 18px', borderRadius: '10px', textDecoration: 'none', border: '1.5px solid #E5E7EB', alignSelf: 'flex-start' }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#9CA3AF"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
                  Ver mais no YouTube
                </a>
              </div>

              {/* Cards de vídeo + CTA YouTube */}
              <div className="hidden lg:flex" style={{ flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'stretch', height: '420px' }}>
                {videoCards.map((t, i) => {
                  const isActive = hoveredCard === i;
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredCard(i)}
                      style={{ flex: isActive ? '3' : '1', borderRadius: '20px', overflow: 'hidden', position: 'relative', transition: 'flex 0.4s ease', cursor: 'pointer', minWidth: 0 }}
                    >
                      <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', top: '14px', right: '14px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {t.icon === 'car' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        )}
                      </div>
                      <div style={{ position: 'absolute', bottom: '56px', left: '18px', opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '4px' }}>{t.name}</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{t.type}</div>
                      </div>
                      <div style={{ position: 'absolute', bottom: '16px', left: isActive ? '18px' : '50%', transform: isActive ? 'none' : 'translateX(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease, left 0.4s ease, transform 0.4s ease' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><path d="M3 2l9 5-9 5V2z"/></svg>
                      </div>
                    </div>
                  );
                })}
              </div>

              </div>

              {/* Mobile: carrossel horizontal */}
              <div className="lg:hidden -mx-4 px-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                <div style={{ display: 'flex', gap: '10px', paddingBottom: '8px' }}>
                  {videoCards.map((t, i) => (
                    <div key={i} style={{ flexShrink: 0, width: '160px', height: '220px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                      <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
                      <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '13px', color: '#fff', marginBottom: '2px' }}>{t.name}</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>{t.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── COLUNAS DE DEPOIMENTOS SCROLLING ── */}
        <section style={{ backgroundColor: '#f8f7f5', padding: '80px 24px', overflow: 'hidden' }}>
          <div className="max-w-7xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '48px' }}
            >
              <SectionLabel>Depoimentos</SectionLabel>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827', marginBottom: '24px' }}>
                O que nossos clientes{' '}
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#2563EB' }}>falam da gente</span>
              </h2>

              {/* Badge Google rating */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: '14px', padding: '12px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <svg width="56" height="19" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                  <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                  <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                  <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                  <path d="M35.29 41.41V32H63c.28 1.45.42 2.95.42 4.7 0 5.87-1.61 13.14-6.79 18.32-5.04 5.21-11.47 7.98-19.99 7.98C19.3 63 5 49.15 5 31.5S19.3 0 36.64 0c8.78 0 15.04 3.45 19.74 7.98l-5.55 5.55c-3.36-3.19-7.98-5.63-14.19-5.63-11.59 0-20.66 9.33-20.66 20.92s9.07 20.92 20.66 20.92c7.52 0 11.81-3.02 14.57-5.79 2.23-2.23 3.7-5.42 4.27-9.74H35.29z" fill="#4285F4"/>
                </svg>
                <div style={{ width: '1px', height: '28px', background: '#E5E7EB' }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '20px', color: '#111827' }}>4,9</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#FBBF24">
                      <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280' }}>3.397 avaliações</span>
              </div>

              {/* CTA Google — logo abaixo do badge */}
              <div style={{ marginTop: '16px' }}>
                <a
                  href="https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TEkzLKk0KTAxYLRSNaiwNElONkk0NDUxSrQwSLJMszKosEgxtDCzTDE0SzY2N0pNNPUSLcgvKslXKEvMSVVIzs8rzi9KzswvBgBMlBdt&q=porto+vale+consorcios&rlz=1C1GCEU_pt-BRBR1162BR1163&oq=porto+vale&gs_lcrp=EgZjaHJvbWUqEAgBEC4YrwEYxwEYgAQYjgUyDggAEEUYJxg5GIAEGIoFMhAIARAuGK8BGMcBGIAEGI4FMgcIAhAAGIAEMgcIAxAAGIAEMgcIBBAAGIAEMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMjY5NWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x94cc4a1542a80b9f:0x8d1869d16c372ea5,1,,,,"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#6B7280', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, padding: '9px 18px', borderRadius: '10px', textDecoration: 'none', border: '1.5px solid #E5E7EB' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Ver todos os comentários no Google
                </a>
              </div>
            </motion.div>

            {/* Colunas com máscara fade top/bottom */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                maxHeight: '720px',
                overflow: 'hidden',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
              }}
            >
              <TestimonialsColumn testimonials={col1} duration={40} />
              <TestimonialsColumn testimonials={col2} duration={50} className="hidden md:block" />
              <TestimonialsColumn testimonials={col3} duration={45} className="hidden lg:block" />
            </div>

          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section style={{ backgroundColor: '#111827', padding: 'clamp(56px, 10vw, 96px) 24px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="max-w-2xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', marginBottom: '16px' }}>
              Pronto para fazer parte{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>dessa história?</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '40px' }}>
              Fale com um consultor e descubra qual consórcio é ideal para o seu objetivo.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#009cde', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, padding: '14px 36px', borderRadius: '12px', textDecoration: 'none', letterSpacing: '0.01em' }}
            >
              Falar com um consultor
            </a>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
