import { motion } from "motion/react";

export default function CustomCursor({
  mousePosition,
  cursorText,
  isHovered,
}: {
  mousePosition: { x: number; y: number };
  cursorText: string;
  isHovered: boolean;
}) {
  const hasText = cursorText !== "";

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-[#111111] rounded-full pointer-events-none z-[70] hidden md:flex items-center justify-center text-[8px] font-mono font-bold text-[#111111]"
      animate={{
        x: mousePosition.x - (hasText ? 32 : 8),
        y: mousePosition.y - (hasText ? 32 : 8),
        scale: hasText ? 4 : isHovered ? 2.5 : 1,
        backgroundColor: hasText || isHovered ? "#CCFF00" : "#111111",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      {hasText && <span className="scale-[0.35] tracking-tighter uppercase">{cursorText}</span>}
    </motion.div>
  );
}
