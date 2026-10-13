import type { CertificateType } from "@/data/certificates";
import type { ProjectType } from "@/data/projects";
import { motion, AnimatePresence } from "motion/react";

export type PreviewItemType = ProjectType | CertificateType;

export default function FloatingPreview({
  previewItem,
  mousePosition,
  hasCursorText,
}: {
  previewItem: PreviewItemType | null;
  mousePosition: { x: number; y: number };
  hasCursorText: boolean;
}) {
  return (
    <AnimatePresence>
      {previewItem && previewItem?.previewImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: mousePosition.x + (hasCursorText ? 15 : 8),
            y: mousePosition.y - (hasCursorText ? 100 : 8),
          }}
          exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-0 left-0 pointer-events-none z-[60] hidden lg:block w-[320px] h-[200px] rounded-xl overflow-hidden border-2 border-[#111111] shadow-2xl bg-[#111111]"
        >
          <img
            src={previewItem.previewImage}
            alt={previewItem.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
          <span className="absolute bottom-3 left-3 text-xs font-mono text-[#CCFF00] font-bold">
            SYSTEM PREVIEW
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
