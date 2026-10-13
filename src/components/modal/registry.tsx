import type { ReactNode } from "react";
import { CERTIFICATES, PROJECTS } from "@/data";
import ProjectCard from "@/components/ProjectCard";
import CertificateCard from "@/components/CertificateCard";
import type { ModalSizeType } from "@/components/modal/Modal";
import type { PreviewItemType } from "@/components/FloatingPreview";

export type ModalKey = "projects" | "certifications";

type ModalEntry = {
  title: string;
  subtitle?: string;
  maxWidth?: ModalSizeType;
  render: (ctx: ModalRenderCtx) => ReactNode;
};

type ModalRenderCtx = {
  onPreviewStart: (item: PreviewItemType, text: string) => void;
  onPreviewEnd: () => void;
};

export const MODAL_REGISTRY: Record<ModalKey, ModalEntry> = {
  projects: {
    title: "FULL PROJECT ARCHIVE",
    subtitle: "Complete Repository",
    maxWidth: "lg",
    render: ({ onPreviewStart, onPreviewEnd }) =>
      PROJECTS.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          variant="archive"
          onHoverStart={() => onPreviewStart(project, "VIEW")}
          onHoverEnd={onPreviewEnd}
        />
      )),
  },
  certifications: {
    title: "VIEW CERTIFICATIONS",
    subtitle: "Verified Credentials",
    maxWidth: "2xl",
    render: ({ onPreviewStart, onPreviewEnd }) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CERTIFICATES.map((cert, i) => (
          <CertificateCard
            key={cert.id}
            cert={cert}
            index={i}
            onVerifyHoverStart={() => onPreviewStart(cert, "VERIFY")}
            onVerifyHoverEnd={onPreviewEnd}
          />
        ))}
      </div>
    ),
  },
};
