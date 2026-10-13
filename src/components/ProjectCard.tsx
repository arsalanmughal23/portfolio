import type { ProjectType } from "@/data/types";
import { displayId } from "@/lib/utils";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export default function ProjectCard({
  project,
  variant = "archive",
  onHoverStart,
  onHoverEnd,
}: {
  project: ProjectType;
  variant?: "featured" | "archive";
  onHoverStart?: (p: ProjectType) => void;
  onHoverEnd?: () => void;
}) {
  const isFeatured = variant === "featured";

  const handleEnter = () => {
    onHoverStart?.(project);
  };
  const handleLeave = () => {
    onHoverEnd?.();
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={
        isFeatured
          ? "group relative border border-[#111111]/15 bg-white/50 p-6 md:p-8 rounded-2xl hover:border-[#111111] hover:bg-[#CCFF00]/10 transition-all duration-300 cursor-pointer"
          : "border border-[#111111]/15 bg-white p-6 rounded-2xl hover:border-[#111111] transition-colors cursor-pointer"
      }
    >
      <div
        className={
          isFeatured
            ? "flex flex-col md:flex-row md:items-center justify-between gap-6"
            : "flex flex-col md:flex-row md:items-center justify-between gap-4"
        }
      >
        <div
          className={
            isFeatured
              ? "flex items-start md:items-center gap-6"
              : "flex items-start md:items-center gap-4"
          }
        >
          <span
            className={
              isFeatured
                ? "text-sm font-mono text-[#111111]/40 font-bold"
                : "text-xs font-mono text-[#111111]/40 font-bold"
            }
          >
            {displayId(project.id)}
          </span>
          <div>
            <span
              className={
                isFeatured
                  ? "text-xs font-mono text-[#111111]/60 uppercase tracking-wider mb-1 block"
                  : "text-[10px] font-mono text-[#111111]/60 uppercase tracking-wider block"
              }
            >
              {project.category}
            </span>
            <h3
              className={
                isFeatured
                  ? "text-2xl md:text-3xl font-bold group-hover:translate-x-2 transition-transform duration-300"
                  : "text-lg font-bold"
              }
            >
              {project.title}
            </h3>
            <p
              className={
                isFeatured
                  ? "text-sm text-[#111111]/70 mt-2 max-w-xl"
                  : "text-xs text-[#111111]/70 mt-1"
              }
            >
              {project.description}
            </p>
          </div>
        </div>

        <div
          className={
            isFeatured
              ? "flex items-center justify-between md:justify-end gap-6 w-full md:w-auto"
              : "flex items-center justify-between md:justify-end gap-4"
          }
        >
          <div
            className={isFeatured ? "flex flex-wrap gap-1.5 max-w-[200px]" : "flex flex-wrap gap-1"}
          >
            {project.tech.map((t, i) => (
              <span
                key={i}
                className={
                  isFeatured
                    ? "text-[10px] font-mono bg-[#111111]/5 border border-[#111111]/10 px-2 py-1 rounded"
                    : "text-[9px] font-mono bg-[#111111]/5 px-2 py-0.5 rounded border border-[#111111]/10"
                }
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isFeatured
                ? "w-12 h-12 rounded-full border border-[#111111] flex items-center justify-center bg-[#111111] text-[#F9F9F9] group-hover:bg-[#CCFF00] group-hover:text-[#111111] transition-colors shrink-0"
                : "w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center bg-[#111111] text-[#F9F9F9] hover:bg-[#CCFF00] hover:text-[#111111] transition-colors shrink-0"
            }
          >
            <ArrowUpRightIcon className={isFeatured ? "w-5 h-5" : "w-4 h-4"} />
          </a>
        </div>
      </div>
    </div>
  );
}
