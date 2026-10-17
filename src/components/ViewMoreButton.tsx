import { CaretRightIcon } from "@phosphor-icons/react";

const VARIANT_CLASSES = {
  light:
    "inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full border border-[#111111] bg-white hover:bg-[#CCFF00] transition-colors shadow-[3px_3px_0px_0px_#111111]",
  dark: "inline-flex items-center gap-3 bg-[#111111] text-[#F9F9F9] font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full border border-[#111111] hover:bg-[#CCFF00] hover:text-[#111111] transition-all shadow-[4px_4px_0px_0px_#CCFF00]",
};

type ButtonVariant = keyof typeof VARIANT_CLASSES;

type ViewMoreButtonProps = {
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  label?: string;
  variant?: ButtonVariant;
};

export function ViewMoreButton({
  onClick,
  onMouseEnter,
  onMouseLeave,
  label = "View More",
  variant = "light",
}: ViewMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={VARIANT_CLASSES[variant]}
    >
      {label} <CaretRightIcon className="w-4 h-4" />
    </button>
  );
}
