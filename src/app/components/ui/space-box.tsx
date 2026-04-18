"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "./utils"
import { PromptBox } from "./chatgpt-prompt-input"
import { WHATSAPP_NUMBER } from "../../constants"

const FLIP_WORDS = [
  "seu novo automóvel?",
  "seu novo imóvel?",
  "sua reforma?",
  "como realizar?",
  "como investir?",
]

const EMOJIS = ["🚗", "🏠", "❤️", "📈", "🏡", "💙", "🚙", "📊", "🏍️", "🛵", "🚚", "🚛"]

interface EmojiParticle {
  id: number
  emoji: string
  x: number       // % horizontal dentro da zona da imagem
  size: number
  duration: number
  delay: number
  wobble: number  // amplitude do balanço lateral
}

function FloatingEmojis() {
  const [particles, setParticles] = useState<EmojiParticle[]>([])
  const counterRef = useRef(0)

  useEffect(() => {
    const spawn = () => {
      const id = counterRef.current++
      const particle: EmojiParticle = {
        id,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        x: 30 + Math.random() * 40,        // concentrado no centro-horizontal (30-70%)
        size: 22 + Math.random() * 14,
        duration: 5 + Math.random() * 3,
        delay: 0,
        wobble: 12 + Math.random() * 16,
      }
      setParticles(prev => [...prev.slice(-12), particle])
    }

    // spawn inicial escalonado
    const timeouts = [0, 400, 900, 1500].map(d =>
      setTimeout(spawn, d)
    )

    const interval = setInterval(spawn, 3500)
    return () => {
      timeouts.forEach(clearTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {particles.map(p => (
        <motion.span
          key={p.id}
          initial={{ y: 0, opacity: 1, x: 0, scale: 0.6 }}
          animate={{
            y: -200,
            opacity: [1, 1, 1, 0],
            x: [0, p.wobble, -p.wobble * 0.5, p.wobble * 0.3, 0],
            scale: [0.7, 1, 1, 1, 0.85],
          }}
          transition={{
            duration: p.duration,
            ease: "linear",
            opacity: { duration: p.duration, times: [0, 0.5, 0.75, 1], ease: "easeIn" },
            x: { duration: p.duration, ease: "easeInOut" },
            scale: { duration: p.duration, times: [0, 0.08, 0.5, 0.92, 1] },
          }}
          onAnimationComplete={() =>
            setParticles(prev => prev.filter(e => e.id !== p.id))
          }
          style={{
            position: "absolute",
            bottom: "20px",            // nasce sobre a imagem
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            pointerEvents: "none",
            zIndex: 30,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </>
  )
}

interface SpaceBoxProps {
  animatedText?: string
  starDensity?: "low" | "medium" | "high"
  className?: string
}

type Step = "idle" | "message"

export default function SpaceBox({ className }: SpaceBoxProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [step, setStep] = useState<Step>("idle")
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (step !== "idle") return
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % FLIP_WORDS.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [step])

  const handleSendMessage = (msg: string) => {
    const text = `Olá! Tenho uma dúvida: ${msg}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank")
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (step === "idle") setStep("message")
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setStep("idle")
  }

  const handleClick = () => {
    if (step === "idle") {
      setIsHovered(true)
      setStep("message")
    }
  }

  return (
    <motion.div
      className={cn(
        "p-8 w-[60rem] max-w-[90vw] flex items-center justify-center rounded-3xl border-2 relative overflow-hidden transition-colors duration-500",
        isHovered ? "border-blue-500/30 border-2" : "border-0",
        className
      )}
      style={{
        backgroundColor: isHovered ? "#0055c4" : "#eeebe6",
        minHeight: "28rem",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Emojis flutuantes — só no idle */}
      <AnimatePresence>
        {step === "idle" && <FloatingEmojis />}
      </AnimatePresence>

      {/* Imagem na borda inferior — só no idle */}
      <AnimatePresence>
        {step === "idle" && (
          <motion.img
            src="/imagens/celular-duvidas.png"
            alt="Fale com um especialista"
            initial={{ y: 160 }}
            animate={{ y: 0 }}
            exit={{ y: 160 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              margin: "0 auto",
              height: "160px",
              objectFit: "contain",
              pointerEvents: "none",
              zIndex: 20,
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">

          {/* ── IDLE ── */}
          {step === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col items-center gap-2 text-center pb-40"
            >
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  letterSpacing: "-0.03em",
                  color: "#111827",
                  lineHeight: 1.2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.1em",
                }}
              >
                <span>Ainda com dúvidas sobre</span>
                <span
                  style={{
                    display: "inline-flex",
                    overflow: "hidden",
                    height: "1.2em",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
                      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: "inline-block",
                        fontFamily: "Georgia, serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "#009cde",
                      }}
                    >
                      {FLIP_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(0,0,0,0.40)" }}>
                Toque para falar com um especialista
              </p>
            </motion.div>
          )}

          {/* ── STEP 1: MENSAGEM ── */}
          {step === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-4 w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Botão fechar — visível apenas no mobile */}
              <button
                className="lg:hidden self-end"
                onClick={() => { setIsHovered(false); setStep("idle") }}
                style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <X size={16} color="white" />
              </button>
              <div className="text-center">
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(22px, 2.5vw, 32px)",
                    letterSpacing: "-0.025em",
                    color: "#ffffff",
                    lineHeight: 1.15,
                  }}
                >
                  Ainda com{" "}
                  <span style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.9)" }}>
                    dúvidas?
                  </span>
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)", marginTop: "4px" }}>
                  Envie sua dúvida, um especialista vai te responder em instantes
                </p>
              </div>

              <PromptBox
                className="w-full max-w-lg shadow-xl"
                placeholder="Escreva sua dúvida aqui..."
                onSend={handleSendMessage}
              />

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
                Pressione{" "}
                <kbd className="bg-white/20 rounded px-1 py-0.5 text-white" style={{ fontSize: "11px" }}>Enter</kbd>{" "}
                para continuar
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  )
}
