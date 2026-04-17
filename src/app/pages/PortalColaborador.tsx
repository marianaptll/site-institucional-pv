import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { SectionLabel } from '../components/SectionLabel';

export function PortalColaborador() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '68px', fontFamily: "'Inter', sans-serif", minHeight: '80vh' }}>

        {/* Hero */}
        <section style={{ backgroundColor: '#111827', padding: 'clamp(64px, 12vw, 120px) 24px', textAlign: 'center' }}>
          <div className="max-w-3xl mx-auto">
            <SectionLabel center>Área restrita</SectionLabel>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 20px' }}>
              Portal do{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#009cde' }}>
                Colaborador
              </span>
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
              Página em construção. Em breve você terá acesso a ferramentas, comunicados e recursos exclusivos para colaboradores Porto Vale.
            </p>
          </div>
        </section>

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
