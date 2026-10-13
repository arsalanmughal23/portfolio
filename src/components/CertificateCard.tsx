import type { CertificateType } from "@/data/certificates";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

type CertificateCardProps = {
  cert: CertificateType;
  index?: number;
  onVerifyHoverStart?: () => void;
  onVerifyHoverEnd?: () => void;
};

export default function CertificateCard({
  cert,
  index = 0,
  onVerifyHoverStart,
  onVerifyHoverEnd,
}: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="p-8 rounded-2xl border border-[#111111]/15 bg-white/40 flex flex-col justify-between hover:border-[#111111] transition duration-300"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold bg-[#CCFF00] px-3 py-1 rounded-full border border-[#111111]">
            {cert.year}
          </span>
          <span className="text-xs font-mono text-[#111111]/60">{cert.issuer}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-2">{cert.title}</h3>

        <p className="text-xs font-mono text-[#111111]/60 mb-6">ID: {cert.credentialId}</p>
      </div>

      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onVerifyHoverStart}
        onMouseLeave={onVerifyHoverEnd}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider hover:text-[#CCFF00] hover:bg-[#111111] px-4 py-2 rounded-lg border border-[#111111] w-fit transition-colors"
      >
        Verify Credential <ArrowSquareOutIcon className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}
