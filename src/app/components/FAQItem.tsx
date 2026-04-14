import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQEntry {
  question: string;
  answer: string;
}

export function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border border-[#E5E7EB] rounded-xl overflow-hidden transition-shadow duration-200"
      style={{ backgroundColor: isOpen ? '#FFFFFF' : '#FAFAFA' }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="text-[14px] text-[#111827] leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: isOpen ? 700 : 600 }}
        >
          {faq.question}
        </span>
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          animate={{ backgroundColor: isOpen ? '#2563EB' : '#F3F4F6', rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Plus size={14} color={isOpen ? '#FFFFFF' : '#6B7280'} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
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
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
