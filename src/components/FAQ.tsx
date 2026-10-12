import React, { useState } from "react";
import { faqItems } from "../data/faq";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "backend-needed": true, // open first by default
  });
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 border-t border-slate-200/50 dark:border-white/5 relative"
    >
      <div ref={sectionRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Clear guidelines on hackathon constraints, submissions, and
            evaluation rules.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqItems.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className={`rounded-2xl glass-panel border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-cyan-400/30 bg-slate-100/90 dark:bg-white/[0.07]"
                    : "border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-2xl"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      {item.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                      {item.category}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-cyan-400" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-white/5 animate-fade-in"
                  >
                    <p className="mt-2">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
