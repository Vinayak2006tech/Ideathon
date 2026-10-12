import React from "react";
import { ArrowUp, Terminal, MessageSquare, Zap } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-slate-950/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Twist Constraint Callout Banner */}
        <div className="mb-12 p-6 rounded-2xl glass-panel border border-amber-400/20 bg-amber-400/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Golden Rule: Honor the Twist Constraint
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Every problem statement features a mandatory constraint (3-tap habit log, throttled 3G speed, or mobile non-scrolling comprehension). Don't skip it!
              </p>
            </div>
          </div>
          <a
            href="#problems"
            className="text-xs font-mono font-semibold text-amber-500 hover:text-amber-400 whitespace-nowrap"
          >
            Review Statements →
          </a>
        </div>

        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6 border-t border-slate-200 dark:border-white/5">
          {/* Brand & Wordmark */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-400 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                Ideathon (SDG Council)
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 font-semibold">
                Ideathon Hub
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Empowering developers and designers to build transformative frontend experiences in 3 hours.
            </p>
          </div>

          {/* Social Links & Community */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
              aria-label="GitHub Repository"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
              aria-label="Discord Community"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <button
              onClick={scrollToTop}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors ml-2"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 text-center text-xs text-slate-400 font-mono flex items-center justify-center gap-1">
          <span>Built for Ideathon (SDG Council) · Pure static frontend · Zero backend required</span>
        </div>
      </div>
    </footer>
  );
};
