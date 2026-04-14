import { Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PortoValeSection } from './components/PortoValeSection';
import { BenefitsSection } from './components/BenefitsSection';
import { ComparisonSimulatorSection } from './components/ComparisonSimulatorSection';
import { FAQSection } from './components/FAQSection';
import { CTABanner } from './components/CTABanner';
import { Footer } from './components/Footer';
import { WhatIsConsorcioSection } from './components/WhatIsConsorcioSection';
import { ScrollReveal } from './components/ScrollReveal';
import { VendedoresSection } from './components/VendedoresSection';
import { MidiaSection } from './components/MidiaSection';
import { ProvaSection } from './components/ProvaSection';
import { ChatWidget } from './components/ChatWidget';
import { SobreNos } from './pages/SobreNos';
import { NossaCultura } from './pages/NossaCultura';
import { TrabalheConosco } from './pages/TrabalheConosco';
import { NossosClientes } from './pages/NossosClientes';
import { Contato } from './pages/Contato';

function HomePage() {
  return (
    <div
      className="min-h-screen bg-[#F9FAFB]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Header />
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* Shape cinza que cobre WhatIsConsorcio + Benefits */}
        <ScrollReveal>
          <div
            style={{
              backgroundColor: '#eeebe6',
              borderRadius: '46px',
              marginTop: '-100px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* 2. O que é consórcio */}
            <WhatIsConsorcioSection />
            {/* 3. Benefícios / diferenciais */}
            <BenefitsSection />
          </div>
        </ScrollReveal>

        {/* 4. Comparativo + Simulador */}
        <ScrollReveal delay={0.05}>
          <ComparisonSimulatorSection />
        </ScrollReveal>

        {/* 5. Porto Vale — Prova social + Nossos números */}
        <ScrollReveal delay={0.05}>
          <PortoValeSection />
        </ScrollReveal>

        {/* 6. Na mídia */}
        <ScrollReveal delay={0.05}>
          <MidiaSection />
        </ScrollReveal>

        {/* 7. Prova social — depoimentos */}
        <ScrollReveal delay={0.05}>
          <ProvaSection />
        </ScrollReveal>

        {/* 8. Especialistas — shape cinza */}
        <ScrollReveal delay={0.05}>
          <div style={{ backgroundColor: '#eeebe6', borderRadius: '46px' }}>
            <VendedoresSection />
          </div>
        </ScrollReveal>

        {/* 9. FAQ */}
        <ScrollReveal delay={0.05}>
          <FAQSection />
        </ScrollReveal>

        {/* 10. CTA final */}
        <ScrollReveal delay={0.05}>
          <CTABanner />
        </ScrollReveal>
      </main>
      {/* 11. Footer */}
      <Footer />

      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre-nos" element={<SobreNos />} />
      <Route path="/nossa-cultura" element={<NossaCultura />} />
      <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
      <Route path="/nossos-clientes" element={<NossosClientes />} />
      <Route path="/contato" element={<Contato />} />
    </Routes>
  );
}
