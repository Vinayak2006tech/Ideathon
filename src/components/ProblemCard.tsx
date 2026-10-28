import React from "react";
import type { Problem } from "../data/problems";
import {
  ScanSearch,
  Globe,
  LayoutDashboard,
  Leaf,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

interface ProblemCardProps {
  problem: Problem;
  onOpenBrief: (problem: Problem) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onOpenBrief,
}) => {
  const getIcon = () => {
    const props = { className: "w-6 h-6" };
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

  // Color theme mapping for the 4 accents
  const themeStyles = {
    cyan: {
      bar: "bg-cyan-400",
      iconBg: "bg-cyan-400/10 text-cyan-400 border-cyan-400/30",
      glow: "hover:shadow-glow-cyan hover:border-cyan-400/40",
      tag: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
      button: "group-hover:text-cyan-400",
      btnGlow: "hover:bg-cyan-400/15 text-cyan-400 border-cyan-400/30",
      accentText: "text-cyan-400",
    },
    violet: {
      bar: "bg-violet-400",
      iconBg: "bg-violet-400/10 text-violet-400 border-violet-400/30",
      glow: "hover:shadow-glow-violet hover:border-violet-400/40",
      tag: "bg-violet-400/10 text-violet-400 border-violet-400/20",
      button: "group-hover:text-violet-400",
      btnGlow: "hover:bg-violet-400/15 text-violet-400 border-violet-400/30",
      accentText: "text-violet-400",
    },
    amber: {
      bar: "bg-amber-400",
      iconBg: "bg-amber-400/10 text-amber-400 border-amber-400/30",
      glow: "hover:shadow-glow-amber hover:border-amber-400/40",
      tag: "bg-amber-400/10 text-amber-400 border-amber-400/20",
      button: "group-hover:text-amber-400",
      btnGlow: "hover:bg-amber-400/15 text-amber-400 border-amber-400/30",
      accentText: "text-amber-400",
    },
    emerald: {
      bar: "bg-emerald-400",
      iconBg: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
      glow: "hover:shadow-glow-emerald hover:border-emerald-400/40",
      tag: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
      button: "group-hover:text-emerald-400",
      btnGlow: "hover:bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
      accentText: "text-emerald-400",
    },
  }[problem.accent];

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl glass-panel overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${themeStyles.glow} border border-slate-200/80 dark:border-white/10`}
    >
      {/* Accent Colored Top Bar */}
      <div className={`h-1.5 w-full ${themeStyles.bar}`} aria-hidden="true" />

      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
        {/* Top Header: Icon + Codename + Subtitle */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`p-3 rounded-xl border transition-transform duration-200 group-hover:scale-105 ${themeStyles.iconBg}`}
              >
                {getIcon()}
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                  Problem Statement
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {problem.codename}
                </h3>
              </div>
            </div>

            {/* Twist mini badge */}
            <div
              title={problem.twist}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 shrink-0"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Twist</span>
            </div>
          </div>

          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
            {problem.subtitle}
          </p>

          {/* One-Line Hook in Large Text */}
          <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 leading-snug">
            "{problem.hook}"
          </p>
        </div>

        {/* Middle Section: 3-4 Tag Chips */}
        <div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-mono px-2.5 py-1 rounded-lg border font-medium ${themeStyles.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Build Time */}
          <div className="flex items-center pt-3 border-t border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Est. {problem.buildTime}</span>
            </div>
          </div>
        </div>

        {/* Bottom Action: "See Full Brief →" */}
        <div className="pt-2">
          <button
            onClick={() => onOpenBrief(problem)}
            type="button"
            className={`w-full py-3 px-4 rounded-xl border font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${themeStyles.btnGlow} focus:outline-none focus:ring-2 focus:ring-cyan-400/50`}
          >
            <span>See Full Brief</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
};
