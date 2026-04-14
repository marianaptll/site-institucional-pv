import { Menu, X, ChevronDown, Home, Car, Truck, Building2, Sprout, TrendingUp, Zap, Briefcase, Users, Heart, Globe, Handshake, Phone, Info, MessageCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import portoValeLogo from '../../assets/logo-portovale.png';
import { WHATSAPP_URL } from '../constants';

const BLUE = '#009cde';

interface DropdownItem {
  icon: React.ElementType;
  label: string;
  sectionId?: string;
  href?: string;
}

interface NavDropdown {
  id: string;
  label: string;
  items: DropdownItem[];
}

const navDropdowns: NavDropdown[] = [
  {
    id: 'imoveis',
    label: 'Consórcio de Imóveis',
    items: [
      { icon: Home,      label: 'Imóvel',              sectionId: 'tipos' },
      { icon: Globe,     label: 'Terreno',              sectionId: 'tipos' },
      { icon: Building2, label: 'Construção e Reforma', sectionId: 'tipos' },
    ],
  },
  {
    id: 'automoveis',
    label: 'Consórcio de Automóveis',
    items: [
      { icon: Car,   label: 'Automóvel', sectionId: 'tipos' },
      { icon: Truck, label: 'Pesados',   sectionId: 'tipos' },
    ],
  },
  {
    id: 'outros',
    label: 'Outros Consórcios',
    items: [
      { icon: Sprout,     label: 'Agro',        sectionId: 'tipos' },
      { icon: TrendingUp, label: 'Investimento', sectionId: 'tipos' },
      { icon: Zap,        label: 'Placa Solar',  sectionId: 'tipos' },
      { icon: Briefcase,  label: 'Empresarial',  sectionId: 'tipos' },
    ],
  },
  {
    id: 'portovale',
    label: 'A Porto Vale',
    items: [
      { icon: Info,      label: 'Sobre Nós',       href: '/sobre-nos' },
      { icon: Heart,     label: 'Nossa Cultura',   href: '/nossa-cultura' },
      { icon: Users,     label: 'Nossos Clientes', href: '/nossos-clientes' },
      { icon: Handshake, label: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
      { icon: Phone,     label: 'Contato',          href: '/contato' },
    ],
  },
];

function DropdownMenu({
  dropdown,
  onNavigate,
  onNavigatePage,
}: {
  dropdown: NavDropdown;
  onNavigate: (id?: string) => void;
  onNavigatePage: (href: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-[13.5px] transition-colors duration-200 py-1 text-[#374151] hover:text-[#111827]"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          color: open ? BLUE : undefined,
        }}
        aria-expanded={open}
      >
        {dropdown.label}
        <ChevronDown
          size={14}
          style={{
            color: BLUE,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl z-50"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            minWidth: '210px',
          }}
        >
          {/* Triangle pointer */}
          <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-t border-l border-[#E5E7EB]" />

          <div className="p-2">
            {dropdown.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (item.href) { onNavigatePage(item.href); }
                    else { onNavigate(item.sectionId); }
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150 hover:bg-[#E8F7FD] group"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#E8F7FD' }}
                  >
                    <Icon size={14} style={{ color: BLUE }} />
                  </div>
                  <span
                    className="text-[13px] text-[#111827] truncate"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  const scrollToSection = (id?: string) => {
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setMobileOpen(null);
  };

  const navigatePage = (href: string) => {
    navigate(href);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setMobileOpen(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center h-[68px]">

          {/* ── Logo ── */}
          <button
            onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
            className="flex-shrink-0 bg-transparent border-0 p-0 cursor-pointer"
          >
            <img
              src={portoValeLogo}
              alt="Porto Vale Consórcio"
              className="h-10 w-auto object-contain"
            />
          </button>

          {/* ── Desktop Dropdowns ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navDropdowns.map((dd) => (
              <div key={dd.id} className="px-2">
                <DropdownMenu dropdown={dd} onNavigate={scrollToSection} onNavigatePage={navigatePage} />
              </div>
            ))}
          </nav>

          {/* ── Mobile hamburger ── */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#374151]"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav ── */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[#E5E7EB] max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navDropdowns.map((dd) => (
                <div key={dd.id} className="flex flex-col">
                  <button
                    className="flex items-center justify-between w-full px-2 py-3 rounded-lg text-left hover:bg-[#F9FAFB] transition-colors duration-150"
                    onClick={() => setMobileOpen(mobileOpen === dd.id ? null : dd.id)}
                  >
                    <span
                      className="text-[14px] text-[#111827]"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                    >
                      {dd.label}
                    </span>
                    <ChevronDown
                      size={15}
                      style={{
                        color: BLUE,
                        transition: 'transform 0.2s',
                        transform: mobileOpen === dd.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>

                  {mobileOpen === dd.id && (
                    <div className="ml-3 mb-2 flex flex-col gap-1">
                      {dd.items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={i}
                            onClick={() => item.href ? navigatePage(item.href) : scrollToSection(item.sectionId)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-[#E8F7FD] transition-colors duration-150"
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: '#E8F7FD' }}
                            >
                              <Icon size={13} style={{ color: BLUE }} />
                            </div>
                            <span
                              className="text-[13px] text-[#374151]"
                              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                            >
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {/* WhatsApp mobile */}
              <a
                id="cta-mobile-whatsapp"
                data-tracking="mobile_menu_whatsapp_click"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-3 mx-2 rounded-xl transition-colors duration-150"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  height: '48px',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={17} />
                Falar com especialista via WhatsApp
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
