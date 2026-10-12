import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, CornerDownLeft, Zap, Timer } from "lucide-react";
import { problems, type Problem } from "../data/problems";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProblem: (problem: Problem) => void;
  onOpenTimer?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProblem,
  onOpenTimer,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProblems = problems.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.codename.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.hook.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const sections = [
    { name: "3-Hour Sprint Counter Clock", href: "#timer", isTimer: true },
    { name: "Overview & Hero", href: "#overview" },
    { name: "How It Works Timeline", href: "#how-it-works" },
    { name: "Problem Statements", href: "#problems" },
    { name: "Rules & Submission", href: "#rules" },
    { name: "Judging Criteria", href: "#judging" },
    { name: "FAQ", href: "#faq" },
  ].filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelectSection = (sec: { name: string; href: string; isTimer?: boolean }) => {
    onClose();
    if (sec.isTimer && onOpenTimer) {
      onOpenTimer();
      return;
    }
    const el = document.querySelector(sec.href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/5">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a problem, tag, or 'timer'..."
            className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none text-white"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          <div>
            <div className="px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Problem Statements
            </div>
            {filteredProblems.length === 0 ? (
              <div className="px-3 py-4 text-sm text-slate-400 text-center">
                No matching problem statements found.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredProblems.map((prob) => {
                  const accentColor =
                    prob.accent === "cyan"
                      ? "text-cyan-400 border-cyan-400/20 bg-cyan-400/10"
                      : prob.accent === "violet"
                      ? "text-violet-400 border-violet-400/20 bg-violet-400/10"
                      : prob.accent === "amber"
                      ? "text-amber-400 border-amber-400/20 bg-amber-400/10"
                      : "text-emerald-400 border-emerald-400/20 bg-emerald-400/10";

                  return (
                    <button
                      key={prob.id}
                      onClick={() => {
                        onClose();
                        onSelectProblem(prob);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center font-mono font-bold text-xs ${accentColor}`}
                        >
                          {prob.codename.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <div className="font-semibold text-sm group-hover:text-cyan-300 transition-colors">
                            {prob.codename}{" "}
                            <span className="text-xs text-slate-400 font-normal">
                              — {prob.subtitle}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 truncate max-w-sm">
                            {prob.hook}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">
                          {prob.buildTime}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {sections.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 border-t border-white/5 pt-3">
                Quick Jump Sections & Tools
              </div>
              <div className="space-y-1">
                {sections.map((sec) => (
                  <button
                    key={sec.href}
                    onClick={() => handleSelectSection(sec)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 text-sm text-slate-300 group-hover:text-white">
                      {sec.isTimer ? (
                        <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
                      ) : (
                        <Zap className="w-4 h-4 text-cyan-400" />
                      )}
                      <span className={sec.isTimer ? "font-semibold text-amber-300" : ""}>
                        {sec.name}
                      </span>
                    </div>
                    <CornerDownLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-950/60 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
              Esc
            </kbd>{" "}
            to exit
          </div>
          <div>4 Hackathon Statements Loaded</div>
        </div>
      </div>
    </div>
  );
};
