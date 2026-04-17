import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface Message {
  id: number;
  text: string;
  from: 'user' | 'agent';
  time: string;
}

function now() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    from: 'agent',
    text: 'Olá! 👋 Seja bem-vindo à Porto Vale. Como posso te ajudar hoje?',
    time: now(),
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [showNotification, setShowNotification] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setShowNotification(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now(), from: 'user', text, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Resposta automática + redirect WPP
    setTimeout(() => {
      const agentMsg: Message = {
        id: Date.now() + 1,
        from: 'agent',
        text: 'Perfeito! Vou te conectar com um dos nossos especialistas agora. 🚀',
        time: now(),
      };
      setMessages(prev => [...prev, agentMsg]);
      setTimeout(() => {
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
          '_blank'
        );
      }, 1000);
    }, 800);
  };

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '16px',
              zIndex: 9998,
              width: 'min(340px, calc(100vw - 32px))',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
              display: 'flex',
              flexDirection: 'column',
              background: '#f4f4f4',
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: '#009cde',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                  Como posso ajudar?
                </p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontFamily: "'Inter', sans-serif", margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block' }} />
                  online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '4px', display: 'flex' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minHeight: '280px',
                maxHeight: '360px',
              }}
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '78%',
                      backgroundColor: msg.from === 'user' ? '#009cde' : '#ffffff',
                      color: msg.from === 'user' ? '#ffffff' : '#111827',
                      borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      padding: '10px 13px',
                      fontSize: '13px',
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.5,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    }}
                  >
                    <p style={{ margin: 0 }}>{msg.text}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '10px', opacity: 0.6, textAlign: 'right' }}>{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e5e7eb',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
                placeholder="Digite sua mensagem aqui"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  fontFamily: "'Inter', sans-serif",
                  color: '#374151',
                  background: 'transparent',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: input.trim() ? 'pointer' : 'default',
                  color: input.trim() ? '#009cde' : '#d1d5db',
                  display: 'flex',
                  padding: '4px',
                  transition: 'color 0.2s',
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '16px', zIndex: 9999 }}>
        {/* Notificação */}
        <AnimatePresence>
          {showNotification && !open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
                zIndex: 1,
              }}
            >
              1
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#e87722',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(232,119,34,0.45)',
          }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} color="white" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {/* Ícone chat */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 1.873-.517 3.624-1.416 5.115L22 22l-4.885-1.416A9.956 9.956 0 0112 22z" fill="white"/>
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
