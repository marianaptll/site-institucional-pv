import { Link } from 'react-router';
import logoPortoBank from '../../assets/logo-portobank.png';
import { WHATSAPP_URL } from '../constants';

function FooterLink({ to, className, style, children }: { to: string; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <Link to={to} className={className} style={style} onClick={() => window.scrollTo(0, 0)}>
      {children}
    </Link>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="px-4 sm:px-8 lg:px-16 transition-colors duration-300"
      style={{ backgroundColor: '#0D1117' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Topo — marca + CTA */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-5 py-8 sm:py-10 border-b border-[#1F2937]">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="/imagens/logo-portovale-branco.png"
              alt="Porto Vale Consórcios"
              style={{ height: '28px', width: 'auto' }}
            />
            <div style={{ width: '1px', height: '24px', backgroundColor: '#1F2937' }} />
            <img
              src={logoPortoBank}
              alt="Porto Bank"
              style={{ height: '28px', width: 'auto', opacity: 0.85 }}
            />
          </div>
          <div className="flex items-center gap-4 sm:gap-5">
            <style>{`
              .footer-social { display:flex; flex-direction:column; align-items:center; text-decoration:none; position:relative; }
              .footer-social .ic { width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); backdrop-filter:blur(4px); transition:all 0.3s ease; position:relative; }
              .footer-social .ic::before { content:''; position:absolute; inset:0; border-radius:50%; background:radial-gradient(circle at center,rgba(255,255,255,0.3) 0%,transparent 70%); opacity:0; transition:opacity 0.3s ease; }
              .footer-social:hover .ic { transform:translateY(-8px) scale(1.1); }
              .footer-social:hover .ic::before { opacity:1; }
              .footer-social:hover svg { animation:footerShake 0.5s; }
              .footer-social.fs-facebook:hover .ic { background:#1877F2; box-shadow:0 0 20px rgba(24,119,242,0.6); }
              .footer-social.fs-instagram:hover .ic { background:radial-gradient(circle at 30% 107%,#fdf497 0%,#fd5949 45%,#d6249f 60%,#285AEB 90%); box-shadow:0 0 20px rgba(214,36,159,0.6); }
              .footer-social.fs-youtube:hover .ic { background:#FF0000; box-shadow:0 0 20px rgba(255,0,0,0.6); }
              .footer-social.fs-linkedin:hover .ic { background:#0077B5; box-shadow:0 0 20px rgba(0,119,181,0.6); }
              @keyframes footerShake { 0%,100%{transform:rotate(0)} 20%{transform:rotate(-8deg)} 40%{transform:rotate(8deg)} 60%{transform:rotate(-8deg)} 80%{transform:rotate(8deg)} }
            `}</style>

            {/* Facebook */}
            <a href="https://www.facebook.com/portovaleconsorcios?locale=pt_BR" target="_blank" rel="noopener noreferrer" className="footer-social fs-facebook">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/portovaleconsorcio?igsh=ZGl0Y3RzejU5OHlz" target="_blank" rel="noopener noreferrer" className="footer-social fs-instagram">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
            </a>

            {/* YouTube */}
            <a href="https://www.youtube.com/@portovaleconsorcio676" target="_blank" rel="noopener noreferrer" className="footer-social fs-youtube">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/portovaleconsorcio/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="footer-social fs-linkedin">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
            </a>
          </div>
        </div>

        {/* Sitemap — 5 colunas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-6 sm:gap-x-8 sm:gap-y-8 lg:gap-x-10 py-8 sm:py-12 border-b border-[#1F2937]">

          {/* Institucional */}
          <div>
            <h4 className="text-[11px] text-[#4B5563] uppercase tracking-widest mb-3 sm:mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              Institucional
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: 'Sobre a Porto Vale',       to: '/sobre-nos' },
                { label: 'Nossa cultura',             to: '/nossa-cultura' },
                { label: 'Trabalhe conosco',          to: '/trabalhe-conosco' },
                { label: 'Nossos clientes',           to: '/nossos-clientes' },
                { label: 'Portal do colaborador',     to: null, href: 'https://portal.portovaleconsorcio.com.br/' },
                { label: 'Portal de transparência',   to: '/portal-transparencia', href: undefined },
              ].map(({ label, to, href }: { label: string; to: string | null; href?: string }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#6B7280] hover:text-white transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}>
                      {label}
                    </a>
                  ) : to ? (
                    <FooterLink to={to} className="text-[13px] text-[#6B7280] hover:text-white transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}>
                      {label}
                    </FooterLink>
                  ) : (
                    <span className="text-[13px] text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Conteúdo */}
          <div>
            <h4 className="text-[11px] text-[#4B5563] uppercase tracking-widest mb-3 sm:mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              Conteúdo
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: 'Artigos sobre consórcios', to: '/artigos' },
                { label: 'Guia do Consórcio',        to: '/guia-do-consorcio' },
              ].map(({ label, to }) => (
                <li key={label}>
                  {to ? (
                    <FooterLink to={to} className="text-[13px] text-[#6B7280] hover:text-white transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}>
                      {label}
                    </FooterLink>
                  ) : (
                    <span className="text-[13px] text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h4 className="text-[11px] text-[#4B5563] uppercase tracking-widest mb-3 sm:mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              Atendimento
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <FooterLink to="/contato" className="text-[13px] text-[#6B7280] hover:text-white transition-colors duration-200 font-medium" style={{ fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}>
                  Fale conosco e filiais
                </FooterLink>
              </li>
              <li>
                <span className="text-[13px] text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  WhatsApp:{' '}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
                    falar agora
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Produtos col 1 */}
          <div>
            <h4 className="text-[11px] text-[#4B5563] uppercase tracking-widest mb-3 sm:mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              Imóveis
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-8">
              {[
                { label: 'Consórcio de imóvel',    to: '/consorcio-imovel' },
                { label: 'Construção e reforma',   to: '/consorcio-construcao-reforma' },
                { label: 'Consórcio para terreno', to: '/consorcio-terreno' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <FooterLink to={to} className="text-[13px] text-[#6B7280] hover:text-white transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}>
                    {label}
                  </FooterLink>
                </li>
              ))}
            </ul>
            <h4 className="text-[11px] text-[#4B5563] uppercase tracking-widest mb-3 sm:mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              Veículos
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: 'Consórcio de automóvel', to: '/consorcio-automovel' },
                { label: 'Consórcio de pesados',   to: '/consorcio-pesados' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <FooterLink to={to} className="text-[13px] text-[#6B7280] hover:text-white transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}>
                    {label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Produtos col 2 */}
          <div>
            <h4 className="text-[11px] text-[#4B5563] uppercase tracking-widest mb-3 sm:mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              Investimento
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: 'Consórcio como investimento', to: '/consorcio-investimento' },
                { label: 'Consórcio empresarial',       to: '/consorcio-empresarial' },
                { label: 'Consórcio agro',              to: '/consorcio-agro' },
                { label: 'Consórcio placa solar',       to: '/consorcio-placa-solar' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <FooterLink to={to} className="text-[13px] text-[#6B7280] hover:text-white transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}>
                    {label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Selos de aprovação */}
        <div className="py-8 border-b border-[#1F2937] flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">

          {/* Selo Banco Central */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', backgroundColor: '#161D2A', border: '1px solid #1F2937', borderRadius: '14px', padding: '14px 20px' }}>
            <img src="/imagens/logo-bancocentral.png" alt="Banco Central do Brasil" style={{ height: '34px', width: 'auto', objectFit: 'contain', opacity: 0.9 }} />
            <div style={{ width: '1px', height: '34px', backgroundColor: '#1F2937' }} />
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '11px', color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                Regulado pelo Banco Central
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B7280' }}>
                Instituição autorizada e fiscalizada pelo BCB
              </p>
            </div>
          </div>

          {/* Selo ABAC */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', backgroundColor: '#161D2A', border: '1px solid #1F2937', borderRadius: '14px', padding: '14px 20px' }}>
            <img src="/imagens/selo-abac-branco.png" alt="ABAC — Associação Brasileira de Administradoras de Consórcios" style={{ height: '34px', width: 'auto', objectFit: 'contain', opacity: 0.9 }} />
            <div style={{ width: '1px', height: '34px', backgroundColor: '#1F2937' }} />
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '11px', color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                Associado ABAC
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B7280' }}>
                Associação Brasileira de Consórcios
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
              &copy; {currentYear} Porto Vale Consórcios
            </p>
            <p className="text-[11px] text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
              CNPJ 07.081.058/0001-56 &nbsp;·&nbsp; SUSEP n° 202089657
            </p>
          </div>
          <p className="text-[11px] text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Autorizado e fiscalizado pela SUSEP e Banco Central do Brasil
          </p>
        </div>

      </div>
    </footer>
  );
}
