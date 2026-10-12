import React from "react";
import { Sparkles, Target, Palette, Eye, Lightbulb, CheckCheck } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Criterion {
  title: string;
  weight: number;
  icon: React.ReactNode;
  accent: "cyan" | "violet" | "amber" | "emerald";
  description: string;
  indicators: string[];
}

export const Judging: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const criteria: Criterion[] = [
    {
      title: "Problem Fit & Clarity",
      weight: 25,
      icon: <Target className="w-5 h-5" />,
      accent: "cyan",
      description:
        "Does the frontend immediately solve the user's confusion or friction? Can a reviewer understand 'what does this do?' in under 30 seconds?",
      indicators: [
        "Direct alignment with chosen problem statement",
        "Clear information hierarchy and plain language",
        "Strict adherence to the problem's Twist Constraint",
      ],
    },
    {
      title: "Craft & Visual Polish",
      weight: 25,
      icon: <Palette className="w-5 h-5" />,
      accent: "violet",
      description:
        "Aesthetic appeal, typography, micro-interactions, responsive behavior across mobile and desktop, and thoughtful component styling.",
      indicators: [
        "Delightful hover states and snappy transitions",
        "Flawless mobile layout (tested down to 360px)",
        "Zero layout shifts and clean spacing system",
      ],
    },
    {
      title: "Usability & Accessibility",
      weight: 20,
      icon: <Eye className="w-5 h-5" />,
      accent: "emerald",
      description:
        "Inclusive design principles: semantic landmarks, screen-reader friendliness, readable contrast (≥4.5:1), and keyboard navigation.",
      indicators: [
        "ARIA labels, visible focus rings, keyboard traps handled",
        "High contrast typography and large touch targets",
        "Low-bandwidth resilience and graceful fallback states",
      ],
    },
    {
      title: "Originality & Creativity",
      weight: 15,
      icon: <Lightbulb className="w-5 h-5" />,
      accent: "amber",
      description:
        "Fresh UI paradigms, creative data visualization, clever gamification, or novel ways to make complex data instantly graspable.",
      indicators: [
        "Unconventional yet intuitive UI metaphors",
        "Creative twist on mock data presentation",
        "Exploration of suggested bonus vectors",
      ],
    },
    {
      title: "Completeness & Functionality",
      weight: 15,
      icon: <CheckCheck className="w-5 h-5" />,
      accent: "cyan",
      description:
        "Working interactive state: toggles work, inputs respond, mock data updates gracefully, and the app feels like a cohesive product.",
      indicators: [
        "Zero browser console errors",
        "Interactive toggles (simple vs detailed, dark mode, etc.)",
        "Complete user journey from arrival to resolution",
      ],
    },
  ];

  return (
    <section
      id="judging"
      className="py-20 sm:py-28 border-t border-slate-200/50 dark:border-white/5 relative"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evaluation Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Judging Criteria
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            100% transparent grading. Total score computed out of 100 points
            across 5 weighted pillars.
          </p>
        </div>

        {/* Criteria Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {criteria.map((crit) => {
            const colors = {
              cyan: {
                text: "text-cyan-400",
                bg: "bg-cyan-400/10 border-cyan-400/30",
                bar: "bg-cyan-400",
                stroke: "#22D3EE",
              },
              violet: {
                text: "text-violet-400",
                bg: "bg-violet-400/10 border-violet-400/30",
                bar: "bg-violet-400",
                stroke: "#A78BFA",
              },
              amber: {
                text: "text-amber-400",
                bg: "bg-amber-400/10 border-amber-400/30",
                bar: "bg-amber-400",
                stroke: "#FBBF24",
              },
              emerald: {
                text: "text-emerald-400",
                bg: "bg-emerald-400/10 border-emerald-400/30",
                bar: "bg-emerald-400",
                stroke: "#34D399",
              },
            }[crit.accent];

            // SVG Circular Ring calculation
            const radius = 24;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset =
              circumference - (crit.weight / 100) * circumference;

            return (
              <div
                key={crit.title}
                className="rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  {/* Top Bar with Icon and Hand-Rolled SVG Progress Ring */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div
                      className={`p-3 rounded-xl border ${colors.bg} ${colors.text}`}
                    >
                      {crit.icon}
                    </div>

                    {/* Circular Weightage Ring */}
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg className="w-14 h-14 -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-slate-200 dark:text-white/10"
                          fill="transparent"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r={radius}
                          stroke={colors.stroke}
                          strokeWidth="4"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <span className="absolute font-mono font-extrabold text-xs text-slate-900 dark:text-white">
                        {crit.weight}%
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                    {crit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {crit.description}
                  </p>
                </div>

                {/* Key evaluation indicators */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/5 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                    Key Evaluation Signals:
                  </span>
                  {crit.indicators.map((ind, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <span className={`${colors.text} font-bold`}>✓</span>
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
