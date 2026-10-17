import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  SparkleIcon,
  PaperPlaneTiltIcon,
  CheckCircleIcon,
  CheckSquareIcon,
  SquareIcon,
  EnvelopeSimpleIcon,
  WhatsappLogoIcon,
  MapPinIcon,
  ArrowsVerticalIcon,
  ArrowsHorizontalIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { chunk, cn } from "@/lib/utils";

const SCOPE_OPTIONS = [
  "Backend Architecture",
  "Full-Stack Web App",
  "AI Automation / Workflow",
  "Database Scaling",
  "Full-Time Role",
  "Code Audit / Consult",
  "Speed Optimization",
  "Other",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectScopes: [] as string[],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const charCount = formData.message.length;
  const wordCount = formData.message.trim() ? formData.message.trim().split(/\s+/).length : 0;

  const toggleScope = (scope: string) => {
    setFormData((prev) => {
      const exists = prev.projectScopes.includes(scope);
      return {
        ...prev,
        projectScopes: exists
          ? prev.projectScopes.filter((s) => s !== scope)
          : [...prev.projectScopes, scope],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Missing VITE_LEAD_WEBHOOK_URL environment variable");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Portfolio Lead Form",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", projectScopes: [], message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact-form"
      className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#111111]/10"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#111111]/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-[#111111]/60 tracking-widest mb-2 flex items-center gap-1">
            <SparkleIcon className="w-3.5 h-3.5 text-[#111111]" /> Direct Communication
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
            LET'S CONNECT.
          </h2>
        </div>
        <p className="text-sm font-mono text-[#111111]/70 mt-4 md:mt-0">
          Every inquiry is tracked and prioritized for a quick reply
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Direct Info & Quick Links (5 Columns) */}
        <div className="lg:col-span-5 p-8 rounded-2xl border border-[#111111]/15 bg-white/40 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold bg-[#CCFF00] px-3 py-1 rounded-full border border-[#111111] inline-block mb-3">
                AVAILABILITY: OPEN FOR LEADS
              </span>
              <h3 className="text-2xl font-bold text-[#111111]">
                Engineering Systems & High-Load Architecture
              </h3>
            </div>

            <p className="text-sm font-mono text-[#111111]/70 leading-relaxed">
              I collaborate with companies, agencies, and founders to architect high-performance
              backend systems, intelligent workflow automation, and scalable web applications.
            </p>

            <div className="space-y-3 font-mono text-xs pt-4 border-t border-[#111111]/10">
              <a
                href="mailto:arsalanmughal23@gmail.com"
                className="flex items-center gap-3 text-[#111111]/80 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#111111]/5 border border-[#111111]/10 group-hover:bg-[#111111] group-hover:text-[#F9F9F9] flex items-center justify-center shrink-0">
                  <EnvelopeSimpleIcon className="w-4 h-4" />
                </div>
                <span className="break-all px-1 group-hover:text-[#111111] group-hover:font-bold group-hover:underline decoration-[#CCFF00] decoration-2 underline-offset-4">
                  arsalanmughal23@gmail.com
                </span>
              </a>

              <a
                href="https://wa.me/923152929408"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#111111]/80 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#111111]/5 border border-[#111111]/10 group-hover:bg-[#111111] group-hover:text-[#F9F9F9] flex items-center justify-center shrink-0">
                  <WhatsappLogoIcon className="w-4 h-4" />
                </div>
                <span className="break-all px-1 group-hover:text-[#111111] group-hover:font-bold group-hover:underline decoration-[#CCFF00] decoration-2 underline-offset-4">
                  +92 315 2929408
                </span>
              </a>

              <div className="flex items-center gap-3 text-[#111111]/80">
                <div className="w-8 h-8 rounded-lg bg-[#111111]/5 border border-[#111111]/10 flex items-center justify-center shrink-0">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <span className="px-1">Karachi, Pakistan (Remote Available)</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono text-[#111111]/50 mt-8 pt-4 border-t border-[#111111]/10">
            * Direct responses dispatched within 24 hours.
          </p>
        </div>

        {/* Right Column: Contact Form (7 Columns) */}
        <div className="lg:col-span-7 sm:p-8 md:p-10 rounded-2xl sm:border border-[#111111]/15 bg-white/40 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#CCFF00]/20 border border-[#111111] p-10 rounded-xl text-center space-y-4 my-auto"
              >
                <CheckCircleIcon className="w-14 h-14 mx-auto text-[#111111]" />
                <h3 className="text-3xl font-black uppercase">Message Dispatched!</h3>
                <p className="text-sm font-mono text-[#111111]/80 max-w-md mx-auto">
                  Thanks for reaching out! Your inquiry has been sent and I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-3 text-xs font-mono font-bold uppercase tracking-wider bg-[#111111] text-[#F9F9F9] px-8 py-3 rounded-xl hover:bg-[#CCFF00] hover:text-[#111111] transition-colors border border-[#111111] cursor-pointer"
                >
                  Send Another
                </button>
              </motion.div>
            ) : status === "error" ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-50 border border-red-300 p-10 rounded-xl text-center space-y-4 my-auto"
              >
                <WarningCircleIcon className="w-14 h-14 mx-auto text-red-600" />
                <h3 className="text-2xl font-black uppercase text-red-700">Something Went Wrong</h3>
                <p className="text-sm font-mono text-red-700/80 max-w-md mx-auto">
                  Your message couldn't be sent. Please try again, or email me directly at{" "}
                  <a
                    href="mailto:arsalanmughal23@gmail.com"
                    className="underline font-bold hover:text-red-900"
                  >
                    arsalanmughal23@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-3 text-xs font-mono font-bold uppercase tracking-wider bg-[#111111] text-[#F9F9F9] px-8 py-3 rounded-xl hover:bg-red-600 transition-colors border border-[#111111] cursor-pointer"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  {/* Row 1: Name, Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold text-[#111111]/80">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        autoComplete="name"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Arsalan"
                        className="w-full bg-white border border-[#111111]/25 rounded-xl px-3 py-2.5 text-xs font-mono text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#CCFF00] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold text-[#111111]/80">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        autoComplete="email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="arsalanmughal23@gmail.com"
                        className="w-full bg-white border border-[#111111]/25 rounded-xl px-3 py-2.5 text-xs font-mono text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#CCFF00] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold text-[#111111]/80">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        autoComplete="tel"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full bg-white border border-[#111111]/25 rounded-xl px-3 py-2.5 text-xs font-mono text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#CCFF00] transition"
                      />
                    </div>
                  </div>

                  {/* Multi-Select Scope */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex flex-wrap gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#111111]/80">
                        Project Scope{" "}
                        <span className="text-[#111111]/50 font-normal">(Multi-select)</span>
                      </label>
                      <span className="flex gap-2 text-[10px] font-mono text-[#111111]/60 font-bold uppercase">
                        Scroll for more
                        <ArrowsVerticalIcon className="sm:hidden" size={12} />
                        <ArrowsHorizontalIcon className="hidden sm:block" size={12} />
                      </span>
                    </div>
                    <div
                      className={cn(
                        "flex flex-col gap-2.5",
                        "p-1 pr-2 pb-2 sm:pt-0 sm:pl-0",
                        "border sm:border-0 border-[#111111]/25 border-r-0 border-b-0",
                        "overflow-auto max-h-50 rounded-tl-2xl sm:rounded-none",
                      )}
                    >
                      {chunk(SCOPE_OPTIONS, 4).map((row, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:inline-flex"
                        >
                          {row.map((scope) => {
                            const isSelected = formData.projectScopes.includes(scope);
                            return (
                              <motion.button
                                key={scope}
                                type="button"
                                whileTap={{ scale: 0.97 }}
                                onClick={() => toggleScope(scope)}
                                aria-pressed={isSelected}
                                className={cn(
                                  "cursor-pointer border rounded-xl px-3 py-2.5 flex items-center justify-between transition-all font-mono text-xs font-bold text-left",
                                  isSelected
                                    ? "border-[#111111] bg-[#CCFF00] text-[#111111] shadow-[2px_2px_0px_0px_#111111]"
                                    : "border-[#111111]/20 bg-white text-[#111111]/80 hover:border-[#111111]",
                                )}
                              >
                                <span className="truncate mr-1">{scope}</span>
                                {isSelected ? (
                                  <CheckSquareIcon className="w-4 h-4 shrink-0" />
                                ) : (
                                  <SquareIcon className="w-4 h-4 shrink-0 opacity-30" />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider font-bold text-[#111111]/80">
                        MESSAGE *
                      </label>
                      <span className="text-xs font-mono text-[#111111]/60 font-bold">
                        {wordCount} {wordCount === 1 ? "word" : "words"} • {charCount}{" "}
                        {charCount === 1 ? "char" : "chars"}
                      </span>
                    </div>

                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me what you're building or your technical requirements..."
                      className="w-full min-h-20 max-h-40 overflow-y-auto bg-white border border-[#111111]/25 rounded-xl rounded-br-none p-3 text-xs font-mono text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#CCFF00] transition"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest bg-[#111111] text-[#F9F9F9] hover:bg-[#CCFF00] hover:text-[#111111] px-8 py-4 rounded-xl border border-[#111111] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[3px_3px_0px_0px_#CCFF00] hover:shadow-[#111111]"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}{" "}
                    <PaperPlaneTiltIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
