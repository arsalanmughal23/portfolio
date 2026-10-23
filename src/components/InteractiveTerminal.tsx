import { SKILLS } from "@/data";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

type TerminalHistoryType = { command: string; output: string };

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<TerminalHistoryType>>([
    {
      command: "init",
      output: "ArsalanOS v2.6.0 [Backend Core Active]. Type 'help' for available commands.",
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
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
        output =
          "1. Enterprise Core Backend\n2. Automated Data Sync\n3. Cloud Orchestrator\n4. Payment Gateway";
        break;
      case "contact":
        output = "Email: arsalan@dev.com | GitHub: github.com/arsalan";
        break;
      case "whoami":
        output =
          "Arsalan - Full-Stack Engineer (Backend Heavy).\n" +
          "Specialized in PHP (Laravel) & database architecture.\n" +
          "Frontend: React & Vue.\n" +
          "Node.js Ecosystem: Express, NestJS, AdonisJS, Next.js & Nuxt.js";
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
    <div className="bg-[#111111] text-[#F9F9F9] rounded-2xl border-2 border-[#111111] p-6 font-mono text-xs shadow-[8px_8px_0px_0px_#CCFF00] h-[400px] flex flex-col justify-between">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          </div>
          <span className="text-[#CCFF00] font-bold">bash - arsalan@core</span>
        </div>

        <div ref={scrollContainerRef} className="space-y-3 overflow-y-auto flex-grow pr-2">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="text-white/50 flex items-center gap-1">
                <span>$</span> <span className="text-[#CCFF00]">{h.command}</span>
              </div>
              <div className="text-white/90 whitespace-pre-line pl-4">{h.output}</div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleCommand}
        className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 shrink-0"
      >
        <span className="text-[#CCFF00]">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'help'..."
          className="bg-transparent outline-none w-full text-white font-mono text-xs placeholder:text-white/30"
        />
        <button type="submit" className="text-[#CCFF00] hover:opacity-80">
          <PaperPlaneTiltIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
