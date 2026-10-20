import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TerminalIcon, SparkleIcon } from "@phosphor-icons/react";

import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/BrandIcons";

import CustomCursor from "@/components/CustomCursor";
import FloatingPreview, { type PreviewItemType } from "@/components/FloatingPreview";

import { MODAL_REGISTRY, type ModalKey } from "@/components/modal/registry";
import { Modal } from "@/components/modal/Modal";
import { ViewMoreButton } from "@/components/ViewMoreButton";

import { ROLES, SKILLS, PROJECTS, CERTIFICATES } from "@/data";
import ProjectCard from "@/components/ProjectCard";
import CertificateCard from "@/components/CertificateCard";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import ContactSection from "@/components/ContactSection";
import Logo from "@/components/Logo";

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [activePreviewItem, setActivePreviewItem] = useState<PreviewItemType | null>(null);

  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
  const modal = activeModal ? MODAL_REGISTRY[activeModal] : null;

  const handlePreviewEnter = (previewItem: PreviewItemType, text: string) => {
    setActivePreviewItem(previewItem);
    setCursorText(text);
  };
  const handlePreviewLeave = () => {
    setActivePreviewItem(null);
    setCursorText("");
  };

  // Rotate roles in Hero smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Track mouse for custom brutalist cursor & floating preview
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-[#F9F9F9] text-[#111111] font-sans antialiased selection:bg-[#CCFF00] selection:text-[#111111] min-h-screen relative overflow-x-hidden">
      {/* Modal Box */}
      <Modal
        isOpen={activeModal !== null}
        onOpenChange={(open) => !open && setActiveModal(null)}
        title={modal?.title ?? ""}
        subtitle={modal?.subtitle}
        maxWidth={modal?.maxWidth ?? "lg"}
      >
        {modal?.render({
          onPreviewStart: handlePreviewEnter,
          onPreviewEnd: handlePreviewLeave,
        })}
      </Modal>

      {/* Custom Brutalist Follower Cursor */}
      <CustomCursor mousePosition={mousePosition} cursorText={cursorText} isHovered={isHovered} />

      {/* Floating Image Preview on Hover */}
      <FloatingPreview
        previewItem={activePreviewItem}
        mousePosition={mousePosition}
        hasCursorText={cursorText !== ""}
      />

      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#F9F9F9]/80 backdrop-blur-md border-b border-[#111111]/10 px-6 md:px-12 py-5 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a
            href="#projects"
            className="hover:opacity-60 transition"
            onMouseEnter={() => {
              setIsHovered(true);
              setCursorText("");
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            Works
          </a>
          <a
            href="#credentials"
            className="hover:opacity-60 transition"
            onMouseEnter={() => {
              setIsHovered(true);
              setCursorText("");
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            Credentials
          </a>
          <a
            href="#about"
            className="hover:opacity-60 transition"
            onMouseEnter={() => {
              setIsHovered(true);
              setCursorText("");
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            About
          </a>
        </nav>
        <a
          href="#contact"
          className="bg-[#111111] text-[#F9F9F9] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#CCFF00] hover:text-[#111111] border border-[#111111] transition duration-300"
          onMouseEnter={() => {
            setIsHovered(true);
            setCursorText("");
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          Let's Talk
        </a>
      </header>

      {/* Hero Section: Responsive layout with dynamic text rotation and flexible container height */}
      <section className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-[#CCFF00] border border-[#111111] px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase mb-6 shadow-[2px_2px_0px_0px_#111111]"
            >
              <TerminalIcon className="w-3.5 h-3.5" /> Backend Heavy Full-Stack Engineer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8 max-w-full"
            >
              I BUILD <br />
              <span className="relative block min-h-[1.2em] py-2">
                {/* Animated text rotation: Uses Framer Motion to swap roles with a slide-up/fade effect */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROLES[currentRoleIndex]}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute left-0 top-2 inline-block whitespace-nowrap max-w-full text-[#111111] underline decoration-[#CCFF00] decoration-wavy underline-offset-4 sm:underline-offset-8"
                  >
                    {ROLES[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-[#111111]/70 max-w-2xl font-normal leading-relaxed pt-4"
            >
              I build backend systems that don't crash when 10,000 people log in at once. I
              specialize in Node.js, relational database optimization, and high-performance APIs.
            </motion.p>
          </div>
        </div>

        {/* Quick Stats Grid under Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#111111]/10 pt-8"
        >
          <div>
            <span className="block text-3xl md:text-4xl font-black font-mono">03+</span>
            <span className="text-xs font-mono text-[#111111]/60 uppercase tracking-wider">
              Years Experience
            </span>
          </div>
          <div>
            <span className="block text-3xl md:text-4xl font-black font-mono">10+</span>
            <span className="text-xs font-mono text-[#111111]/60 uppercase tracking-wider">
              Production Systems
            </span>
          </div>
          <div>
            <span className="block text-3xl md:text-4xl font-black font-mono">04+</span>
            <span className="text-xs font-mono text-[#111111]/60 uppercase tracking-wider">
              Global Credentials
            </span>
          </div>
          <div>
            <span className="block text-3xl md:text-4xl font-black font-mono">100%</span>
            <span className="text-xs font-mono text-[#111111]/60 uppercase tracking-wider">
              Commitment to Code
            </span>
          </div>
        </motion.div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-[#111111] text-[#CCFF00] py-4 overflow-hidden border-y border-[#111111] whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-flex gap-12 font-mono text-sm tracking-widest uppercase font-bold"
        >
          {[...SKILLS, ...SKILLS].map((skill, index) => (
            <span key={index} className="inline-flex items-center gap-6">
              {skill} <span className="text-[#F9F9F9]/40">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Projects Section (Task 2 Fixed: Show first 3 + View Full Archive Button & Modal) */}
      <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#111111]/10 pb-6">
          <div>
            <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest block mb-2">
              Selected Works
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              FEATURED ARCHITECTURE
            </h2>
          </div>
          <p className="text-sm font-mono text-[#111111]/70 mt-4 md:mt-0">
            Hover to preview system snapshots
          </p>
        </div>

        <div className="space-y-4">
          {PROJECTS.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="featured"
              onHoverStart={(p) => {
                setActivePreviewItem(p);
                setIsHovered(true);
                setCursorText("VIEW");
              }}
              onHoverEnd={() => {
                setActivePreviewItem(null);
                setIsHovered(false);
                setCursorText("");
              }}
            />
          ))}
        </div>

        {/* View Full Archive Button */}
        <div className="mt-12 text-center">
          <ViewMoreButton
            label="View Full Project Archive"
            variant="dark"
            onClick={() => {
              setActivePreviewItem(null);
              setCursorText("");
              setActiveModal("projects");
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              setCursorText("OPEN");
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setCursorText("");
              setActivePreviewItem(null);
            }}
          />
        </div>
      </section>

      {/* Certifications Section (Task 3.1 Fixed: 2-column grid + Show More Accordion) */}
      <section
        id="credentials"
        className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#111111]/10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest block mb-2">
              Validation & Trust
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              PROFESSIONAL CERTIFICATIONS
            </h2>
          </div>
          <p className="text-sm font-mono text-[#111111]/70 mt-4 md:mt-0">
            Verified credentials & milestones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATES.slice(0, 4).map((cert, index) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              index={index}
              onVerifyHoverStart={() => {
                setActivePreviewItem(cert);
                setIsHovered(true);
                setCursorText("VERIFY");
              }}
              onVerifyHoverEnd={() => {
                setActivePreviewItem(null);
                setIsHovered(false);
                setCursorText("");
              }}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <ViewMoreButton
            label="View More Certifications"
            onClick={() => {
              setActivePreviewItem(null);
              setCursorText("");
              setActiveModal("certifications");
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              setCursorText("OPEN");
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setCursorText("");
              setActivePreviewItem(null);
            }}
          />
        </div>
      </section>

      {/* About Me Section (Split Screen) */}
      <section
        id="about"
        className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#111111]/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive Terminal replacing the old cliché card (Task 4) */}
          <div className="lg:col-span-5 h-[340px]">
            <InteractiveTerminal />
          </div>

          {/* Right: Conversational Bio & Pull Quotes */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest block">
              About Me
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Engineering systems that stand the test of concurrency and scale.
            </h2>
            <p className="text-base md:text-lg text-[#111111]/80 leading-relaxed font-normal">
              I am Arsalan, a Backend Heavy Full-Stack Software Engineer. I build backend systems
              that don't crash when 10,000 people log in at once. I specialize in Node.js,
              relational database optimization, and robust API design without unnecessary bloat.
            </p>
            <blockquote className="border-l-4 border-[#CCFF00] pl-6 py-2 my-6 font-mono italic text-lg font-bold text-[#111111]">
              "Clean code and solid server architecture beat complex workarounds every single time."
            </blockquote>
          </div>
        </div>
      </section>

      {/* AI Assistant Teaser Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="border border-[#111111] bg-[#111111] text-[#F9F9F9] rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-[12px_12px_0px_0px_#CCFF00]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-mono bg-[#CCFF00] text-[#111111] px-3 py-1 rounded-full font-bold uppercase inline-block mb-4">
              Coming Soon
            </span>
            <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">AI Assistant</h3>
            <p className="text-sm md:text-base text-[#F9F9F9]/80 font-mono mb-6 leading-relaxed">
              Your 24/7 point of contact — ask questions, get quotations, check my availability, or
              book a meeting. Covers Laravel, PHP, Node.js, Vue, React, and full-stack systems.
            </p>

            {/* Chat Preview */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 font-mono text-xs space-y-2 max-w-md mb-6">
              <div className="text-[#CCFF00]">
                You → "I want a website with AI automation built in."
              </div>
              <div className="text-white/70">
                Assistant → "Great — what are you building, and where should the AI fit in?"
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#CCFF00] bg-white/10 px-4 py-2 rounded-lg border border-white/20">
              <SparkleIcon className="w-4 h-4" /> In Active Development
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      {/* Footer (Task 2 Fixed: Clean single rendering of massive typography and footer links) */}
      <footer
        id="contact"
        className="bg-[#111111] text-[#F9F9F9] pt-32 pb-16 px-6 md:px-12 border-t border-[#111111]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-mono uppercase text-[#CCFF00] tracking-widest block mb-4">
              Get In Touch
            </span>
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter hover:text-[#CCFF00] transition-colors duration-300">
              LET'S CONNECT.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-12 text-sm font-mono">
            <div>
              <span className="block text-white/50 mb-2 uppercase text-xs">Direct Email</span>
              <a
                href="mailto:arsalan@dev.com"
                className="hover:text-[#CCFF00] transition text-base font-bold"
              >
                arsalan@dev.com
              </a>
            </div>
            <div>
              <span className="block text-white/50 mb-2 uppercase text-xs">Social & Code</span>
              <div className="flex gap-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#CCFF00] transition flex items-center gap-1"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#CCFF00] transition flex items-center gap-1"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
            <div className="md:text-right">
              <span className="block text-white/50 mb-2 uppercase text-xs">Copyright</span>
              <p>© {new Date().getFullYear()} Arsalan. Built with React & Tailwind.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
