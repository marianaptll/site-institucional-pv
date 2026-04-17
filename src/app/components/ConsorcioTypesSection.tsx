import { ArrowUpRight, Home, Car, Bike, Briefcase } from 'lucide-react';
import { SectionLabel } from './SectionLabel';

const types = [
  {
    icon: Home,
    label: 'Imóvel',
    maxCredit: 'Até R$ 500.000',
    description: 'Casa, apartamento, terreno ou imóvel comercial — tudo com carta de crédito.',
    tags: ['Residencial', 'Comercial', 'Terreno'],
    color: '#2563EB',
    large: true,
  },
  {
    icon: Car,
    label: 'Automóvel',
    maxCredit: 'Até R$ 120.000',
    description: 'Carro novo ou seminovo, caminhonete, utilitários e mais.',
    tags: ['Novo', 'Seminovo', 'Utilitário'],
    color: '#7C3AED',
    large: false,
  },
  {
    icon: Bike,
    label: 'Moto',
    maxCredit: 'Até R$ 30.000',
    description: 'Motocicletas, scooters e motos elétricas das melhores marcas.',
    tags: ['Urbana', 'Sport', 'Elétrica'],
    color: '#D97706',
    large: false,
  },
  {
    icon: Briefcase,
    label: 'Serviços',
    maxCredit: 'Até R$ 30.000',
    description: 'Viagens, reformas, educação, saúde e muito mais.',
    tags: ['Viagem', 'Reforma', 'Educação'],
    color: '#16A34A',
    large: false,
  },
];

function TypeCard({
  type,
  span,
}: {
  type: typeof types[number];
  span: 'large' | 'normal';
}) {
  const Icon = type.icon;
  return (
    <div
      className={`relative rounded-2xl overflow-hidden group cursor-pointer ${span === 'large' ? 'row-span-2' : ''}`}
      style={{ minHeight: span === 'large' ? '420px' : '196px' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundColor: type.color, opacity: 0.85 }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Top row */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm text-white text-[12px] font-semibold"
          style={{ backgroundColor: type.color, fontFamily: "'Inter', sans-serif" }}
        >
          <Icon size={13} />
          {type.label}
        </div>
        <button
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors duration-200"
          aria-label={`Ver consórcio ${type.label}`}
        >
          <ArrowUpRight size={16} color="#FFFFFF" />
        </button>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div
          className="text-[13px] text-white/60 mb-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {type.maxCredit}
        </div>
        <h3
          className="text-white mb-2"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: span === 'large' ? '20px' : '15px',
          }}
        >
          {type.description}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {type.tags.map((tag, j) => (
            <span
              key={j}
              className="text-[11px] px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConsorcioTypesSection() {
  const [imovel, ...rest] = types;

  return (
    <section
      id="tipos"
      className="py-24 px-4 sm:px-8 lg:px-16 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <SectionLabel>Tipos de consórcio</SectionLabel>
            <h2
              className="text-[36px] leading-[1.15]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
            >
              <span className="block text-[#111827] dark:text-white">Escolha o plano</span>
              <span className="block text-[#2563EB]">ideal para você</span>
            </h2>
          </div>
          <button
            onClick={() => document.getElementById('simulacao')?.scrollIntoView({ behavior: 'smooth' })}
            className="self-start mt-2 inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13px] font-medium rounded-lg px-5 py-2.5 transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Simular agora
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mosaic Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Large left card — imóvel */}
          <div className="md:row-span-2">
            <TypeCard type={imovel} span="large" />
          </div>

          {/* 3 smaller right cards */}
          {rest.map((type, i) => (
            <TypeCard key={i} type={type} span="normal" />
          ))}
        </div>

      </div>
    </section>
  );
}