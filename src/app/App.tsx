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
        <HeroSection />
        <ScrollReveal>
          <div className="rounded-2xl sm:rounded-[32px] lg:rounded-[46px]" style={{ backgroundColor: '#eeebe6', marginTop: '-100px', position: 'relative', zIndex: 10 }}>
            <WhatIsConsorcioSection />
            <BenefitsSection />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.05}><ComparisonSimulatorSection /></ScrollReveal>
        <ScrollReveal delay={0.05}><PortoValeSection /></ScrollReveal>
        <ScrollReveal delay={0.05}><MidiaSection /></ScrollReveal>
        <ScrollReveal delay={0.05}><ProvaSection /></ScrollReveal>
        <ScrollReveal delay={0.05}>
          <div className="rounded-2xl sm:rounded-[32px] lg:rounded-[46px]" style={{ backgroundColor: '#eeebe6' }}>
            <VendedoresSection />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.05}><FAQSection /></ScrollReveal>
        <ScrollReveal delay={0.05}><CTABanner /></ScrollReveal>
      </main>
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
