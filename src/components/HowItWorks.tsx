import React from "react";
import { timelineSteps } from "../data/timeline";
import { Users, Crosshair, Code2, UploadCloud, Award } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export const HowItWorks: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="w-5 h-5" />;
      case "Crosshair":
        return <Crosshair className="w-5 h-5" />;
      case "Code2":
        return <Code2 className="w-5 h-5" />;
      case "UploadCloud":
        return <UploadCloud className="w-5 h-5" />;
      case "Award":
        return <Award className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 border-t border-slate-200/50 dark:border-white/5 relative"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-2">
            Sprint Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Ideathon (SDG Council) Works
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            From initial problem statement unlock to live demo in 5 structured
            milestones.
          </p>
        </div>

        {/* 5-Step Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] -translate-y-6 bg-gradient-to-r from-cyan-500/20 via-violet-500/30 to-emerald-500/20 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
            {timelineSteps.map((step, idx) => {
              const stepColors = [
                "border-cyan-400/30 text-cyan-400 bg-cyan-400/10 group-hover:border-cyan-400",
                "border-violet-400/30 text-violet-400 bg-violet-400/10 group-hover:border-violet-400",
                "border-amber-400/30 text-amber-400 bg-amber-400/10 group-hover:border-amber-400",
                "border-emerald-400/30 text-emerald-400 bg-emerald-400/10 group-hover:border-emerald-400",
                "border-cyan-400/30 text-cyan-400 bg-cyan-400/10 group-hover:border-cyan-400",
              ];
              const colorClass = stepColors[idx % stepColors.length];

              return (
                <div
                  key={step.step}
                  className="group relative rounded-2xl glass-panel p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:hover:bg-slate-800/60 flex flex-col justify-between"
                >
                  <div>
                    {/* Step badge & icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${colorClass}`}
                      >
                        {getStepIcon(step.icon)}
                      </div>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                        {step.duration}
                      </span>
                    </div>

                    <div className="text-xs font-mono font-bold text-slate-400 mb-1">
                      Step 0{step.step}
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                    {step.copy}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
