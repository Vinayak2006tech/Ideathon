import React, { useEffect, useRef, useState } from "react";
import { type Problem, problems } from "../data/problems";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { Hyperspeed } from "./Hyperspeed";
import { hyperspeedSlides } from "../data/hyperspeedPresets";
import {
  X,
  Copy,
  Printer,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  Square,
  ScanSearch,
  Globe,
  LayoutDashboard,
  Leaf,
  Sparkles,
  Zap,
} from "lucide-react";

interface ProblemDrawerProps {
  problem: Problem | null;
  onClose: () => void;
  onSelectProblem: (problem: Problem) => void;
  onCopySuccess: (message: string) => void;
}

export const ProblemDrawer: React.FC<ProblemDrawerProps> = ({
  problem,
  onClose,
  onSelectProblem,
  onCopySuccess,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll(!!problem);

  // Reset or initialize checkboxes when problem changes
  useEffect(() => {
    setCheckedItems({});
  }, [problem?.id]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!problem) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [problem]);

  if (!problem) return null;

  const currentIndex = problems.findIndex((p) => p.id === problem.id);
  const prevProblem =
    problems[(currentIndex - 1 + problems.length) % problems.length];
  const nextProblem = problems[(currentIndex + 1) % problems.length];

  const handlePrev = () => onSelectProblem(prevProblem);
  const handleNext = () => onSelectProblem(nextProblem);

  // Get matching Hyperspeed slide configuration for this problem
  const slideConfig =
    hyperspeedSlides.find((s) => s.id === problem.id) || hyperspeedSlides[0];

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const getIcon = () => {
    const props = { className: "w-7 h-7" };
    switch (problem.icon) {
      case "ScanSearch":
        return <ScanSearch {...props} />;
      case "Globe":
        return <Globe {...props} />;
      case "LayoutDashboard":
        return <LayoutDashboard {...props} />;
      case "Leaf":
        return <Leaf {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  const themeColors = {
    cyan: {
      accent: "text-cyan-400",
      border: "border-cyan-400/30",
      bg: "bg-cyan-400/10",
      badge: "bg-cyan-400/15 text-cyan-400 border-cyan-400/30",
      glow: "shadow-glow-cyan",
      banner: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    },
    violet: {
      accent: "text-violet-400",
      border: "border-violet-400/30",
      bg: "bg-violet-400/10",
      badge: "bg-violet-400/15 text-violet-400 border-violet-400/30",
      glow: "shadow-glow-violet",
      banner: "from-violet-500/20 via-violet-500/5 to-transparent",
    },
    amber: {
      accent: "text-amber-400",
      border: "border-amber-400/30",
      bg: "bg-amber-400/10",
      badge: "bg-amber-400/15 text-amber-400 border-amber-400/30",
      glow: "shadow-glow-amber",
      banner: "from-amber-500/20 via-amber-500/5 to-transparent",
    },
    emerald: {
      accent: "text-emerald-400",
      border: "border-emerald-400/30",
      bg: "bg-emerald-400/10",
      badge: "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
      glow: "shadow-glow-emerald",
      banner: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    },
  }[problem.accent];

  const handleCopyMarkdown = async () => {
    const md = `# Problem Statement: ${problem.codename}
> ${problem.subtitle}
> Hook: "${problem.hook}"

**Difficulty:** Level ${problem.difficulty}/3 | **Est. Build Time:** ${problem.buildTime}
**Tags:** ${problem.tags.join(", ")}

---

## 1. Background & Context
${problem.background.trim()}

## 2. The Core Challenge
${problem.challenge.trim()}

${
  problem.domains.length > 0
    ? `## 3. Potential Domains & Angles\n${problem.domains
        .map((d) => `- ${d}`)
        .join("\n")}\n`
    : ""
}

## 4. Must-Have Features
${problem.mustHaves.map((m) => `- [ ] ${m}`).join("\n")}

## 5. ⚡ Twist Constraint
> ${problem.twist}

## 6. Bonus Ideas & Vectors
${problem.bonus.map((b) => `- ${b}`).join("\n")}
`;

    try {
      await navigator.clipboard.writeText(md);
      onCopySuccess("Brief copied as Markdown ✓");
    } catch {
      onCopySuccess("Failed to copy to clipboard.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${problem.codename} Brief Modal`}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-end animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl min-h-screen bg-slate-900 text-slate-100 border-l border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden"
      >
        {/* Header Bar with Slide-Matching Hyperspeed Background (High Visibility) */}
        <div className="relative">
          {/* Hyperspeed Canvas for this Problem Slide with Low Transparency */}
          <div className="absolute inset-0 h-80 overflow-hidden pointer-events-none opacity-65">
            <Hyperspeed
              key={problem.id}
              curve={slideConfig.curve}
              curvature={slideConfig.curvature}
              speed={slideConfig.speed * 1.1}
              boost={3}
              density={35}
              glow={0.8}
              roadOpacity={0.3}
              lightSize={1.3}
              tailColors={slideConfig.tailColors}
              headColors={slideConfig.headColors}
              poleColors={slideConfig.poleColors}
              interactive={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900" />
          </div>

          <div
            className={`p-6 sm:p-8 bg-gradient-to-b ${themeColors.banner} border-b border-white/10 relative z-10`}
          >
            {/* Top Navigation & Close Actions */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-slate-200 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono backdrop-blur-md shadow"
                  title={`Previous: ${prevProblem.codename}`}
                  aria-label="Previous problem slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Slide {currentIndex === 0 ? problems.length : currentIndex}</span>
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-slate-200 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono backdrop-blur-md shadow"
                  title={`Next: ${nextProblem.codename}`}
                  aria-label="Next problem slide"
                >
                  <span className="hidden sm:inline">Slide {currentIndex + 2 > problems.length ? 1 : currentIndex + 2}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono backdrop-blur-md shadow"
                  title="Copy complete brief in Markdown format"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Brief</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono backdrop-blur-md shadow"
                  title="Print or save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-white transition-colors ml-2 border border-white/20 shadow"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Codename & Hook Header */}
            <div className="flex items-start gap-4">
              <div
                className={`p-3.5 rounded-2xl border ${themeColors.border} ${themeColors.bg} ${themeColors.accent} shadow-lg`}
              >
                {getIcon()}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className={`text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${themeColors.badge} shadow-sm`}
                  >
                    Challenge Brief · Slide {currentIndex + 1}/4
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    Difficulty {problem.difficulty}/3 · Est. {problem.buildTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
                  {problem.codename}
                </h2>
                <p className="text-sm sm:text-base text-slate-200 font-medium mt-1">
                  {problem.subtitle}
                </p>
              </div>
            </div>

            {/* Hook Banner */}
            <div className="mt-5 p-4 rounded-xl bg-slate-950/85 border border-white/15 text-sm sm:text-base italic text-slate-200 backdrop-blur-md shadow-lg">
              "{problem.hook}"
            </div>
          </div>

          {/* Drawer Body Content */}
          <div className="p-6 sm:p-8 space-y-8 relative z-10">
            {/* Twist Constraint Highlight Box */}
            <section
              aria-labelledby="twist-heading"
              className={`p-5 rounded-2xl border ${themeColors.border} ${themeColors.bg} relative overflow-hidden shadow-lg`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    id="twist-heading"
                    className="text-sm font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2"
                  >
                    Required Twist Constraint
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base font-semibold text-white leading-relaxed">
                    {problem.twist}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Judges will specifically inspect your solution for compliance
                    with this constraint.
                  </p>
                </div>
              </div>
            </section>

            {/* Background / The Problem */}
            <section>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>The Problem & Reality</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm">
                {problem.background}
              </p>
            </section>

            {/* The Challenge */}
            <section>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Your Challenge</span>
              </h3>
              <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm">
                {problem.challenge}
              </p>
            </section>

            {/* Domains (if any) */}
            {problem.domains && problem.domains.length > 0 && (
              <section>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Suggested Domains & Angles (Pick One)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {problem.domains.map((domain, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5 shadow-sm"
                    >
                      <span className="font-mono text-cyan-400 font-bold shrink-0">
                        0{i + 1}.
                      </span>
                      <span>{domain}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Must-Have Features Checklist */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  <span>Must-Have Features (Interactive Checklist)</span>
                </h3>
                <span className="text-xs font-mono text-slate-300">
                  {Object.values(checkedItems).filter(Boolean).length} of{" "}
                  {problem.mustHaves.length} checked
                </span>
              </div>
              <div className="space-y-2">
                {problem.mustHaves.map((item, idx) => {
                  const isChecked = !!checkedItems[idx];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleCheck(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3 shadow-sm ${
                        isChecked
                          ? "bg-emerald-500/15 border-emerald-500/40 text-white"
                          : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          isChecked ? "line-through text-slate-400" : ""
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Bonus Ideas Chips */}
            <section>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Bonus Vectors (High Impact)</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {problem.bonus.map((b, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white/5 border border-white/15 text-slate-200 hover:border-white/30 transition-colors shadow-sm"
                  >
                    + {b}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer actions inside Drawer */}
        <div className="p-6 sm:p-8 border-t border-white/10 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 backdrop-blur-md">
          <div className="text-xs text-slate-300 font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10">Esc</kbd> to
            dismiss or use arrow keys
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyMarkdown}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-white/20 bg-slate-900 hover:bg-slate-800 text-xs font-mono font-semibold text-white flex items-center justify-center gap-2 transition-colors shadow"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Brief</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
            >
              Close Brief
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
