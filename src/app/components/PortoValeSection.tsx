import { NumerosBar } from './NumerosBar';

export function PortoValeSection() {
  return (
    <section
      style={{
        backgroundColor: '#111827',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Detalhe decorativo de fundo */}
      <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,85,196,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '80px', left: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,156,222,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16" style={{ paddingTop: '96px', paddingBottom: '0px' }}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Esquerda: Vídeo */}
          <div style={{ position: 'relative' }}>
            {/* Borda decorativa — oculta no mobile para evitar overflow */}
            <div className="hidden lg:block" style={{ position: 'absolute', top: '20px', left: '20px', right: '-20px', bottom: '-20px', borderRadius: '20px', border: '1.5px solid rgba(0,85,196,0.45)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/imagens/fachada-pv.png"
                onError={e => {
                  const v = e.currentTarget;
                  const img = document.createElement('img');
                  img.src = '/imagens/fachada-pv.png';
                  img.style.cssText = 'width:100%;height:320px;object-fit:cover;display:block;';
                  v.parentNode?.replaceChild(img, v);
                }}
                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
              >
                <source src="https://awxqeqjaatuacnqlvxcw.supabase.co/storage/v1/object/public/videos-projeto/video-fachada2.mp4" type="video/mp4" />
              </video>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, rgba(17,24,39,0.6), transparent)' }} />
            </div>
            {/* Badge "18 anos" — reposicionado para não vazar no mobile */}
            <div className="hidden sm:flex" style={{ position: 'absolute', top: '-20px', right: '-12px', zIndex: 2, background: '#fff', borderRadius: '16px', padding: '18px 22px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', alignItems: 'center', gap: '12px', minWidth: '180px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '40px', lineHeight: 1, color: '#0055c4' }}>18</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>Anos de<br />Experiência</span>
            </div>
            {/* Badge "18 anos" versão mobile inline */}
            <div className="sm:hidden flex items-center gap-3 mt-4 bg-white rounded-2xl px-5 py-4" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.14)' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '36px', lineHeight: 1, color: '#0055c4' }}>18</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>Anos de Experiência</span>
            </div>
          </div>

          {/* Direita: Texto */}
          <div style={{ paddingBottom: '0px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', marginBottom: '24px' }}>
              Porto Vale:{' '}
              <span style={{ display: 'block', fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>a maior corretora</span>
              <span style={{ display: 'block', color: '#fff' }}>de consórcios do Brasil.</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: '420px', marginBottom: '40px' }}>
              A Porto Vale é referência em consórcio Porto Seguro, unindo inovação, segurança e excelência para transformar sonhos em realidade.
            </p>
            <a
              href="#"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px', fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, color: '#009cde', textDecoration: 'none', borderBottom: '1px solid rgba(0,156,222,0.4)', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#009cde'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,156,222,0.4)'; }}
            >
              Conheça nossa história
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)' }} />
          </div>
        </div>
      </div>

      {/* Barra de números */}
      <NumerosBar />
    </section>
  );
}
