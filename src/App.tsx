import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Terminal as TerminalIcon, 
  Sparkles,
  ChevronRight,
  Send
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
    link: "https://cloud.google.com",
    featured: true
  },
  {
    year: "2024",
    title: "Microsoft Technical Fundamentals",
    issuer: "Microsoft",
    credentialId: "MS-TECH-5542",
    link: "https://microsoft.com",
    featured: false
  },
  {
    year: "2023",
    title: "Advanced Object-Oriented Programming & Systems",
    issuer: "Professional Certification",
    credentialId: "OOP-PHP-9021",
    link: "#",
    featured: false
  },
  {
    year: "2022",
    title: "GitHub Milestone & Ecosystem Achiever",
    issuer: "GitHub",
    credentialId: "GH-PR-QUICKDRAW",
    link: "https://github.com",
    featured: false
  }
];

const SKILLS = [
  "Backend Architecture", "PHP OOP", "Node.js", "Python", "MySQL & Databases", 
  "API Design", "Docker & Linux", "Git Workflows", "System Security", "Performance Optimization"
];

// Interactive CLI Component for Task 4
function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    { command: "init", output: "ArsalanOS v2.6.0 [Backend Core Active]. Type 'help' for available commands." }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output = "";
    switch (cmd) {
      case "help":
        output = "Available commands: skills, projects, contact, clear, whoami";
        break;
      case "skills":
        output = SKILLS.join(" | ");
        break;
      case "projects":
        output = "1. Enterprise Core Backend\n2. Automated Data Sync\n3. Cloud Orchestrator";
        break;
      case "contact":
        output = "Email: arsalan@dev.com | GitHub: github.com/arsalan";
        break;
      case "whoami":
        output = "Arsalan - Backend Heavy Full-Stack Software Engineer specializing in scalable server architecture.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        output = `command not found: ${cmd}. Type 'help' for options.`;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <div className="bg-[#111111] text-[#F9F9F9] rounded-2xl border-2 border-[#111111] p-6 font-mono text-xs shadow-[8px_8px_0px_0px_#CCFF00] h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          </div>
          <span className="text-[#CCFF00] font-bold">bash - arsalan@core</span>
        </div>
        <div className="space-y-3 overflow-y-auto max-h-[220px] pr-2">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="text-white/50 flex items-center gap-1">
                <span>$</span> <span className="text-[#CCFF00]">{h.command}</span>
              </div>
              <div className="text-white/90 whitespace-pre-line pl-4">{h.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>
      <form onSubmit={handleCommand} className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
        <span className="text-[#CCFF00]">$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'help'..."
          className="bg-transparent outline-none w-full text-white font-mono text-xs placeholder:text-white/30"
        />
        <button type="submit" className="text-[#CCFF00] hover:opacity-80">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [activeProject, setActiveProject] = useState<any>(null);
  const [cursorImagePos, setCursorImagePos] = useState({ x: 0, y: 0 });

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
      setCursorImagePos({ x: e.clientX + 20, y: e.clientY - 100 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-[#F9F9F9] text-[#111111] font-sans antialiased selection:bg-[#CCFF00] selection:text-[#111111] min-h-screen relative overflow-x-hidden">
      
      {/* Custom Brutalist Follower Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 bg-[#111111] rounded-full pointer-events-none z-50 hidden md:flex items-center justify-center text-[8px] font-mono font-bold text-[#111111]"
        animate={{
          x: mousePosition.x - (cursorText ? 32 : 8),
          y: mousePosition.y - (cursorText ? 32 : 8),
          scale: cursorText ? 4 : isHovered ? 2.5 : 1,
          backgroundColor: cursorText || isHovered ? "#CCFF00" : "#111111"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorText && <span className="scale-[0.35] tracking-tighter uppercase">{cursorText}</span>}
      </motion.div>

      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#F9F9F9]/80 backdrop-blur-md border-b border-[#111111]/10 px-6 md:px-12 py-5 flex items-center justify-between">
        <a 
          href="#" 
          className="font-black tracking-tighter text-xl uppercase flex items-center gap-2"
          onMouseEnter={() => { setIsHovered(true); setCursorText(""); }}
          onMouseLeave={() => setIsHovered(false)}
        >
          ARSALAN<span className="text-xs bg-[#CCFF00] px-1.5 py-0.5 border border-[#111111] rounded">ENG</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#projects" className="hover:opacity-60 transition" onMouseEnter={() => { setIsHovered(true); setCursorText(""); }} onMouseLeave={() => setIsHovered(false)}>Works</a>
          <a href="#credentials" className="hover:opacity-60 transition" onMouseEnter={() => { setIsHovered(true); setCursorText(""); }} onMouseLeave={() => setIsHovered(false)}>Credentials</a>
          <a href="#about" className="hover:opacity-60 transition" onMouseEnter={() => { setIsHovered(true); setCursorText(""); }} onMouseLeave={() => setIsHovered(false)}>About</a>
        </nav>
        <a 
          href="#contact" 
          className="bg-[#111111] text-[#F9F9F9] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#CCFF00] hover:text-[#111111] border border-[#111111] transition duration-300"
          onMouseEnter={() => { setIsHovered(true); setCursorText(""); }}
          onMouseLeave={() => setIsHovered(false)}
        >
          Let's Talk
        </a>
      </header>

      {/* Hero Section (Task 1 Fixed: dynamic flexible height container) */}
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
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8"
            >
              I BUILD <br />
              <span className="relative block min-h-[1.2em] overflow-visible py-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROLES[currentRoleIndex]}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute left-0 top-2 whitespace-nowrap text-[#111111] underline decoration-[#CCFF00] decoration-wavy underline-offset-8"
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
              className="text-lg md:text-2xl text-[#111111]/70 max-w-2xl font-normal leading-relaxed pt-12"
            >
              I build backend systems that don't crash when 10,000 people log in at once. I specialize in Node.js, relational database optimization, and high-performance APIs.
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
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              onMouseEnter={() => {
                setActiveProject(project);
                setIsHovered(true);
                setCursorText("VIEW");
              }}
              onMouseLeave={() => {
                setActiveProject(null);
                setIsHovered(false);
                setCursorText("");
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

      {/* Certifications (Task 3 Fixed: Featured block + clean minimalist text list) */}
      <section id="credentials" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#111111]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest block mb-2">Validation & Trust</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">CREDENTIALS & BADGES</h2>
          </div>
          <p className="text-sm font-mono text-[#111111]/70 mt-4 md:mt-0">Google, Microsoft & GitHub milestones</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured Certification (Google Cloud) */}
          {CERTIFICATIONS.filter(c => c.featured).map((cert, index) => (
            <div 
              key={index} 
              className="lg:col-span-6 p-8 md:p-10 rounded-3xl border-2 border-[#111111] bg-[#CCFF00]/20 flex flex-col justify-between shadow-[8px_8px_0px_0px_#111111]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold bg-[#111111] text-[#CCFF00] px-3.5 py-1.5 rounded-full">
                    {cert.year} • FEATURED
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">{cert.issuer}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-3">{cert.title}</h3>
                <p className="text-xs font-mono text-[#111111]/70 mb-8">Credential ID: {cert.credentialId}</p>
              </div>
              <a 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#111111] text-[#F9F9F9] hover:bg-[#CCFF00] hover:text-[#111111] px-5 py-3 rounded-xl border border-[#111111] w-fit transition-colors group"
                onMouseEnter={() => { setIsHovered(true); setCursorText("VERIFY"); }}
                onMouseLeave={() => { setIsHovered(false); setCursorText(""); }}
              >
                Verify Credential <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}

          {/* Remaining Certifications as Clean Minimalist Text List */}
          <div className="lg:col-span-6 space-y-4">
            {CERTIFICATIONS.filter(c => !c.featured).map((cert, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl border border-[#111111]/15 bg-white/50 flex items-center justify-between hover:border-[#111111] hover:bg-white transition duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono font-bold bg-[#111111]/10 px-2 py-0.5 rounded">{cert.year}</span>
                    <span className="text-xs font-mono text-[#111111]/60 uppercase">{cert.issuer}</span>
                  </div>
                  <h4 className="text-lg font-bold group-hover:text-black">{cert.title}</h4>
                </div>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#111111]/20 flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#CCFF00] group-hover:border-[#111111] transition-colors shrink-0"
                  onMouseEnter={() => { setIsHovered(true); setCursorText("GO"); }}
                  onMouseLeave={() => { setIsHovered(false); setCursorText(""); }}
                >
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section (Split Screen) */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#111111]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Terminal replacing the old cliché card (Task 4) */}
          <div className="lg:col-span-5 h-[340px]">
            <InteractiveTerminal />
          </div>

          {/* Right: Conversational Bio & Pull Quotes */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest block">About Me</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Engineering systems that stand the test of concurrency and scale.
            </h2>
            <p className="text-base md:text-lg text-[#111111]/80 leading-relaxed font-normal">
              I am Arsalan, a Backend Heavy Full-Stack Software Engineer. I build backend systems that don't crash when 10,000 people log in at once. I specialize in Node.js, relational database optimization, and robust API design without unnecessary bloat.
            </p>
            <blockquote className="border-l-4 border-[#CCFF00] pl-6 py-2 my-6 font-mono italic text-lg font-bold text-[#111111]">
              "Clean code and solid server architecture beat complex workarounds every single time."
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

      {/* Footer (Task 2 Fixed: Clean single rendering of massive typography and footer links) */}
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
