import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ArrowRight, ArrowLeft, Check, ChevronDown, Plus,
  Home, Car, Truck, Building2, Zap, Sprout, TrendingUp,
  Shield, Clock, Shuffle, Trophy, MessageCircle, Users,
  BadgePercent, HandCoins, Coins, Target, Wallet,
  FileText, PiggyBank, Landmark, Star, CheckCircle,
  X as XIcon, AlertCircle, Info, Briefcase,
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { SectionLabel } from '../components/SectionLabel';
import { WHATSAPP_URL } from '../constants';

const BLUE = '#009cde';
const DARK_BLUE = '#0055c4';
const DARK = '#111827';

/* ─── helpers ───────────────────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
      fontSize: 'clamp(26px, 3.5vw, 40px)', color: DARK,
      lineHeight: 1.15, letterSpacing: '-0.025em', marginTop: '8px',
    }}>{children}</h2>
  );
}

function IconBox({ icon: Icon, bg, ic }: { icon: React.ElementType; bg: string; ic: string }) {
  return (
    <div style={{
      width: '48px', height: '48px', borderRadius: '14px', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '16px', flexShrink: 0,
    }}>
      <Icon size={22} style={{ color: ic }} />
    </div>
  );
}

/* ─── FAQ item ───────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-[#E5E7EB] rounded-xl overflow-hidden transition-shadow duration-200"
      style={{ backgroundColor: open ? '#FFFFFF' : '#FAFAFA' }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="text-[14px] text-[#111827] leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: open ? 700 : 600 }}
        >
          {q}
        </span>
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          animate={{ backgroundColor: open ? '#2563EB' : '#F3F4F6', rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Plus size={14} color={open ? '#FFFFFF' : '#6B7280'} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="px-5 pb-5 text-[13px] text-[#6B7280]"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.75' }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── CHAPTERS ───────────────────────────────────────────────────── */

/* Chapter 0: O Básico ─────────────────────────────────────────── */
function ChapterBasico() {
  return (
    <div className="flex flex-col gap-20">

      {/* O que é consórcio */}
      <section id="o-que-e">
        <div className="text-center mb-12">
          <SectionLabel>Conceito</SectionLabel>
          <SectionTitle>O que é consórcio?</SectionTitle>
        </div>

        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 'clamp(17px, 2.2vw, 21px)', color: '#374151', lineHeight: 1.75, maxWidth: '760px', margin: '0 auto 48px', textAlign: 'center' }}>
          Um consórcio é uma <span style={{ color: DARK_BLUE, fontWeight: 700 }}>poupança coletiva</span> onde um grupo de pessoas contribui mensalmente para um fundo em comum — e a cada mês, uma delas é contemplada e recebe crédito para comprar o bem desejado, <span style={{ color: DARK_BLUE, fontWeight: 700 }}>sem pagar juros</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[
            { icon: Users, title: 'Grupo de pessoas', desc: 'Você entra em um grupo com outras pessoas que têm o mesmo objetivo de compra. Todos contribuem mensalmente para um fundo coletivo administrado por uma empresa regulamentada pelo Banco Central.', bg: '#EFF6FF', ic: DARK_BLUE },
            { icon: PiggyBank, title: 'Poupança coletiva', desc: 'As parcelas mensais formam um fundo comum. A cada assembleia mensal, uma ou mais pessoas do grupo são contempladas por sorteio ou oferta de lance, recebendo o crédito para comprar o bem.', bg: '#F0FDF4', ic: '#16A34A' },
            { icon: FileText, title: 'Carta de crédito', desc: 'Ao ser contemplado, você recebe uma carta de crédito — um valor disponível para comprar o bem à vista. Isso te dá poder de negociação total e a possibilidade de conseguir descontos significativos.', bg: '#FFF7ED', ic: '#D97706' },
          ].map(({ icon: Icon, title, desc, bg, ic }) => (
            <div key={title} style={{ background: bg, borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,0,0,0.04)' }}>
              <IconBox icon={Icon} bg="#fff" ic={ic} />
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', color: DARK, marginBottom: '8px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Como surgiu */}
        <div style={{ background: '#F9FAFB', borderRadius: '20px', padding: '32px', border: '1px solid #E5E7EB', maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Info size={18} style={{ color: DARK_BLUE }} />
            </div>
            <div>
              <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: DARK, marginBottom: '8px' }}>O consórcio é regulamentado pelo Banco Central</h4>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7 }}>
                O sistema de consórcios no Brasil é regulado pela Lei nº 11.795/2008 e fiscalizado pelo Banco Central do Brasil (BACEN). Toda administradora deve ter autorização para funcionar, o que garante segurança e transparência para os consorciados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consórcio vs Financiamento */}
      <section id="vs-financiamento">
        <div className="text-center mb-12">
          <SectionLabel>Comparativo</SectionLabel>
          <SectionTitle>Consórcio vs Financiamento</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '560px', margin: '12px auto 0' }}>
            Entenda as diferenças práticas entre as duas modalidades e descubra qual é a mais vantajosa para o seu perfil.
          </p>
        </div>

        <div style={{ background: '#F9FAFB', borderRadius: '24px', padding: '36px 40px', border: '1px solid #E5E7EB' }}>
          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CA3AF', width: '30%' }}>Critério</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: DARK_BLUE, background: '#EFF6FF', borderRadius: '8px 8px 0 0' }}>Consórcio Porto Vale</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#6B7280' }}>Financiamento Bancário</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Juros',                    cOk: true,  fOk: false, cTxt: 'Sem juros',               fTxt: 'Com juros (0,5% a 2% a.m.)' },
                  { label: 'Entrada',                  cOk: true,  fOk: false, cTxt: 'Não obrigatória',          fTxt: 'Geralmente 20–30%' },
                  { label: 'Prazo máximo',             cOk: true,  fOk: true,  cTxt: 'Até 200 meses',           fTxt: 'Até 360 meses (imóvel)' },
                  { label: 'Custo total',              cOk: true,  fOk: false, cTxt: 'Taxa adm. 19–23% total',  fTxt: 'Juros dobram o valor pago' },
                  { label: 'Poder de negociação',      cOk: true,  fOk: false, cTxt: 'Compra à vista (desconto)',fTxt: 'Limitado' },
                  { label: 'Burocracia',               cOk: true,  fOk: false, cTxt: 'Baixa',                   fTxt: 'Alta (análise de crédito)' },
                  { label: 'Disponibilidade imediata', cOk: false, fOk: true,  cTxt: 'Sorteio ou lance',         fTxt: 'Imediato' },
                  { label: 'Usável para bem usado',    cOk: true,  fOk: false, cTxt: 'Sim',                     fTxt: 'Com restrições' },
                ].map(({ label, cOk, fOk, cTxt, fTxt }, i) => (
                  <tr key={label} style={{ borderTop: '1px solid #E5E7EB', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                    <td style={{ padding: '13px 16px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>{label}</td>
                    <td style={{ padding: '13px 16px', textAlign: 'center', background: '#EFF6FF' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                        {cOk ? <Check size={15} style={{ color: '#16A34A' }} /> : <XIcon size={15} style={{ color: '#9CA3AF' }} />}
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>{cTxt}</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                        {fOk ? <Check size={15} style={{ color: '#16A34A' }} /> : <XIcon size={15} style={{ color: '#9CA3AF' }} />}
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{fTxt}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modalidades de bens */}
      <section id="modalidades">
        <div className="text-center mb-12">
          <SectionLabel>Modalidades</SectionLabel>
          <SectionTitle>O que você pode comprar?</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '540px', margin: '12px auto 0' }}>
            O consórcio pode ser utilizado para adquirir uma ampla variedade de bens e serviços — móveis, imóveis e muito mais.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { icon: Home,       label: 'Imóvel residencial',   desc: 'Apartamento, casa, imóvel na planta',   bg: '#EFF6FF', ic: DARK_BLUE },
            { icon: Building2,  label: 'Terreno',               desc: 'Terrenos urbanos e rurais',             bg: '#F0FDF4', ic: '#16A34A' },
            { icon: Building2,  label: 'Construção e Reforma',  desc: 'Construir ou reformar imóvel próprio',  bg: '#FFF7ED', ic: '#D97706' },
            { icon: Car,        label: 'Automóvel',             desc: 'Carros novos ou usados',                bg: '#FDF4FF', ic: '#9333EA' },
            { icon: Truck,      label: 'Veículos Pesados',      desc: 'Caminhões, ônibus, máquinas',           bg: '#FEF3C7', ic: '#D97706' },
            { icon: Sprout,     label: 'Agro',                  desc: 'Equipamentos e máquinas agrícolas',     bg: '#F0FDF4', ic: '#15803D' },
            { icon: Zap,        label: 'Energia Solar',         desc: 'Instalação de painéis fotovoltaicos',   bg: '#FFFBEB', ic: '#CA8A04' },
            { icon: TrendingUp, label: 'Investimento',          desc: 'Usar a carta como ativo financeiro',    bg: '#EFF6FF', ic: BLUE },
            { icon: Briefcase,  label: 'Empresarial',           desc: 'Capital de giro, equipamentos, imóveis',bg: '#F1F5F9', ic: '#475569' },
          ].map(({ icon: Icon, label, desc, bg, ic }) => (
            <div key={label} style={{ background: bg, borderRadius: '16px', padding: '20px', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <Icon size={18} style={{ color: ic }} />
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '14px', color: DARK, marginBottom: '4px' }}>{label}</h3>
              <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* Chapter 1: Como Participar ────────────────────────────────────── */
function ChapterParticipar() {
  return (
    <div className="flex flex-col gap-20">

      {/* Quem pode participar */}
      <section id="quem-pode">
        <div className="text-center mb-12">
          <SectionLabel>Elegibilidade</SectionLabel>
          <SectionTitle>Quem pode participar?</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '560px', margin: '12px auto 0' }}>
            O consórcio é acessível a uma ampla gama de perfis — pessoa física ou jurídica, com renda formal ou informal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: 'Pessoa Física', ic: DARK_BLUE, bg: '#EFF6FF',
              items: [
                'Maiores de 18 anos (ou emancipados)',
                'CPF regular na Receita Federal',
                'Renda formal (CLT) ou informal (autônomo, MEI)',
                'Não é necessária análise de crédito para aderir',
                'Consorciado pode ser solteiro, casado ou divorciado',
                'Não precisa ter conta em banco específico',
              ],
            },
            {
              title: 'Pessoa Jurídica', ic: '#16A34A', bg: '#F0FDF4',
              items: [
                'CNPJ ativo e regular',
                'Empresas de todos os portes (MEI, ME, EPP, SA)',
                'Pode usar o consórcio para expandir patrimônio',
                'Ideal para frotas, equipamentos e imóveis comerciais',
                'Dedução de imposto dependendo do regime tributário',
                'Capital de giro via carta de crédito',
              ],
            },
          ].map(({ title, ic, bg, items }) => (
            <div key={title} style={{ background: bg, borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', color: DARK, marginBottom: '18px' }}>{title}</h3>
              <div className="flex flex-col gap-3">
                {items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle size={16} style={{ color: ic, marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: '#374151', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFBEB', borderRadius: '16px', padding: '24px 28px', border: '1px solid #FDE68A', display: 'flex', gap: '16px' }}>
          <AlertCircle size={20} style={{ color: '#D97706', marginTop: '1px', flexShrink: 0 }} />
          <p style={{ fontSize: '14px', color: '#92400E', lineHeight: 1.7 }}>
            <strong>Atenção:</strong> Embora não haja análise de crédito na adesão, a administradora pode solicitar documentos de renda para liberar a carta após a contemplação. Por isso, é importante manter sua documentação financeira em ordem ao longo do plano.
          </p>
        </div>
      </section>

      {/* Como funciona um grupo */}
      <section id="grupos">
        <div className="text-center mb-12">
          <SectionLabel>Estrutura</SectionLabel>
          <SectionTitle>Como funciona um grupo de consórcio?</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '20px' }}>
              Um grupo de consórcio é formado por um conjunto de pessoas (consorciados) que têm o mesmo objetivo de aquisição — seja um imóvel, um automóvel ou outro bem. Cada grupo tem:
            </p>
            <div className="flex flex-col gap-4">
              {[
                { title: 'Número de participantes', desc: 'Geralmente de 50 a 300 consorciados por grupo, dependendo do valor e tipo de bem.' },
                { title: 'Prazo definido', desc: 'Todos os grupos têm um prazo máximo (ex: 120, 160 ou 200 meses). Ao final, todos os participantes foram contemplados.' },
                { title: 'Assembleia mensal', desc: 'Reunião onde acontecem os sorteios e lances. Todos os consorciados são convocados (presencialmente ou online).' },
                { title: 'Fundo comum', desc: 'As mensalidades de todos os participantes formam o fundo que financia as contemplações.' },
                { title: 'Administradora', desc: 'A Porto Vale (administradora autorizada pelo BACEN) coordena o grupo, organiza assembleias e garante o cumprimento do contrato.' },
              ].map(({ title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: BLUE, marginTop: '6px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '14px', color: DARK }}>{title}:</strong>{' '}
                    <span style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#F9FAFB', borderRadius: '20px', padding: '28px', border: '1px solid #E5E7EB' }}>
            <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: DARK, marginBottom: '18px' }}>Exemplo prático</h4>
            <div className="flex flex-col gap-4">
              {[
                { step: '1', title: 'Você entra no grupo', desc: '100 pessoas com o mesmo objetivo se unem num grupo de consórcio imobiliário.' },
                { step: '2', title: 'Contribuição mensal', desc: 'Cada participante paga R$ 1.200/mês. O fundo coletivo arrecada R$ 120.000 por mês.' },
                { step: '3', title: 'Assembleia mensal', desc: '1 a 2 pessoas são contempladas por mês (sorteio + lance). Ao longo de 100 meses, todos recebem.' },
                { step: '4', title: 'Contemplação', desc: 'Você recebe a carta de crédito de R$ 120.000 para comprar o imóvel à vista.' },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: DARK_BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{step}</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: DARK }}>{title}</strong>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '3px', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documentação */}
      <section id="documentacao">
        <div className="text-center mb-12">
          <SectionLabel>Documentos</SectionLabel>
          <SectionTitle>Documentação necessária</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '540px', margin: '12px auto 0' }}>
            A documentação é solicitada em dois momentos: na adesão e na contemplação. Confira o que você precisa em cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              phase: 'Na adesão ao grupo', color: DARK_BLUE, bg: '#EFF6FF',
              docs: [
                'RG e CPF (ou CNH)',
                'Comprovante de endereço recente',
                'Dados para emissão do contrato',
                'Não é necessária comprovação de renda',
                'Não há consulta ao SPC/Serasa para entrar',
              ],
            },
            {
              phase: 'Após a contemplação', color: '#D97706', bg: '#FFF7ED',
              docs: [
                'Comprovante de renda (holerite, decore, IR)',
                'Certidão de casamento/união estável (se aplicável)',
                'Documentos do bem a ser adquirido',
                'Certidões negativas (para imóvel)',
                'Escritura ou matrícula do imóvel (para imóvel)',
              ],
            },
          ].map(({ phase, color, bg, docs }) => (
            <div key={phase} style={{ background: bg, borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color, marginBottom: '16px' }}>{phase}</h3>
              <div className="flex flex-col gap-3">
                {docs.map(doc => (
                  <div key={doc} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle size={15} style={{ color, marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: '#374151', lineHeight: 1.5 }}>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* Chapter 2: Contemplação & Lances ──────────────────────────────── */
function ChapterContemplacao() {
  return (
    <div className="flex flex-col gap-20">

      {/* Passo a passo geral */}
      <section id="passo-a-passo">
        <div className="text-center mb-12">
          <SectionLabel>Jornada</SectionLabel>
          <SectionTitle>Passo a passo do consórcio</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '560px', margin: '12px auto 0' }}>
            Do momento em que você decide entrar até a entrega das chaves — entenda cada fase da jornada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { n: '01', icon: FileText, title: 'Escolha do plano', desc: 'Selecione o valor da carta de crédito e o prazo que cabem no seu orçamento. Parcelas a partir de R$ 349/mês.', bg: '#EFF6FF', ic: DARK_BLUE },
            { n: '02', icon: Users, title: 'Entrada no grupo', desc: 'Após assinar o contrato, você passa a integrar um grupo de consorciados com o mesmo perfil de compra.', bg: '#F0FDF4', ic: '#16A34A' },
            { n: '03', icon: Shuffle, title: 'Assembleias mensais', desc: 'Todo mês há sorteios e sessão de lances. Cada participante pode ser contemplado a qualquer momento.', bg: '#FFF7ED', ic: '#D97706' },
            { n: '04', icon: Trophy, title: 'Contemplação', desc: 'Você é sorteado ou tem o maior lance aceito — e recebe a carta de crédito para comprar o seu bem.', bg: '#FDF4FF', ic: '#9333EA' },
            { n: '05', icon: Home, title: 'Aquisição do bem', desc: 'Use a carta para comprar o bem à vista. Continue pagando as parcelas restantes normalmente.', bg: '#F0FDF4', ic: '#059669' },
          ].map(({ n, icon: Icon, title, desc, bg, ic }) => (
            <div key={n} style={{ background: bg, borderRadius: '20px', padding: '24px', border: '1px solid rgba(0,0,0,0.04)', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '16px', right: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '28px', color: 'rgba(0,0,0,0.05)' }}>{n}</span>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <Icon size={20} style={{ color: ic }} />
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: DARK, marginBottom: '8px' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sorteio vs Lance */}
      <section id="sorteio-lance">
        <div className="text-center mb-12">
          <SectionLabel>Formas de contemplação</SectionLabel>
          <SectionTitle>Como ser contemplado?</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '560px', margin: '12px auto 0' }}>
            Existem duas formas de receber a carta de crédito: aguardar o sorteio ou ofertar um lance. Ambas acontecem nas assembleias mensais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            {
              tipo: 'Sorteio', icon: Shuffle, color: DARK_BLUE, bg: '#EFF6FF',
              desc: 'A cada assembleia, números correspondentes às cotas são sorteados aleatoriamente. Todo participante em dia com as parcelas pode ser contemplado — é a forma democrática e imparcial.',
              pros: ['Não requer desembolso extra', 'Qualquer cota pode ser sorteada', 'Justo para todos os participantes', 'Pode acontecer no 1º mês'],
            },
            {
              tipo: 'Lance', icon: Trophy, color: '#D97706', bg: '#FFF7ED',
              desc: 'Você oferece um valor adicional (o lance) para antecipar sua contemplação. O maior lance da assembleia é aceito. É uma forma de controlar quando você quer ser contemplado.',
              pros: ['Você escolhe quando quer receber', 'Antecipa o bem sem esperar', 'Reduz o saldo devedor', 'Histórico: lances ~40% têm mais chance'],
            },
          ].map(({ tipo, icon: Icon, color, bg, desc, pros }) => (
            <div key={tipo} style={{ background: bg, borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', color: DARK }}>{tipo}</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>{desc}</p>
              <div className="flex flex-col gap-2">
                {pros.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={14} style={{ color, flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: '#374151' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tipos de lance */}
      <section id="tipos-lance">
        <div className="text-center mb-12">
          <SectionLabel>Modalidades de lance</SectionLabel>
          <SectionTitle>Tipos de lance</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '560px', margin: '12px auto 0' }}>
            Existem três modalidades de lance — cada uma com estratégia e impacto diferentes no seu plano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            {
              tipo: 'Lance Livre', icon: Wallet, color: DARK_BLUE, bg: '#EFF6FF',
              desc: 'Você oferta qualquer valor que desejar, dentro das regras do grupo. Quem ofertar o maior percentual do total do crédito vence a assembleia.',
              detail: 'Estratégia: lances em torno de 40% do valor da carta historicamente têm maiores chances de contemplação.',
            },
            {
              tipo: 'Lance Fixo', icon: Target, color: '#16A34A', bg: '#F0FDF4',
              desc: 'A administradora determina um percentual fixo (ex: 25% ou 30% da carta). Você decide se vai ofertar aquele valor fixo e, em caso de empate, o sorteio decide.',
              detail: 'Estratégia: ideal para quem tem reserva e quer aumentar as chances sem estratégias complexas.',
            },
            {
              tipo: 'Lance Embutido', icon: Coins, color: '#D97706', bg: '#FFF7ED',
              desc: 'O lance é descontado da própria carta de crédito — você não precisa ter o dinheiro agora. O limite é de até 30% do valor da carta.',
              detail: 'Exemplo: carta de R$ 100.000 → lance embutido de R$ 30.000 → você recebe R$ 70.000 para comprar o bem.',
            },
          ].map(({ tipo, icon: Icon, color, bg, desc, detail }) => (
            <div key={tipo} style={{ background: bg, borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: DARK, marginBottom: '10px' }}>{tipo}</h3>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.65, marginBottom: '14px' }}>{desc}</p>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '12px', border: `1px solid ${color}22` }}>
                <p style={{ fontSize: '12px', color, fontWeight: 600, lineHeight: 1.5 }}>{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FGTS como lance */}
        <div style={{ background: 'linear-gradient(135deg, #0055c4 0%, #009cde 100%)', borderRadius: '20px', padding: '32px', color: '#fff' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Landmark size={22} style={{ color: '#fff' }} />
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', color: '#fff' }}>FGTS pode ser usado como lance!</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
              Para consórcios de imóveis, você pode usar o seu saldo do FGTS como lance ou como complemento da carta de crédito na contemplação. Para isso, é necessário ter pelo menos 3 anos de trabalho com carteira assinada (podendo ser em empregos diferentes) e o imóvel deve ser para uso próprio e estar dentro dos limites do SFH.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                'Mínimo 3 anos de carteira assinada',
                'Imóvel para uso próprio',
                'Não ter outro imóvel no mesmo município',
                'Verificar limite do SFH na sua região',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <Check size={13} style={{ color: '#7DD3FC' }} />
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* Chapter 3: Carta de Crédito ───────────────────────────────────── */
function ChapterCarta() {
  return (
    <div className="flex flex-col gap-20">

      {/* O que é a carta */}
      <section id="carta-credito">
        <div className="text-center mb-12">
          <SectionLabel>Pós-contemplação</SectionLabel>
          <SectionTitle>Você foi contemplado — e agora?</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0' }}>
            A contemplação é o momento em que você recebe a carta de crédito. A partir daí, começa a parte mais emocionante da jornada.
          </p>
        </div>

        {/* Timeline pós-contemplação */}
        <div className="flex flex-col gap-4 mb-12 max-w-3xl mx-auto">
          {[
            { step: '1', title: 'Notificação da contemplação', desc: 'A administradora comunica que você foi contemplado. Você receberá um comunicado oficial informando os próximos passos.', icon: MessageCircle },
            { step: '2', title: 'Análise de crédito', desc: 'A administradora analisa sua documentação financeira (comprovante de renda, certidões, etc.) para liberar a carta de crédito.', icon: FileText },
            { step: '3', title: 'Escolha do bem', desc: 'Você tem liberdade para escolher o bem que deseja comprar — novo, usado, na planta, ou até diferente do que planejou inicialmente.', icon: Target },
            { step: '4', title: 'Análise do bem', desc: 'A administradora avalia o bem escolhido (laudo de avaliação, documentação do vendedor, certidões do imóvel).', icon: Shield },
            { step: '5', title: 'Liberação da carta', desc: 'Após a aprovação de tudo, a carta de crédito é liberada e o pagamento ao vendedor é feito diretamente. Você compra à vista!', icon: CheckCircle },
          ].map(({ step, title, desc, icon: Icon }, i) => (
            <div key={step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: DARK_BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} style={{ color: '#fff' }} />
                </div>
                {i < 4 && <div style={{ width: '2px', height: '32px', background: '#E5E7EB', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingTop: '8px', paddingBottom: i < 4 ? '8px' : '0' }}>
                <strong style={{ fontSize: '15px', color: DARK, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>{title}</strong>
                <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Como usar a carta */}
      <section id="como-usar-carta">
        <div className="text-center mb-12">
          <SectionLabel>Uso da carta</SectionLabel>
          <SectionTitle>O que você pode fazer com a carta?</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            {
              title: 'Comprar o bem definido no plano', ok: true, bg: '#F0FDF4', color: '#15803D',
              desc: 'Use a carta para comprar exatamente o bem escolhido ao entrar no grupo (imóvel, carro, etc). O pagamento vai direto para o vendedor — você compra à vista e tem poder de negociação.',
            },
            {
              title: 'Comprar um bem diferente do planejado', ok: true, bg: '#EFF6FF', color: DARK_BLUE,
              desc: 'Dependendo do contrato, você pode mudar o tipo de bem a ser adquirido. Ex: entrou para comprar um carro, mas prefere usar para reformar a casa. Consulte a administradora.',
            },
            {
              title: 'Quitar financiamento existente', ok: true, bg: '#FFF7ED', color: '#D97706',
              desc: 'Sim! Você pode usar a carta de crédito do consórcio para quitar um financiamento em andamento — liberando-se dos juros e reduzindo o custo total da dívida.',
            },
            {
              title: 'Comprar imóvel na planta', ok: true, bg: '#F5F3FF', color: '#7C3AED',
              desc: 'A carta pode ser usada para adquirir imóvel ainda em construção (na planta). O pagamento à construtora é feito conforme o avanço da obra, conforme acordado.',
            },
          ].map(({ title, bg, color, desc }) => (
            <div key={title} style={{ background: bg, borderRadius: '20px', padding: '24px', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <CheckCircle size={18} style={{ color, flexShrink: 0 }} />
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: DARK }}>{title}</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ajuste de carta */}
      <section id="ajuste-carta">
        <div className="text-center mb-12">
          <SectionLabel>Flexibilidade</SectionLabel>
          <SectionTitle>Aumentar ou reduzir a carta</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div style={{ background: '#F0FDF4', borderRadius: '20px', padding: '28px', border: '1px solid rgba(21,128,61,0.12)' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', color: '#15803D', marginBottom: '12px' }}>Aumentar o valor da carta</h3>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
              Se o bem que você quer custa mais do que a carta, você pode pagar a diferença com recursos próprios. A carta continua sendo utilizada integralmente, e você complementa o restante.
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Info size={14} style={{ color: '#15803D', marginTop: '2px', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>Exemplo: carta de R$ 200.000, imóvel de R$ 230.000 → você paga os R$ 30.000 de diferença direto ao vendedor.</p>
            </div>
          </div>
          <div style={{ background: '#EFF6FF', borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,85,196,0.12)' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', color: DARK_BLUE, marginBottom: '12px' }}>Reduzir o valor da carta</h3>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
              Se o bem custa menos que a carta, o saldo restante pode ser utilizado para cobrir despesas com transferência, escritura, ITBI, registro em cartório e outras despesas de aquisição do bem — maximizando o uso do crédito.
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Info size={14} style={{ color: DARK_BLUE, marginTop: '2px', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>Exemplo: carta de R$ 120.000, imóvel de R$ 100.000 → R$ 20.000 para custos cartoriais e ITBI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Carta contemplada */}
      <section id="carta-contemplada">
        <div className="text-center mb-12">
          <SectionLabel>Mercado secundário</SectionLabel>
          <SectionTitle>Comprar uma carta contemplada</SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '16px' }}>
              Uma <strong>carta contemplada</strong> é uma cota de consórcio que já foi contemplada — ou seja, o crédito já está disponível para uso imediato. Você pode comprar essa cota de outro consorciado no mercado secundário.
            </p>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '16px' }}>
              Essa é uma forma de ter acesso ao crédito do consórcio <strong>imediatamente</strong>, sem precisar esperar sorteios ou assembleias. Você assume as parcelas restantes do contrato e usa a carta para comprar o bem desejado.
            </p>
            <div style={{ background: '#FFFBEB', borderRadius: '14px', padding: '16px 20px', border: '1px solid #FDE68A' }}>
              <p style={{ fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>
                <strong>Importante:</strong> Ao comprar uma carta contemplada, você paga um prêmio acima do valor normal (geralmente 5–20% extra) para ter a vantagem da contemplação imediata. Avalie se o custo faz sentido para sua necessidade.
              </p>
            </div>
          </div>
          <div style={{ background: '#F9FAFB', borderRadius: '20px', padding: '28px', border: '1px solid #E5E7EB' }}>
            <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: DARK, marginBottom: '16px' }}>Vantagens da carta contemplada</h4>
            {[
              { title: 'Acesso imediato', desc: 'Crédito disponível para uso assim que a transferência for concluída.' },
              { title: 'Sem espera', desc: 'Ideal para quem precisa comprar o bem com urgência.' },
              { title: 'Parcelas definidas', desc: 'Você assume um contrato já em andamento, com prazo e valores claros.' },
              { title: 'Poder de compra à vista', desc: 'Mesmo sendo carta contemplada, você continua comprando o bem à vista.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                <Star size={15} style={{ color: BLUE, marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ fontSize: '14px', color: DARK }}>{title}:</strong>{' '}
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* Chapter 4: Custos & Segurança ─────────────────────────────────── */
function ChapterCustos() {
  return (
    <div className="flex flex-col gap-20">

      {/* Taxas */}
      <section id="taxas">
        <div className="text-center mb-12">
          <SectionLabel>Transparência</SectionLabel>
          <SectionTitle>Quais são as taxas do consórcio?</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '580px', margin: '12px auto 0' }}>
            O consórcio não tem juros, mas tem custos administrativos distribuídos ao longo do plano. Veja o que compõe a sua parcela.
          </p>
        </div>

        {/* Destaque sem juros */}
        <div style={{ background: 'linear-gradient(135deg, #0055c4 0%, #009cde 100%)', borderRadius: '20px', padding: '36px', color: '#fff', textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(48px, 8vw, 80px)', color: '#fff', lineHeight: 1 }}>0%</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginTop: '8px' }}>de juros</div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '10px', maxWidth: '420px', margin: '10px auto 0' }}>
            No consórcio não há cobrança de juros sobre o crédito — apenas taxas administrativas transparentes e previstas em contrato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: 'Taxa de Administração', icon: BadgePercent, bg: '#EFF6FF', ic: DARK_BLUE,
              desc: 'Remuneração da administradora pelos serviços prestados: organização dos grupos, assembleias, análise de crédito, gestão do fundo.',
              valor: '19% a 23% total (diluído nas parcelas)',
            },
            {
              title: 'Fundo de Reserva', icon: Shield, bg: '#F0FDF4', ic: '#15803D',
              desc: 'Fundo de segurança para cobrir eventuais inadimplências no grupo e garantir que os contemplados recebam a carta mesmo se houver atrasos.',
              valor: 'Em torno de 2% a 5% (varia por grupo)',
            },
            {
              title: 'Seguro de Vida', icon: HandCoins, bg: '#FFF7ED', ic: '#D97706',
              desc: 'Garante a quitação do saldo devedor em caso de morte ou invalidez permanente do consorciado — protegendo a família.',
              valor: 'Valor variável conforme perfil',
            },
            {
              title: 'Fundo Comum', icon: Coins, bg: '#F5F3FF', ic: '#7C3AED',
              desc: 'A maior parte da parcela vai para o fundo comum — o valor real que financia as contemplações mensais de todos os participantes do grupo.',
              valor: 'Parcela principal da mensalidade',
            },
          ].map(({ title, icon: Icon, bg, ic, desc, valor }) => (
            <div key={title} style={{ background: bg, borderRadius: '20px', padding: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <Icon size={18} style={{ color: ic }} />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: DARK }}>{title}</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65, marginBottom: '12px' }}>{desc}</p>
              <div style={{ background: '#fff', borderRadius: '10px', padding: '8px 12px', border: `1px solid ${ic}22` }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: ic }}>{valor}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sem taxa de adesão */}
      <section id="sem-adesao">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <SectionLabel>Economia</SectionLabel>
            <SectionTitle>Sem taxa de adesão</SectionTitle>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginTop: '16px', marginBottom: '20px' }}>
              Na Porto Vale, você <strong>não paga taxa de adesão</strong> para entrar em um grupo de consórcio. Diferente de algumas administradoras que cobram uma tarifa inicial, aqui você começa sem custos extras — pagando apenas a sua primeira parcela.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Entrada no grupo sem cobrança de adesão',
                'Primeira parcela já conta para o fundo comum',
                'Contrato transparente e sem surpresas',
                'Custo total previsto e distribuído nas mensalidades',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Check size={15} style={{ color: '#15803D', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#F9FAFB', borderRadius: '20px', padding: '32px', border: '1px solid #E5E7EB' }}>
            <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: DARK, marginBottom: '20px' }}>Comparativo de custo real</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Consórcio (taxa adm. 21% / 180 meses)', value: 'R$ 315.000', highlight: true },
                { label: 'Financiamento imóvel (juros 10% a.a. / 180 meses)', value: 'R$ 483.000', highlight: false },
                { label: 'Diferença (economia real com consórcio)', value: 'R$ 168.000', highlight: false, diff: true },
              ].map(({ label, value, highlight, diff }) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 16px', borderRadius: '12px',
                  background: highlight ? '#EFF6FF' : diff ? '#F0FDF4' : 'transparent',
                  border: highlight ? `1px solid ${DARK_BLUE}22` : diff ? '1px solid #15803D22' : '1px solid #E5E7EB',
                }}>
                  <span style={{ fontSize: '13px', color: '#374151', maxWidth: '60%', lineHeight: 1.4 }}>{label}</span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: highlight ? DARK_BLUE : diff ? '#15803D' : '#374151' }}>{value}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '12px', lineHeight: 1.4 }}>
              *Simulação para crédito de R$ 300.000. Valores aproximados, para fins ilustrativos.
            </p>
          </div>
        </div>
      </section>

      {/* Segurança */}
      <section id="seguranca">
        <div className="text-center mb-12">
          <SectionLabel>Regulamentação</SectionLabel>
          <SectionTitle>O seu dinheiro está seguro</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: 'Regulado pelo Banco Central', icon: Landmark, bg: '#EFF6FF', ic: DARK_BLUE,
              desc: 'Toda administradora de consórcio precisa de autorização do BACEN. A Porto Vale é administrada pela Porto Seguro, uma das maiores seguradoras do Brasil, fundada em 1945.',
            },
            {
              title: 'Lei nº 11.795/2008', icon: Shield, bg: '#F0FDF4', ic: '#15803D',
              desc: 'A Lei do Consórcio define direitos e deveres de todos os participantes, regras de contemplação, assembleias, taxas e condições para encerramento do grupo.',
            },
            {
              title: 'Fundo de Reserva', icon: BadgePercent, bg: '#FFF7ED', ic: '#D97706',
              desc: 'Cada grupo tem um fundo de reserva para cobrir inadimplências. Isso garante que contemplações aconteçam mesmo que alguns membros atrasem pagamentos.',
            },
          ].map(({ title, icon: Icon, bg, ic, desc }) => (
            <div key={title} style={{ background: bg, borderRadius: '20px', padding: '28px', border: '1px solid rgba(0,0,0,0.04)' }}>
              <IconBox icon={Icon} bg="#fff" ic={ic} />
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: DARK, marginBottom: '10px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* Chapter 5: Consórcio como Investimento ────────────────────────── */
function ChapterInvestimento() {
  return (
    <div className="flex flex-col gap-20">

      {/* Por que é investimento */}
      <section id="investimento">
        <div className="text-center mb-12">
          <SectionLabel>Estratégia financeira</SectionLabel>
          <SectionTitle>Consórcio como investimento</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0' }}>
            Muito além de uma forma de comprar um bem, o consórcio é uma das estratégias mais inteligentes de construção de patrimônio. Entenda por quê.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '20px' }}>
              O consórcio é uma modalidade de <strong>poupança forçada com remuneração acima da inflação</strong>. Ao contrário de guardar dinheiro na poupança (que perde valor real com a inflação), o consórcio garante que seu crédito seja corrigido pelo índice do bem — geralmente INCC (imóveis) ou IPCA.
            </p>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '20px' }}>
              Isso significa que se você comprar uma cota de R$ 200.000 hoje, ao longo dos anos esse valor será reajustado para acompanhar a valorização real do bem — <strong>protegendo seu poder de compra</strong>.
            </p>
            <div style={{ background: '#EFF6FF', borderRadius: '16px', padding: '20px', border: `1px solid ${DARK_BLUE}22` }}>
              <p style={{ fontSize: '14px', color: DARK_BLUE, lineHeight: 1.7, fontWeight: 500 }}>
                Além disso, quem é contemplado com uma carta de imóvel pode comprar o bem à vista e <strong>repassá-lo por um valor maior</strong> — lucrando a diferença. Essa é uma estratégia legítima de multiplicação de patrimônio.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { title: 'Correção pelo índice do bem', desc: 'O crédito acompanha a valorização real do ativo — não perde para a inflação.', icon: TrendingUp, bg: '#EFF6FF', ic: DARK_BLUE },
              { title: 'Disciplina financeira', desc: 'Parcelas mensais criam o hábito de poupança — ideal para quem tem dificuldade de guardar dinheiro.', icon: PiggyBank, bg: '#F0FDF4', ic: '#15803D' },
              { title: 'Compra à vista = poder de negociação', desc: 'A carta de crédito tem o mesmo efeito de dinheiro em espécie — você consegue descontos reais.', icon: Wallet, bg: '#FFF7ED', ic: '#D97706' },
              { title: 'Baixo custo total', desc: 'Taxa administrativa de 19–23% ao longo de todo o plano é muito menor do que os juros de um financiamento.', icon: Coins, bg: '#F5F3FF', ic: '#7C3AED' },
            ].map(({ title, desc, icon: Icon, bg, ic }) => (
              <div key={title} style={{ background: bg, borderRadius: '16px', padding: '18px 20px', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <Icon size={16} style={{ color: ic }} />
                </div>
                <div>
                  <strong style={{ fontSize: '14px', color: DARK }}>{title}</strong>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '3px', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vs poupança */}
      <section id="vs-poupanca">
        <div className="text-center mb-12">
          <SectionLabel>Comparativo</SectionLabel>
          <SectionTitle>Consórcio vs Poupança</SectionTitle>
        </div>

        <div style={{ background: '#F9FAFB', borderRadius: '24px', padding: '36px 40px', border: '1px solid #E5E7EB' }}>
          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CA3AF' }}>Critério</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: DARK_BLUE, background: '#EFF6FF', borderRadius: '8px 8px 0 0' }}>Consórcio</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#6B7280' }}>Poupança</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Proteção contra inflação',  cOk: true,  fOk: false, cTxt: 'Sim (índice do bem)',       fTxt: 'Parcial (frequentemente negativa)' },
                  { label: 'Disciplina de poupança',    cOk: true,  fOk: false, cTxt: 'Sim (parcela mensal)',      fTxt: 'Depende da disciplina' },
                  { label: 'Rentabilidade real',        cOk: true,  fOk: false, cTxt: 'Alta (INCC/IPCA + ativo)', fTxt: 'Baixa (abaixo da inflação)' },
                  { label: 'Liquidez',                  cOk: false, fOk: true,  cTxt: 'Baixa (comprometimento)',  fTxt: 'Alta (resgate imediato)' },
                  { label: 'Formação de patrimônio',    cOk: true,  fOk: false, cTxt: 'Sim (bem concreto)',       fTxt: 'Sim (monetário)' },
                  { label: 'Retorno previsível',        cOk: true,  fOk: false, cTxt: 'Sim (valor da carta)',     fTxt: 'Variável' },
                ].map(({ label, cOk, fOk, cTxt, fTxt }, i) => (
                  <tr key={label} style={{ borderTop: '1px solid #E5E7EB', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                    <td style={{ padding: '13px 16px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>{label}</td>
                    <td style={{ padding: '13px 16px', textAlign: 'center', background: '#EFF6FF' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                        {cOk ? <Check size={15} style={{ color: '#16A34A' }} /> : <XIcon size={15} style={{ color: '#9CA3AF' }} />}
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>{cTxt}</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                        {fOk ? <Check size={15} style={{ color: '#16A34A' }} /> : <XIcon size={15} style={{ color: '#9CA3AF' }} />}
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{fTxt}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Vantagens detalhadas */}
      <section id="vantagens">
        <div style={{ backgroundColor: DARK, borderRadius: '28px', padding: '56px 48px' }}>
          <div className="text-center mb-12">
            <SectionLabel>Por que escolher</SectionLabel>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#fff', lineHeight: 1.15, letterSpacing: '-0.025em', marginTop: '8px' }}>
              Vantagens do consórcio Porto Vale
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: BadgePercent, title: '0% de juros', stat: 'Economia real', desc: 'Nenhum centavo de juros. Você paga apenas a taxa administrativa — muito menor que qualquer financiamento.', bg: 'rgba(0,85,196,0.2)', ic: BLUE },
              { icon: Shield,       title: 'Sem entrada',  stat: 'Acessibilidade',  desc: 'Não é necessário ter reserva inicial. Comece com parcelas a partir de R$ 349/mês.', bg: 'rgba(21,128,61,0.2)', ic: '#4ADE80' },
              { icon: TrendingUp,   title: 'Correção real', stat: 'Proteção',       desc: 'Seu crédito é corrigido pelo INCC ou IPCA — mantendo o poder de compra ao longo do plano.', bg: 'rgba(217,119,6,0.2)', ic: '#FCD34D' },
              { icon: Wallet,       title: 'Compra à vista', stat: 'Negociação',   desc: 'A carta de crédito tem o mesmo poder de dinheiro em espécie. Você consegue descontos que a maioria não consegue.', bg: 'rgba(124,58,237,0.2)', ic: '#C4B5FD' },
              { icon: Clock,        title: 'Até 200 meses', stat: 'Flexibilidade', desc: 'Prazos longos permitem parcelas acessíveis sem comprometer o orçamento mensal.', bg: 'rgba(0,156,222,0.2)', ic: BLUE },
              { icon: Trophy,       title: 'Troféu Recorde 2025', stat: 'Reconhecimento', desc: 'Porto Vale: 20 mil cotas vendidas em 2025 e R$ 5,1 bilhões movimentados — um marco histórico.', bg: 'rgba(234,179,8,0.2)', ic: '#FCD34D' },
            ].map(({ icon: Icon, title, stat, desc, bg, ic }) => (
              <div key={title} style={{ background: bg, borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <Icon size={18} style={{ color: ic }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{stat}</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', color: '#fff', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* Chapter 6: A Porto Vale ───────────────────────────────────────── */
function ChapterPortoVale() {
  return (
    <div className="flex flex-col gap-20">

      {/* Sobre a Porto Vale */}
      <section id="sobre-portovale">
        <div className="text-center mb-12">
          <SectionLabel>Quem somos</SectionLabel>
          <SectionTitle>A Porto Vale Consórcio</SectionTitle>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0' }}>
            Uma empresa com a solidez da Porto Seguro e a expertise de quem faz consórcio há décadas — dedicada a ajudar você a conquistar seus objetivos.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { v: '20 mil', l: 'cotas vendidas em 2025' },
            { v: 'R$ 5,1bi', l: 'movimentados' },
            { v: '1945', l: 'fundação da Porto Seguro' },
            { v: 'BACEN', l: 'autorizada e fiscalizada' },
          ].map(({ v, l }) => (
            <div key={l} style={{ background: '#F9FAFB', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(20px, 3vw, 28px)', color: DARK_BLUE }}>{v}</div>
              <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px', lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '16px' }}>
              A <strong>Porto Vale Consórcio</strong> é a operação de consórcios da Porto Seguro, uma das maiores e mais respeitadas seguradoras do Brasil. Com mais de 75 anos de história desde a fundação da Porto Seguro em 1945, a empresa traz solidez, credibilidade e experiência para cada contrato.
            </p>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '16px' }}>
              Somos uma administradora autorizada pelo Banco Central do Brasil, o que garante que todos os grupos de consórcio operam dentro das normas da Lei nº 11.795/2008. Nossa missão é fazer você conquistar o seu bem com segurança, transparência e as melhores condições do mercado.
            </p>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8 }}>
              Em 2025, a Porto Vale atingiu um marco histórico: <strong>20.000 cotas vendidas</strong> e <strong>R$ 5,1 bilhões em créditos movimentados</strong>, conquistando o Troféu Recorde de Vendas — reconhecimento da indústria pela excelência em resultados.
            </p>
          </div>
          <div style={{ background: '#F9FAFB', borderRadius: '20px', padding: '28px', border: '1px solid #E5E7EB' }}>
            <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: DARK, marginBottom: '18px' }}>Por que confiar na Porto Vale?</h4>
            {[
              'Autorizada e fiscalizada pelo Banco Central',
              'Administração pela Porto Seguro (fundada 1945)',
              'Transparência total nas taxas e contratos',
              'Atendimento personalizado em todo o Brasil',
              'Especialistas disponíveis via WhatsApp',
              'Troféu Recorde de Vendas 2025',
              'Parcelas a partir de R$ 349/mês',
              'Sem taxa de adesão',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <CheckCircle size={15} style={{ color: '#15803D', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#374151' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* História do consórcio */}
      <section id="historia">
        <div style={{ backgroundColor: DARK, borderRadius: '28px', padding: '56px 48px' }}>
          <div className="text-center mb-14">
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE }}>Linha do tempo</span>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#fff', lineHeight: 1.15, letterSpacing: '-0.025em', marginTop: '8px' }}>
              A história do consórcio no Brasil
            </h2>
          </div>
          <div className="max-w-2xl mx-auto flex flex-col gap-0">
            {[
              { year: '1945', title: 'Porto Seguro é fundada', desc: 'Em São Paulo, nasce a Porto Seguro, empresa que décadas depois liderará o mercado de consórcios no Brasil.' },
              { year: '1961', title: 'Nascimento do consórcio', desc: 'Os funcionários do Banco do Brasil Luiz Henrique Horta e José Francisco Costa Meirelles criam o primeiro sistema de consórcio do país, em Brasília, para aquisição de automóveis.' },
              { year: '1967', title: 'Regulamentação inicial', desc: 'O governo federal começa a regulamentar os consórcios, estabelecendo as primeiras normas para o funcionamento dos grupos.' },
              { year: '1976', title: 'Porto Seguro entra no consórcio', desc: 'A Porto Seguro lança suas operações de consórcio, trazendo solidez e credibilidade para o setor.' },
              { year: '1991', title: 'Expansão para imóveis', desc: 'O consórcio passa a ser utilizado para a aquisição de imóveis, democratizando ainda mais o acesso à casa própria.' },
              { year: '2008', title: 'Lei do Consórcio', desc: 'A Lei nº 11.795/2008 estabelece o marco regulatório definitivo do setor — com regras claras, direitos e deveres para todos os participantes.' },
              { year: '2021', title: 'Expansão digital', desc: 'O consórcio se consolida no ambiente digital. Porto Vale amplia o atendimento online, facilitando a adesão de novos consorciados em todo o Brasil.' },
              { year: '2025', title: 'Marco histórico Porto Vale', desc: '20.000 cotas vendidas, R$ 5,1 bilhões movimentados e Troféu Recorde de Vendas — o maior resultado da história da Porto Vale.' },
            ].map(({ year, title, desc }, i, arr) => (
              <div key={year} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: DARK_BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{year}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />}
                </div>
                <div style={{ paddingTop: '12px', paddingBottom: i < arr.length - 1 ? '12px' : '0' }}>
                  <strong style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#fff' }}>{title}</strong>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '4px', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="text-center mb-12">
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <SectionTitle>Perguntas frequentes</SectionTitle>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {[
            { q: 'Posso cancelar o consórcio depois de entrar?', a: 'Sim, mas há regras. O consorciado desistente fica excluído do grupo e tem direito a receber de volta os valores pagos ao fundo comum, descontadas as taxas administrativas. A devolução ocorre por sorteio, até o encerramento do grupo, ou imediatamente em caso de contemplação por sorteio.' },
            { q: 'O que acontece se eu atrasar uma parcela?', a: 'Parcelas em atraso implicam multa e juros moratórios previstos em contrato. Se o consorciado estiver inadimplente na data da assembleia, não poderá ser contemplado por sorteio (mas pode oferecer lance). Atrasos persistentes podem resultar em exclusão do grupo.' },
            { q: 'Posso transferir minha cota para outra pessoa?', a: 'Sim! A cota de consórcio pode ser transferida para outra pessoa física ou jurídica, desde que a administradora aprove a transferência. O cessionário assume todas as obrigações e direitos do contrato original.' },
            { q: 'Qual é o prazo para eu usar a carta após a contemplação?', a: 'Após a contemplação e aprovação de crédito, normalmente há um prazo definido em contrato para indicar o bem e concluir a compra. Consulte sempre sua administradora para os prazos específicos do seu grupo.' },
            { q: 'Posso usar a carta para comprar um bem de outra pessoa (parente)?', a: 'Não. A carta de crédito deve ser utilizada para a aquisição de um bem em nome do próprio consorciado. Excepcionalmente, o bem pode ser registrado em nome do cônjuge, mas isso depende das regras do grupo e da administradora.' },
            { q: 'O que é assembleia de consorciados?', a: 'É a reunião mensal onde acontecem os sorteios e a sessão de lances. Todos os consorciados são convocados (por carta, e-mail ou app). As atas das assembleias são registradas e disponibilizadas para todos os participantes.' },
            { q: 'Posso participar de mais de um grupo ao mesmo tempo?', a: 'Sim! Não há limite para o número de cotas que uma pessoa pode ter. Muitos consorciados usam múltiplos grupos como estratégia de investimento e diversificação patrimonial.' },
            { q: 'E se a administradora falir?', a: 'O Banco Central fiscaliza rigorosamente as administradoras. Em caso de intervenção ou liquidação, o BACEN nomeia um interventor para proteger os consorciados. Os fundos dos grupos são separados do patrimônio da administradora, o que oferece uma camada adicional de proteção.' },
          ].map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>
      </section>

    </div>
  );
}

/* ─── CHAPTER CONFIG ─────────────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 0, label: 'O Básico', shortLabel: 'O Básico',
    desc: 'O que é, vs financiamento, o que comprar',
    sections: ['O que é', 'Vs Financiamento', 'O que comprar'],
    component: ChapterBasico,
  },
  {
    id: 1, label: 'Como Participar', shortLabel: 'Participar',
    desc: 'Quem pode, grupos, documentação',
    sections: ['Quem pode', 'Grupos', 'Documentação'],
    component: ChapterParticipar,
  },
  {
    id: 2, label: 'Contemplação & Lances', shortLabel: 'Lances',
    desc: 'Passo a passo, sorteio, tipos de lance, FGTS',
    sections: ['Passo a passo', 'Sorteio vs Lance', 'Tipos de lance'],
    component: ChapterContemplacao,
  },
  {
    id: 3, label: 'Carta de Crédito', shortLabel: 'Carta',
    desc: 'Pós-contemplação, uso da carta, casos especiais',
    sections: ['Pós-contemplação', 'Como usar', 'Carta contemplada'],
    component: ChapterCarta,
  },
  {
    id: 4, label: 'Custos & Segurança', shortLabel: 'Custos',
    desc: 'Taxas, sem adesão, regulamentação',
    sections: ['Taxas', 'Sem adesão', 'Segurança'],
    component: ChapterCustos,
  },
  {
    id: 5, label: 'Como Investimento', shortLabel: 'Investimento',
    desc: 'Vantagens, vs poupança, por que consórcio',
    sections: ['Por que investir', 'Vs poupança', 'Vantagens'],
    component: ChapterInvestimento,
  },
  {
    id: 6, label: 'A Porto Vale', shortLabel: 'Porto Vale',
    desc: 'Sobre a empresa, história, FAQ',
    sections: ['Sobre nós', 'História', 'FAQ'],
    component: ChapterPortoVale,
  },
];

/* ─── MAIN ───────────────────────────────────────────────────────── */
export function GuiaConsorcio() {
  const [chapter, setChapter] = useState(0);
  const navigate = useNavigate();

  const switchChapter = (idx: number) => {
    setChapter(idx);
    setTimeout(() => {
      document.getElementById('guia-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const current = CHAPTERS[chapter];
  const ChapterComponent = current.component;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#F9FAFB' }}>
      <Header />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: DARK, paddingTop: '68px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">

            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '5px 14px', borderRadius: '999px',
              background: 'rgba(0,156,222,0.12)', border: '1px solid rgba(0,156,222,0.3)',
              color: BLUE, fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              <BookOpen size={12} /> Guia Completo em 7 Capítulos
            </span>

            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 68px)', color: '#fff',
              lineHeight: 1.06, letterSpacing: '-0.03em',
            }}>
              Tudo sobre{' '}
              <em style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: BLUE }}>
                consórcio
              </em>
              {' '}em um só lugar
            </h1>

            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: '520px' }}>
              Do primeiro pagamento até a conquista do seu bem — entenda cada etapa, como dar lances, o que fazer após a contemplação e por que o consórcio é um dos melhores investimentos do Brasil.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-10 mt-2">
              {[
                { v: '10M+', l: 'participantes ativos no Brasil' },
                { v: '60+',  l: 'anos de história' },
                { v: '0%',   l: 'de juros' },
              ].map(({ v, l }) => (
                <div key={l} className="flex flex-col items-center gap-1">
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '28px', color: '#fff' }}>{v}</span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{l}</span>
                </div>
              ))}
            </div>

            {/* Chapter pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {CHAPTERS.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => switchChapter(ch.id)}
                  style={{
                    padding: '6px 14px', borderRadius: '999px', cursor: 'pointer',
                    background: chapter === ch.id ? BLUE : 'rgba(255,255,255,0.06)',
                    border: chapter === ch.id ? `1px solid ${BLUE}` : '1px solid rgba(255,255,255,0.1)',
                    color: chapter === ch.id ? '#fff' : 'rgba(255,255,255,0.65)',
                    fontSize: '12px', fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                >
                  {ch.shortLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER NAV BAR ───────────────────────────────────────── */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: '68px', zIndex: 40 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="overflow-x-auto">
            <div style={{ display: 'flex', gap: '0', minWidth: 'max-content' }}>
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => switchChapter(ch.id)}
                  style={{
                    padding: '16px 20px', fontSize: '13px', fontWeight: chapter === ch.id ? 600 : 500,
                    color: chapter === ch.id ? DARK_BLUE : '#6B7280',
                    borderBottom: chapter === ch.id ? `2px solid ${DARK_BLUE}` : '2px solid transparent',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <span style={{ marginRight: '6px', fontSize: '11px', color: chapter === ch.id ? BLUE : '#D1D5DB' }}>
                    {String(ch.id + 1).padStart(2, '0')}
                  </span>
                  {ch.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────── */}
      <div id="guia-content" style={{ scrollMarginTop: '130px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 lg:py-24">

          {/* Chapter header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-8" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: BLUE, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Capítulo {chapter + 1} de {CHAPTERS.length}
              </div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: DARK, lineHeight: 1.2 }}>
                {current.label}
              </h2>
              <p style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '4px' }}>{current.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {current.sections.map(s => (
                <span key={s} style={{ padding: '4px 12px', borderRadius: '999px', background: '#F3F4F6', fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Chapter content */}
          <ChapterComponent />

          {/* Navigation buttons */}
          <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => chapter > 0 && switchChapter(chapter - 1)}
              disabled={chapter === 0}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 20px', borderRadius: '999px',
                background: chapter === 0 ? '#F3F4F6' : '#fff',
                border: `1.5px solid ${chapter === 0 ? '#E5E7EB' : '#D1D5DB'}`,
                color: chapter === 0 ? '#D1D5DB' : '#374151',
                fontSize: '14px', fontWeight: 500, cursor: chapter === 0 ? 'default' : 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <ArrowLeft size={16} />
              {chapter > 0 ? CHAPTERS[chapter - 1].shortLabel : 'Início'}
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {CHAPTERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => switchChapter(i)}
                  style={{
                    width: i === chapter ? '24px' : '8px',
                    height: '8px', borderRadius: '999px',
                    background: i === chapter ? DARK_BLUE : '#E5E7EB',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => chapter < CHAPTERS.length - 1 && switchChapter(chapter + 1)}
              disabled={chapter === CHAPTERS.length - 1}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 20px', borderRadius: '999px',
                background: chapter === CHAPTERS.length - 1 ? '#F3F4F6' : DARK_BLUE,
                border: `1.5px solid ${chapter === CHAPTERS.length - 1 ? '#E5E7EB' : DARK_BLUE}`,
                color: chapter === CHAPTERS.length - 1 ? '#D1D5DB' : '#fff',
                fontSize: '14px', fontWeight: 600, cursor: chapter === CHAPTERS.length - 1 ? 'default' : 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {chapter < CHAPTERS.length - 1 ? CHAPTERS[chapter + 1].shortLabel : 'Fim'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 text-center">
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '16px' }}>
            Pronto para começar?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 36px' }}>
            Fale com um especialista da Porto Vale e descubra qual plano é ideal para você — sem compromisso e sem taxa de adesão.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '999px',
                background: '#25D366', color: '#fff',
                fontSize: '15px', fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
              }}
            >
              <MessageCircle size={18} />
              Falar com especialista
            </a>
            <button
              onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '999px',
                background: 'rgba(255,255,255,0.08)', color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.2)',
                fontSize: '15px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Simular parcelas
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
