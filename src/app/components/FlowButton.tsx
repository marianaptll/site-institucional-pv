import { ArrowRight } from 'lucide-react';

interface FlowButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Botão animado com efeito de círculo expansivo.
 *
 * Default: fundo azul claro (#009cde), texto branco.
 * Hover: círculo azul escuro (#1E3A8A) expande do centro,
 *        seta entra pela esquerda, seta direita sai pelo lado,
 *        texto desloca para a direita, cantos mudam de pill para rounded.
 *
 * Para trocar as cores, edite:
 *   - bg-[#009cde]          → cor de fundo padrão
 *   - bg-[#111827]          → cor do círculo no hover (mesmo fundo da section A Porto Vale)
 *   - stroke-white          → cor das setas (sempre brancas sobre fundo colorido)
 */
export function FlowButton({ text = 'Faça sua simulação', onClick, className = '' }: FlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-transparent bg-[#009cde] px-6 py-[9px] text-sm font-semibold text-white cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] active:scale-[0.95] ${className}`}
    >
      {/* Seta esquerda — entra da esquerda no hover */}
      <ArrowRight
        className="absolute w-4 h-4 left-[-25%] fill-none z-[9] stroke-white group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      />

      {/* Texto — desloca levemente para a direita no hover */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out whitespace-nowrap">
        {text}
      </span>

      {/* Círculo azul escuro que expande do centro */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#111827] rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]" />

      {/* Seta direita — sai pela direita no hover */}
      <ArrowRight
        className="absolute w-4 h-4 right-4 fill-none z-[9] stroke-white group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      />
    </button>
  );
}
