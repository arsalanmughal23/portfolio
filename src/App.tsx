import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, 
  Terminal, 
  ExternalLink, 
  Sparkles
} from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './components/BrandIcons';

const ROLES = ["Scalable Systems", "Backend Architectures", "Secure APIs", "Robust Infrastructure"];

const PROJECTS = [
  {
    id: "01",
    title: "Enterprise Core Backend & Database Handler",
    category: "Backend Engineering",
    description: "Engineered high-throughput relational database schemas, customized middleware token validation, and ultra-low latency REST endpoints handling heavy concurrent transactions.",
    tech: ["PHP OOP", "MySQL", "Redis", "REST API"],
    link: "https://github.com",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "02",
    title: "Automated Data Sync & Telemetry Dashboard",
    category: "Full-Stack System",
    description: "Built asynchronous event-driven worker scripts with structured modular architecture, secure payload encryption, and clean responsive monitoring interfaces.",
    tech: ["Node.js", "Python", "Tailwind CSS", "WebSockets"],
    link: "https://github.com",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "03",
    title: "Cloud Microservices Orchestrator",
    category: "Infrastructure",
    description: "Designed containerized deployment pipelines, automated error recovery frameworks, and resilient server-side state synchronization mechanisms.",
    tech: ["Docker", "Linux", "Git", "Bash Scripting"],
    link: "https://github.com",
    previewImage: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80"
  }
];

const CERTIFICATIONS = [
  {
    year: "2025",
    title: "Google AI & Cloud Essentials",
    issuer: "Google Cloud",
    credentialId: "GC-AI-8921-X",
    link: "https://cloud.google.com"
  },
  {
    year: "2024",
    title: "Microsoft Technical Fundamentals",
    issuer: "Microsoft",
    credentialId: "MS-TECH-5542",
    link: "https://microsoft.com"
  },
  {
    year: "2023",
    title: "Advanced Object-Oriented Programming & Systems",
    issuer: "Professional Certification",
    credentialId: "OOP-PHP-9021",
    link: "#"
  },
  {
    year: "2022",
    title: "GitHub Milestone & Ecosystem Achiever",
    issuer: "GitHub",
    credentialId: "GH-PR-QUICKDRAW",
    link: "https://github.com"
  }
];

const SKILLS = [
  "Backend Architecture", "PHP OOP", "Node.js", "Python", "MySQL & Databases", 
  "API Design", "Docker & Linux", "Git Workflows", "System Security", "Performance Optimization"
];

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [activeProject, setActiveProject] = useState<any>(null);
  const [cursorImagePos, setCursorImagePos] = useState({ x: 0, y: 0 });

  // Rotate roles in Hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse for custom brutalist cursor & floating preview
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorImagePos({ x: e.clientX + 20, y: e.clientY - 100 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-[#F9F9F9] text-[#111111] font-sans antialiased selection:bg-[#CCFF00] selection:text-[#111111] min-h-screen relative overflow-x-hidden">
      
      {/* Custom Brutalist Follower Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 bg-[#111111] rounded-full pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? "#CCFF00" : "#111111"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#F9F9F9]/80 backdrop-blur-md border-b border-[#111111]/10 px-6 md:px-12 py-5 flex items-center justify-between">
        <a 
          href="#" 
          className="font-black tracking-tighter text-xl uppercase flex items-center gap-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ARSALAN<span className="text-xs bg-[#CCFF00] px-1.5 py-0.5 border border-[#111111] rounded">ENG</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#projects" className="hover:opacity-60 transition" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Works</a>
          <a href="#credentials" className="hover:opacity-60 transition" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Credentials</a>
          <a href="#about" className="hover:opacity-60 transition" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>About</a>
        </nav>
        <a 
          href="#contact" 
          className="bg-[#111111] text-[#F9F9F9] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#CCFF00] hover:text-[#111111] border border-[#111111] transition duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Let's Talk
        </a>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-[#CCFF00] border border-[#111111] px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase mb-6 shadow-[2px_2px_0px_0px_#111111]"
            >
              <Terminal className="w-3.5 h-3.5" /> Backend Heavy Full-Stack Engineer
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8"
            >
              I BUILD <br />
              <span className="relative inline-block overflow-hidden py-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROLES[currentRoleIndex]}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block text-[#111111] underline decoration-[#CCFF00] decoration-wavy underline-offset-8"
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
              className="text-lg md:text-2xl text-[#111111]/70 max-w-2xl font-normal leading-relaxed"
            >
              Crafting robust server architecture, high-performance database models, and bulletproof backends with an editorial, minimalist approach.
            </motion.p>
          </div>
        </div>

        {/* Quick Stats Grid under Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#111111]/10 pt-8"
        >
          <div>
            <span className="block text-3xl md:text-4xl font-black font-mono">03+</span>
            <span className="text-xs font-mono text-[#111111]/60 uppercase tracking-wider">Years Experience</span>
          </div>
          <div>
            <span className="block text-3xl md:text-4xl font-black font-mono">10+</span>
            <span className="text-xs font-mono text-[#111111]/60 uppercase tracking-wider">Production Systems</span>
          </div>
          <div>
            <span className="block text-3xl md:text-4xl font-black font-mono">04+</span>
            <span className="text-xs font-mono text-[#111111]/60 uppercase tracking-wider">Global Credentials</span>
          </div>
          <div>
            <span className="block text-3xl md:text-4xl font-black font-mono">100%</span>
            <span className="text-xs font-mono text-[#111111]/60 uppercase tracking-wider">Commitment to Code</span>
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

      {/* Projects Section (Interactive List with Floating Previews) */}
      <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#111111]/10 pb-6">
          <div>
            <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest block mb-2">Selected Works</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">FEATURED ARCHITECTURE</h2>
          </div>
          <p className="text-sm font-mono text-[#111111]/70 mt-4 md:mt-0">Hover to preview system snapshots</p>
        </div>

        <div className="space-y-4">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              onMouseEnter={() => {
                setActiveProject(project);
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setActiveProject(null);
                setIsHovered(false);
              }}
              className="group relative border border-[#111111]/15 bg-white/50 p-6 md:p-8 rounded-2xl hover:border-[#111111] hover:bg-[#CCFF00]/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start md:items-center gap-6">
                  <span className="text-sm font-mono text-[#111111]/40 font-bold">{project.id}</span>
                  <div>
                    <span className="text-xs font-mono text-[#111111]/60 uppercase tracking-wider mb-1 block">{project.category}</span>
                    <h3 className="text-2xl md:text-3xl font-bold group-hover:translate-x-2 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#111111]/70 mt-2 max-w-xl">{project.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                  <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono bg-[#111111]/5 border border-[#111111]/10 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-[#111111] flex items-center justify-center bg-[#111111] text-[#F9F9F9] group-hover:bg-[#CCFF00] group-hover:text-[#111111] transition-colors shrink-0"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Image Preview on Hover */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed pointer-events-none z-30 hidden lg:block w-[320px] h-[200px] rounded-xl overflow-hidden border-2 border-[#111111] shadow-2xl bg-[#111111]"
              style={{ top: cursorImagePos.y, left: cursorImagePos.x }}
            >
              <img src={activeProject.previewImage} alt={activeProject.title} className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 text-xs font-mono text-[#CCFF00] font-bold">SYSTEM PREVIEW</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Certifications (Minimalist Timeline) */}
      <section id="credentials" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#111111]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest block mb-2">Validation & Trust</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">CREDENTIALS & BADGES</h2>
          </div>
          <p className="text-sm font-mono text-[#111111]/70 mt-4 md:mt-0">Google, Microsoft & GitHub milestones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATIONS.map((cert, index) => (
            <div 
              key={index} 
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
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider hover:text-[#CCFF00] hover:bg-[#111111] px-4 py-2 rounded-lg border border-[#111111] w-fit transition-colors"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Verify Credential <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* About Me Section (Split Screen) */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#111111]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Stylized High-Contrast Abstract Avatar / Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#111111] bg-[#111111] text-[#F9F9F9] p-8 md:p-12 shadow-[8px_8px_0px_0px_#CCFF00]">
              <div className="absolute top-4 right-4 flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              </div>
              <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest block mb-4">ARSALAN_PROFILE.LOG</span>
              <h3 className="text-3xl font-black mb-6">BACKEND HEAVY & SYSTEM FOCUSED</h3>
              <p className="text-sm font-mono text-[#F9F9F9]/80 leading-relaxed mb-6">
                "Code is poetry when written with efficient data structures and bulletproof server security."
              </p>
              <div className="pt-6 border-t border-[#F9F9F9]/20 flex items-center justify-between text-xs font-mono">
                <span>LOCATION: PAKISTAN</span>
                <span className="text-[#CCFF00]">STATUS: AVAILABLE</span>
              </div>
            </div>
          </div>

          {/* Right: Conversational Bio & Pull Quotes */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest block">About Me</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Engineering systems that stand the test of concurrency and scale.
            </h2>
            <p className="text-base md:text-lg text-[#111111]/80 leading-relaxed font-normal">
              I am Arsalan, a Backend Heavy Full-Stack Software Engineer. My passion lies deep within server-side architectures, database optimization, and scalable API design. I believe in clean code, rigorous documentation, and creating seamless digital experiences.
            </p>
            <blockquote className="border-l-4 border-[#CCFF00] pl-6 py-2 my-6 font-mono italic text-lg font-bold text-[#111111]">
              "Simplifying complex workflows through structured backend logic."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Future AI Assistant Teaser Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="border border-[#111111] bg-[#111111] text-[#F9F9F9] rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-[12px_12px_0px_0px_#CCFF00]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-mono bg-[#CCFF00] text-[#111111] px-3 py-1 rounded-full font-bold uppercase inline-block mb-4">
              Coming Soon
            </span>
            <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Personal AI Job Assistant</h3>
            <p className="text-sm md:text-base text-[#F9F9F9]/70 font-mono mb-8 leading-relaxed">
              An upcoming intelligent module where recruiters can paste any Job Description, and my embedded AI agent will instantly draft customized cover letters and tailored resume summaries based on my live backend portfolio records.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#CCFF00] bg-white/10 px-4 py-2 rounded-lg border border-white/20">
              <Sparkles className="w-4 h-4" /> In Active Development
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Massive Oversized Typography) */}
      <footer id="contact" className="bg-[#111111] text-[#F9F9F9] pt-32 pb-16 px-6 md:px-12 border-t border-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-mono uppercase text-[#CCFF00] tracking-widest block mb-4">Get In Touch</span>
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter hover:text-[#CCFF00] transition-colors duration-300">
              LET'S CONNECT.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-12 text-sm font-mono">
            <div>
              <span className="block text-white/50 mb-2 uppercase text-xs">Direct Email</span>
              <a href="mailto:arsalan@dev.com" className="hover:text-[#CCFF00] transition text-base font-bold">arsalan@dev.com</a>
            </div>
            <div>
              <span className="block text-white/50 mb-2 uppercase text-xs">Social & Code</span>
              <div className="flex gap-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CCFF00] transition flex items-center gap-1">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CCFF00] transition flex items-center gap-1">
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