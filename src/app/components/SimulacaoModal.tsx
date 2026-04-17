import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Home } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

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
type Step = 'simulador' | 'formulario';

export function SimulacaoModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>('simulador');
  const [tab, setTab] = useState<Tab>('parcelas');
  const [valor, setValor] = useState(1500);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const min = tab === 'parcelas' ? 500 : 50000;
  const max = tab === 'parcelas' ? 5000 : 500000;
  const step_slider = tab === 'parcelas' ? 50 : 5000;

  const formatValue = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const handleSimular = () => setStep('formulario');

  const handleEnviar = () => {
    if (!nome.trim() || telefone.replace(/\D/g, '').length < 10) return;
    const msg =
      `Olá! Quero simular um consórcio.\n` +
      `Tipo: Imóvel\n` +
      `${tab === 'parcelas' ? 'Parcela desejada' : 'Crédito desejado'}: ${formatValue(valor)}\n` +
      `Nome: ${nome}\nTelefone: ${telefone}\nEmail: ${email}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep('simulador'); setNome(''); setTelefone(''); setEmail(''); }, 400);
  };

  // percent for slider track
  const pct = ((valor - min) / (max - min)) * 100;

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

          {/* Modal — container de centralização */}
          <div
            style={{
              position: 'fixed', inset: 0,
              zIndex: 10001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              pointerEvents: 'none',
            }}
          >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: '480px',
              pointerEvents: 'all',
            }}
          >
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
              position: 'relative',
            }}>
              {/* Close */}
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.12)' }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{
                  position: 'absolute', top: '14px', right: '14px',
                  background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '50%',
                  width: '32px', height: '32px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <X size={16} color="#374151" />
              </motion.button>

              <AnimatePresence mode="wait">

                {/* ── STEP 1: SIMULADOR ── */}
                {step === 'simulador' && (
                  <motion.div
                    key="simulador"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    style={{ padding: '36px 32px 32px' }}
                  >
                    <h2 style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700, fontSize: '20px',
                      color: '#111827', textAlign: 'center',
                      letterSpacing: '-0.02em', marginBottom: '20px',
                    }}>
                      Chegou a hora de realizar o seu sonho
                    </h2>

                    {/* Icon */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                      <div style={{
                        width: '52px', height: '52px', borderRadius: '50%',
                        backgroundColor: '#f3f4f6',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#374151',
                      }}>
                        <Home size={22} />
                      </div>
                    </div>

                    {/* Tab */}
                    <p style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>
                      Simule o seu plano por:
                    </p>
                    <div style={{
                      display: 'flex', backgroundColor: '#E0F4FB',
                      borderRadius: '999px', padding: '4px',
                      maxWidth: '240px', margin: '0 auto 20px',
                    }}>
                      {(['credito', 'parcelas'] as const).map(t => (
                        <motion.button
                          key={t}
                          onClick={() => { setTab(t); setValor(t === 'parcelas' ? 1500 : 150000); }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          style={{
                            flex: 1, padding: '8px 0', borderRadius: '999px',
                            border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                            fontSize: '14px', fontWeight: 600,
                            backgroundColor: tab === t ? '#0055c4' : 'transparent',
                            color: tab === t ? '#fff' : '#374151',
                          }}
                        >
                          {t === 'credito' ? 'Crédito' : 'Parcelas'}
                        </motion.button>
                      ))}
                    </div>

                    {/* Valor */}
                    <p style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                      {tab === 'parcelas' ? 'Escolha o valor da parcela que deseja:' : 'Escolha o crédito desejado:'}
                    </p>
                    <p style={{
                      textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800, fontSize: '28px', color: '#111827', marginBottom: '12px',
                    }}>
                      {formatValue(valor)}
                    </p>

                    {/* Slider */}
                    <div style={{ position: 'relative', marginBottom: '6px' }}>
                      <input
                        type="range"
                        min={min} max={max} step={step_slider}
                        value={valor}
                        onChange={e => setValor(Number(e.target.value))}
                        style={{
                          width: '100%', height: '6px', borderRadius: '999px',
                          appearance: 'none', outline: 'none', cursor: 'pointer',
                          background: `linear-gradient(to right, #009cde ${pct}%, #e5e7eb ${pct}%)`,
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#9ca3af', marginBottom: '24px' }}>
                      <span>{formatValue(min)}</span>
                      <span>{formatValue(max)}</span>
                    </div>

                    {/* CTA */}
                    <motion.button
                      onClick={handleSimular}
                      whileHover={{ scale: 1.02, backgroundColor: '#0089c4' }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                      style={{
                        width: '100%', padding: '14px', borderRadius: '12px',
                        border: 'none', backgroundColor: '#009cde', color: '#fff',
                        fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px',
                        letterSpacing: '0.05em', cursor: 'pointer',
                      }}
                    >
                      SIMULAR
                    </motion.button>
                  </motion.div>
                )}

                {/* ── STEP 2: FORMULÁRIO ── */}
                {step === 'formulario' && (
                  <motion.div
                    key="formulario"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    style={{ padding: '36px 32px 32px' }}
                  >
                    <h2 style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700, fontSize: '22px',
                      color: '#111827', textAlign: 'center',
                      letterSpacing: '-0.02em', marginBottom: '6px',
                    }}>
                      Simulação rápida
                    </h2>
                    <p style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>
                      Preencha os dados e receba uma proposta personalizada.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* Nome */}
                      <div>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>
                          Nome completo
                        </label>
                        <input
                          type="text"
                          value={nome}
                          onChange={e => setNome(e.target.value)}
                          style={{
                            width: '100%', padding: '12px 14px',
                            border: '1.5px solid #e5e7eb', borderRadius: '10px',
                            fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#111827',
                            outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s',
                          }}
                          onFocus={e => (e.currentTarget.style.borderColor = '#009cde')}
                          onBlur={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
                        />
                      </div>

                      {/* Telefone */}
                      <div>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>
                          Telefone
                        </label>
                        <input
                          type="tel"
                          value={telefone}
                          onChange={e => setTelefone(maskPhone(e.target.value))}
                          placeholder="(00) 00000-0000"
                          style={{
                            width: '100%', padding: '12px 14px',
                            border: '1.5px solid #e5e7eb', borderRadius: '10px',
                            fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#111827',
                            outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s',
                          }}
                          onFocus={e => (e.currentTarget.style.borderColor = '#009cde')}
                          onBlur={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          style={{
                            width: '100%', padding: '12px 14px',
                            border: '1.5px solid #e5e7eb', borderRadius: '10px',
                            fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#111827',
                            outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s',
                          }}
                          onFocus={e => (e.currentTarget.style.borderColor = '#009cde')}
                          onBlur={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
                        />
                      </div>
                    </div>

                    {/* Ações */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '28px' }}>
                      <motion.button
                        onClick={() => setStep('simulador')}
                        whileHover={{ x: -3, color: '#374151' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontFamily: "'Inter', sans-serif", fontSize: '13px',
                          color: '#6b7280', fontWeight: 500,
                        }}
                      >
                        <ArrowLeft size={14} /> VOLTAR
                      </motion.button>
                      <motion.button
                        onClick={handleEnviar}
                        disabled={!nome.trim() || telefone.replace(/\D/g, '').length < 10}
                        whileHover={nome.trim() && telefone.replace(/\D/g, '').length >= 10 ? { scale: 1.04, backgroundColor: '#0089c4' } : {}}
                        whileTap={nome.trim() && telefone.replace(/\D/g, '').length >= 10 ? { scale: 0.96 } : {}}
                        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                        style={{
                          padding: '11px 28px', borderRadius: '10px',
                          border: 'none', backgroundColor: '#009cde', color: '#fff',
                          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px',
                          cursor: !nome.trim() || telefone.replace(/\D/g, '').length < 10 ? 'not-allowed' : 'pointer',
                          opacity: !nome.trim() || telefone.replace(/\D/g, '').length < 10 ? 0.45 : 1,
                        }}
                      >
                        Enviar
                      </motion.button>
                    </div>
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
