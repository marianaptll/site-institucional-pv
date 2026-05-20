import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, Home, MapPin, Hammer, Car, Truck, Sprout, TrendingUp, Sun, Briefcase, ChevronRight } from 'lucide-react';

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tab = 'credito' | 'parcelas';
type Step = 'produto' | 'formulario' | 'sucesso';

const PRODUCTS = [
  {
    id: 'imovel',       label: 'Imóvel',              fullLabel: 'Consórcio de Imóvel',        Icon: Home,
    minC: 100000, maxC: 1000000, stepC: 10000, minP: 500,  maxP: 8000,  stepP: 100,
    idleAnimate:  { y: [0, -5, 0] },           idleTransition:  { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { y: [0, -9, 0] },           hoverTransition: { duration: 0.55, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'automovel',    label: 'Automóvel',           fullLabel: 'Consórcio de Automóvel',      Icon: Car,
    minC: 30000,  maxC: 200000,  stepC: 5000,  minP: 200,  maxP: 2000,  stepP: 50,
    idleAnimate:  { x: [0, 5, -2, 0] },        idleTransition:  { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { x: [0, 9, -4, 0] },        hoverTransition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'terreno',      label: 'Terreno',             fullLabel: 'Consórcio de Terreno',        Icon: MapPin,
    minC: 50000,  maxC: 500000,  stepC: 5000,  minP: 300,  maxP: 4000,  stepP: 50,
    idleAnimate:  { scale: [1, 1.18, 1] },     idleTransition:  { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { scale: [1, 1.35, 1] },     hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'reforma',      label: 'Construção',          fullLabel: 'Construção e Reforma',        Icon: Hammer,
    minC: 30000,  maxC: 300000,  stepC: 5000,  minP: 200,  maxP: 3000,  stepP: 50,
    idleAnimate:  { rotate: [-12, 12, -12] },  idleTransition:  { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { rotate: [-20, 20, -20] },  hoverTransition: { duration: 0.55, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'pesados',      label: 'Pesados',             fullLabel: 'Consórcio de Pesados',        Icon: Truck,
    minC: 100000, maxC: 1000000, stepC: 10000, minP: 500,  maxP: 8000,  stepP: 100,
    idleAnimate:  { x: [0, 6, 0] },            idleTransition:  { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { x: [0, 11, 0] },           hoverTransition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'agro',         label: 'Agro',                fullLabel: 'Consórcio Agro',              Icon: Sprout,
    minC: 50000,  maxC: 500000,  stepC: 5000,  minP: 300,  maxP: 5000,  stepP: 50,
    idleAnimate:  { scale: [1, 1.14, 1], rotate: [0, 6, -6, 0] }, idleTransition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { scale: [1, 1.28, 1], rotate: [0, 12, -12, 0] }, hoverTransition: { duration: 0.55, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'investimento', label: 'Investimento',        fullLabel: 'Consórcio como Investimento', Icon: TrendingUp,
    minC: 30000,  maxC: 500000,  stepC: 5000,  minP: 200,  maxP: 4000,  stepP: 50,
    idleAnimate:  { y: [0, -5, 0] },           idleTransition:  { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
    hoverAnimate: { y: [0, -9, 0] },           hoverTransition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'solar',        label: 'Placa Solar',         fullLabel: 'Consórcio de Placa Solar',    Icon: Sun,
    minC: 15000,  maxC: 150000,  stepC: 1000,  minP: 100,  maxP: 1500,  stepP: 25,
    idleAnimate:  { rotate: [0, 360] },        idleTransition:  { duration: 8, repeat: Infinity, ease: 'linear' },
    hoverAnimate: { rotate: [0, 360] },        hoverTransition: { duration: 2, repeat: Infinity, ease: 'linear' },
  },
  {
    id: 'empresarial',  label: 'Empresarial',         fullLabel: 'Consórcio Empresarial',       Icon: Briefcase,
    minC: 100000, maxC: 2000000, stepC: 10000, minP: 500,  maxP: 15000, stepP: 100,
    idleAnimate:  { y: [0, -4, 0] },           idleTransition:  { duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
    hoverAnimate: { y: [0, -8, 0] },           hoverTransition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
  },
];

type Product = typeof PRODUCTS[number];

const FEATURED_IDS = ['imovel', 'automovel'];
const featuredProducts  = PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));
const secondaryProducts = PRODUCTS.filter(p => !FEATURED_IDS.includes(p.id));

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: '10px',
  color: '#9ca3af',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '8px',
};

function ProductCard({ product, onSelect, featured = false }: { product: Product; onSelect: () => void; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = product.Icon;

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      whileTap={{ scale: 0.96 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '11px 14px',
        borderRadius: '12px',
        border: `1.5px solid ${hovered ? '#009cde' : 'transparent'}`,
        backgroundColor: hovered ? '#EFF8FE' : '#ffffff',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        transition: 'background-color 0.22s ease, border-color 0.22s ease',
      }}
      className="sm:flex-col sm:items-center sm:justify-center sm:text-center sm:gap-2 sm:p-4 sm:h-[100px]"
    >
      <div
        style={{
          width: '40px', height: '40px',
          borderRadius: '10px', flexShrink: 0,
          backgroundColor: hovered ? '#C5E8F8' : '#EFF8FE',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background-color 0.3s ease',
        }}
        className="sm:w-12 sm:h-12 sm:rounded-xl"
      >
        <motion.div
          animate={hovered ? product.hoverAnimate : product.idleAnimate}
          transition={hovered ? product.hoverTransition : product.idleTransition}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon size={22} color="#0055c4" />
        </motion.div>
      </div>

      <span
        style={{
          flex: 1,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '13px',
          color: hovered ? '#0055c4' : '#111827',
          lineHeight: 1.3,
          transition: 'color 0.22s ease',
        }}
        className="sm:flex-none sm:text-center sm:leading-tight"
      >
        <span className="sm:hidden">{product.fullLabel}</span>
        <span className="hidden sm:inline">{product.label}</span>
      </span>

      <ChevronRight
        size={15}
        color={hovered ? 'rgba(255,255,255,0.7)' : '#9ca3af'}
        className="sm:hidden flex-shrink-0"
        style={{ transition: 'color 0.22s ease' }}
      />
    </motion.button>
  );
}

function ProductListItem({ product, onSelect }: { product: Product; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const Icon = product.Icon;

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '9px 12px', borderRadius: '10px',
        border: `1.5px solid ${hovered ? '#009cde' : 'transparent'}`,
        backgroundColor: hovered ? '#EFF8FE' : '#ffffff',
        cursor: 'pointer', width: '100%', textAlign: 'left',
        transition: 'background-color 0.18s ease, border-color 0.18s ease',
      }}
    >
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
        backgroundColor: hovered ? '#C5E8F8' : '#EFF8FE',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background-color 0.18s ease',
      }}>
        <motion.div
          animate={hovered ? product.hoverAnimate : product.idleAnimate}
          transition={hovered ? product.hoverTransition : product.idleTransition}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon size={15} color="#0055c4" />
        </motion.div>
      </div>
      <span style={{
        flex: 1,
        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px',
        color: hovered ? '#0055c4' : '#374151',
        transition: 'color 0.18s ease',
      }}>
        {product.label}
      </span>
      <ChevronRight size={14} color={hovered ? '#0055c4' : '#d1d5db'} style={{ transition: 'color 0.18s ease' }} />
    </motion.button>
  );
}

export function SimulacaoModal({ open, onClose }: Props) {
  const [step, setStep]       = useState<Step>('produto');
  const [produto, setProduto] = useState<Product | null>(null);
  const [tab, setTab]         = useState<Tab>('parcelas');
  const [valor, setValor]     = useState(1500);
  const [nome, setNome]       = useState('');
  const [telefone, setTelefone] = useState('');

  const formatValue = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const defaultValor = (p: Product, t: Tab) =>
    t === 'parcelas'
      ? p.minP + Math.round((p.maxP - p.minP) * 0.25 / p.stepP) * p.stepP
      : p.minC + Math.round((p.maxC - p.minC) * 0.25 / p.stepC) * p.stepC;

  const handleSelectProduto = (p: Product) => {
    setProduto(p);
    setTab('parcelas');
    setValor(defaultValor(p, 'parcelas'));
    setStep('formulario');
  };

  const handleTabChange = (t: Tab) => {
    if (!produto) return;
    setTab(t);
    setValor(defaultValor(produto, t));
  };

  const handleEnviar = () => {
    if (!nome.trim() || telefone.replace(/\D/g, '').length < 10) return;
    setStep('sucesso');
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('produto');
      setProduto(null);
      setNome('');
      setTelefone('');
    }, 400);
  };

  const min         = produto ? (tab === 'parcelas' ? produto.minP : produto.minC) : 500;
  const max         = produto ? (tab === 'parcelas' ? produto.maxP : produto.maxC) : 5000;
  const stepSlider  = produto ? (tab === 'parcelas' ? produto.stepP : produto.stepC) : 50;
  const pct         = Math.min(100, Math.max(0, ((valor - min) / (max - min)) * 100));
  const stepIndex   = step === 'produto' ? 0 : 1;
  const ProdIcon    = produto?.Icon;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(0,30,80,0.75)',
              backdropFilter: 'blur(4px)',
              zIndex: 10000,
            }}
          />

          {/* Modal */}
          <div style={{
            position: 'fixed', inset: 0,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            pointerEvents: 'none',
          }}>
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ pointerEvents: 'all' }}
              className="w-full max-w-[480px] sm:max-w-[580px]"
            >
              <div style={{
                backgroundColor: step === 'sucesso' ? '#fff' : '#F1F3F5',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: step === 'sucesso' ? '0 24px 64px rgba(0,0,0,0.18)' : '0 24px 64px rgba(0,0,0,0.25)',
                border: step === 'sucesso' ? '2px solid #009cde' : 'none',
                position: 'relative',
              }}>

                {/* Header: dots + close */}
                <div style={{
                  display: step === 'sucesso' ? 'none' : 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px 0',
                }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {[0, 1].map(i => (
                      <motion.div
                        key={i}
                        animate={{ width: i === stepIndex ? 20 : 8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        style={{
                          height: '8px',
                          borderRadius: '999px',
                          backgroundColor: i <= stepIndex ? '#009cde' : '#e5e7eb',
                        }}
                      />
                    ))}
                  </div>
                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.12)' }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '50%',
                      width: '32px', height: '32px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <X size={16} color="#374151" />
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">

                  {/* ── PASSO 1: ESCOLHA O PRODUTO ── */}
                  {step === 'produto' && (
                    <motion.div
                      key="produto"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.22 }}
                      style={{ padding: '16px 20px 24px' }}
                    >
                      <h2 style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700, fontSize: '18px',
                        color: '#111827', marginBottom: '3px',
                      }}>
                        Vamos começar!
                      </h2>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
                        Qual consórcio você quer simular?
                      </p>

                      {/* Mobile: lista com featured primeiro */}
                      <div className="sm:hidden flex flex-col gap-2" style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '2px' }}>
                        {[...featuredProducts, ...secondaryProducts].map(p => (
                          <ProductCard key={p.id} product={p} onSelect={() => handleSelectProduto(p)} />
                        ))}
                      </div>

                      {/* Desktop: featured cards + lista secundária */}
                      <div className="hidden sm:block">
                        <p style={SECTION_LABEL_STYLE}>Mais procurados</p>
                        <div className="grid grid-cols-2 gap-3" style={{ marginBottom: '16px' }}>
                          {featuredProducts.map(p => (
                            <ProductCard key={p.id} product={p} onSelect={() => handleSelectProduto(p)} featured />
                          ))}
                        </div>
                        <p style={SECTION_LABEL_STYLE}>Outros consórcios</p>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                          {secondaryProducts.map(p => (
                            <ProductListItem key={p.id} product={p} onSelect={() => handleSelectProduto(p)} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── PASSO 2: SIMULADOR + DADOS ── */}
                  {step === 'formulario' && produto && (
                    <motion.div
                      key="formulario"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.22 }}
                      style={{ padding: '16px 20px 24px', maxHeight: 'calc(85vh - 80px)', overflowY: 'auto' }}
                    >
                      <button
                        onClick={() => setStep('produto')}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontFamily: "'Inter', sans-serif", fontSize: '12px',
                          color: '#6b7280', marginBottom: '14px', padding: 0,
                        }}
                      >
                        <ArrowLeft size={13} /> Voltar
                      </button>

                      <h2 style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700, fontSize: '18px',
                        color: '#111827', marginBottom: '3px',
                      }}>
                        Quase lá!
                      </h2>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
                        Preencha os dados e receba sua simulação.
                      </p>

                      {/* Produto selecionado */}
                      {ProdIcon && (
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: '7px',
                          backgroundColor: '#f0f9ff', borderRadius: '999px',
                          padding: '6px 12px', marginBottom: '20px',
                          border: '1px solid #e0f4fb',
                        }}>
                          <ProdIcon size={13} color="#0055c4" />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#0055c4', fontWeight: 600 }}>
                            {produto.fullLabel}
                          </span>
                        </div>
                      )}

                      {/* — Seus dados — */}
                      <p style={SECTION_LABEL_STYLE}>Seus dados</p>

                      <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#374151', display: 'block', marginBottom: '5px' }}>
                            Nome
                          </label>
                          <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Seu nome completo"
                            style={{
                              width: '100%', padding: '11px 14px',
                              border: '1.5px solid #e5e7eb', borderRadius: '10px',
                              fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#111827',
                              outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s',
                              backgroundColor: '#F9FAFB',
                            }}
                            onFocus={e => (e.currentTarget.style.borderColor = '#009cde')}
                            onBlur={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
                          />
                        </div>
                        <div>
                          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#374151', display: 'block', marginBottom: '5px' }}>
                            WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={telefone}
                            onChange={e => setTelefone(maskPhone(e.target.value))}
                            placeholder="(00) 00000-0000"
                            style={{
                              width: '100%', padding: '11px 14px',
                              border: '1.5px solid #e5e7eb', borderRadius: '10px',
                              fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#111827',
                              outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s',
                              backgroundColor: '#F9FAFB',
                            }}
                            onFocus={e => (e.currentTarget.style.borderColor = '#009cde')}
                            onBlur={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
                          />
                        </div>
                      </div>

                      <motion.button
                        onClick={handleEnviar}
                        disabled={!nome.trim() || telefone.replace(/\D/g, '').length < 10}
                        whileHover={nome.trim() && telefone.replace(/\D/g, '').length >= 10 ? { scale: 1.02, backgroundColor: '#0089c4' } : {}}
                        whileTap={nome.trim() && telefone.replace(/\D/g, '').length >= 10 ? { scale: 0.97 } : {}}
                        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                        style={{
                          width: '100%', padding: '14px', borderRadius: '12px',
                          border: 'none', backgroundColor: '#009cde', color: '#fff',
                          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px',
                          letterSpacing: '0.05em', marginTop: '20px',
                          cursor: !nome.trim() || telefone.replace(/\D/g, '').length < 10 ? 'not-allowed' : 'pointer',
                          opacity: !nome.trim() || telefone.replace(/\D/g, '').length < 10 ? 0.45 : 1,
                        }}
                      >
                        ENVIAR
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ── PASSO 3: SUCESSO ── */}
                  {step === 'sucesso' && (
                    <motion.div
                      key="sucesso"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        padding: '48px 32px 48px',
                        background: '#ffffff',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        textAlign: 'center', gap: '16px',
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 18 }}
                        style={{
                          width: '64px', height: '64px', borderRadius: '50%',
                          backgroundColor: '#EFF8FE',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '28px',
                        }}
                      >
                        🎉
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
                      >
                        <h2 style={{
                          fontFamily: 'Georgia, serif',
                          fontStyle: 'italic',
                          fontWeight: 400, fontSize: '52px', color: '#009cde',
                          marginBottom: '10px',
                        }}>
                          Parabéns!
                        </h2>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '14px', color: '#374151',
                          lineHeight: 1.6, maxWidth: '320px',
                        }}>
                          Um especialista em crédito entrará em contato com você para montar um plano personalizado.
                        </p>
                      </motion.div>

                      <motion.button
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        whileHover={{ opacity: 0.6 }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                          marginTop: '8px', padding: '4px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#009cde', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'opacity 0.2s',
                        }}
                      >
                        <X size={16} />
                      </motion.button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
