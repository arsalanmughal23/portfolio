import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- width map ---------- */
const MAX_WIDTH_CLASSES = {
  sm: "max-w-lg",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  "2xl": "max-w-6xl",
} as const;
type ModalSize = keyof typeof MAX_WIDTH_CLASSES;

type ModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: ModalSize;
};

export function Modal({
  isOpen,
  onOpenChange,
  title,
  subtitle,
  children,
  maxWidth = "lg",
}: ModalProps) {
  /* ---------- Body scroll lock (belt & suspenders) ---------- */
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  /* ---------- Escape key ---------- */
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onOpenChange]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange} modal>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal keepMounted>
            {/* ---------- Backdrop ---------- */}
            <DialogPrimitive.Backdrop
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              }
            />

            {/* ---------- Centering shell ---------- */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-hidden pointer-events-none">
              <DialogPrimitive.Popup
                className={cn(
                  "pointer-events-auto relative flex flex-col w-full",
                  "max-h-[90vh] overflow-hidden rounded-3xl",
                  "border-2 border-[#111111] bg-[#F9F9F9] shadow-2xl outline-none",
                  MAX_WIDTH_CLASSES[maxWidth],
                )}
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 24 }}
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 30,
                      mass: 0.9,
                    }}
                  />
                }
              >
                {/* ---------- Header (pinned) ---------- */}
                <div className="shrink-0 p-6 md:p-8 border-b border-[#111111]/10 flex items-center justify-between bg-white">
                  <div>
                    {subtitle && (
                      <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest block">
                        {subtitle}
                      </span>
                    )}
                    <DialogPrimitive.Title className="text-2xl md:text-3xl font-black">
                      {title}
                    </DialogPrimitive.Title>
                  </div>

                  {/* Single, custom close button */}
                  <DialogPrimitive.Close
                    className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center bg-[#111111] text-[#F9F9F9] hover:bg-[#CCFF00] hover:text-[#111111] transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </DialogPrimitive.Close>
                </div>

                {/* ---------- Body (only scrollable region) ---------- */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
                  {children}
                </div>
              </DialogPrimitive.Popup>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
