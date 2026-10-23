import { CaretRightIcon } from "@phosphor-icons/react";

type ViewMoreButtonProps = {
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  label?: string;
};

export function ViewMoreButton({
  onClick,
  onMouseEnter,
  onMouseLeave,
  label = "View More",
}: ViewMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="inline-flex items-center gap-3 bg-[#111111] text-[#F9F9F9] font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full border border-[#111111] hover:bg-[#CCFF00] hover:text-[#111111] transition-all shadow-[4px_4px_0px_0px_#CCFF00]"
    >
      {label} <CaretRightIcon className="w-4 h-4" />
    </button>
  );
}