import { Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';
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

// Lazy load: páginas institucionais
const SobreNos            = lazy(() => import('./pages/SobreNos').then(m => ({ default: m.SobreNos })));
const NossaCultura        = lazy(() => import('./pages/NossaCultura').then(m => ({ default: m.NossaCultura })));
const TrabalheConosco     = lazy(() => import('./pages/TrabalheConosco').then(m => ({ default: m.TrabalheConosco })));
const NossosClientes      = lazy(() => import('./pages/NossosClientes').then(m => ({ default: m.NossosClientes })));
const Contato             = lazy(() => import('./pages/Contato').then(m => ({ default: m.Contato })));
const GuiaConsorcio       = lazy(() => import('./pages/GuiaConsorcio').then(m => ({ default: m.GuiaConsorcio })));
const PortalColaborador   = lazy(() => import('./pages/PortalColaborador').then(m => ({ default: m.PortalColaborador })));
const PortalTransparencia = lazy(() => import('./pages/PortalTransparencia').then(m => ({ default: m.PortalTransparencia })));
const Artigos             = lazy(() => import('./pages/Artigos').then(m => ({ default: m.Artigos })));

// Lazy load: páginas de produto (todas do mesmo chunk — Vite de-duplica o módulo)
const ConsorcioImovel            = lazy(() => import('./pages/Produtos').then(m => ({ default: m.ConsorcioImovel })));
const ConsorcioTerreno           = lazy(() => import('./pages/Produtos').then(m => ({ default: m.ConsorcioTerreno })));
const ConsorcioConstrucaoReforma = lazy(() => import('./pages/Produtos').then(m => ({ default: m.ConsorcioConstrucaoReforma })));
const ConsorcioAutomovel         = lazy(() => import('./pages/Produtos').then(m => ({ default: m.ConsorcioAutomovel })));
const ConsorcioPesados           = lazy(() => import('./pages/Produtos').then(m => ({ default: m.ConsorcioPesados })));
const ConsorcioAgro              = lazy(() => import('./pages/Produtos').then(m => ({ default: m.ConsorcioAgro })));
const ConsorcioInvestimento      = lazy(() => import('./pages/Produtos').then(m => ({ default: m.ConsorcioInvestimento })));
const ConsorcioPlacaSolar        = lazy(() => import('./pages/Produtos').then(m => ({ default: m.ConsorcioPlacaSolar })));
const ConsorcioEmpresarial       = lazy(() => import('./pages/Produtos').then(m => ({ default: m.ConsorcioEmpresarial })));

function HomePage() {
  return (
    <div
      className="min-h-screen bg-[#F9FAFB]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Header />
      <main>
        <HeroSection />
        <div className="rounded-2xl sm:rounded-[32px] lg:rounded-[46px]" style={{ backgroundColor: '#eeebe6', marginTop: '-100px', position: 'relative', zIndex: 10 }}>
          <WhatIsConsorcioSection />
          <BenefitsSection />
        </div>
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

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%',
        border: '3px solid #E5E7EB',
        borderTopColor: '#009cde',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/nossa-cultura" element={<NossaCultura />} />
        <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="/nossos-clientes" element={<NossosClientes />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/guia-do-consorcio" element={<GuiaConsorcio />} />
        <Route path="/portal-colaborador" element={<PortalColaborador />} />
        <Route path="/portal-transparencia" element={<PortalTransparencia />} />
        <Route path="/artigos" element={<Artigos />} />
        <Route path="/consorcio-imovel"             element={<ConsorcioImovel />} />
        <Route path="/consorcio-terreno"            element={<ConsorcioTerreno />} />
        <Route path="/consorcio-construcao-reforma" element={<ConsorcioConstrucaoReforma />} />
        <Route path="/consorcio-automovel"          element={<ConsorcioAutomovel />} />
        <Route path="/consorcio-pesados"            element={<ConsorcioPesados />} />
        <Route path="/consorcio-agro"               element={<ConsorcioAgro />} />
        <Route path="/consorcio-investimento"       element={<ConsorcioInvestimento />} />
        <Route path="/consorcio-placa-solar"        element={<ConsorcioPlacaSolar />} />
        <Route path="/consorcio-empresarial"        element={<ConsorcioEmpresarial />} />
      </Routes>
    </Suspense>
  );
}
