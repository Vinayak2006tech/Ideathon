import React, { useState } from "react";
import {
  Users,
  Cpu,
  PackageCheck,
  Globe2,
  CheckCircle2,
  Square,
  Sparkles,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export const Rules: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  // Local state checklist for participants
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    repo: false,
    liveUrl: false,
    video: false,
    readme: false,
    twist: false,
    responsive: false,
  });

  const checklistItems = [
    {
      id: "repo",
      title: "Public GitHub Repository",
      desc: "Clean commit history, source code, and dependencies clearly documented.",
    },
    {
      id: "liveUrl",
      title: "Live Deployed Web Application",
      desc: "Hosted on Vercel, Netlify, or GitHub Pages. Zero-friction loading.",
    },
    {
      id: "video",
      title: "60-Second Demo Video / Loom",
      desc: "Crisp walkthrough showing the core flow and twist constraint in under 1 minute.",
    },
    {
      id: "readme",
      title: "Structured README.md",
      desc: "Documenting target user, problem statement, key design decisions, and setup.",
    },
    {
      id: "twist",
      title: "Twist Constraint Verified",
      desc: "Checked against your specific problem statement's creative constraint.",
    },
    {
      id: "responsive",
      title: "Mobile Responsive (360px+)",
      desc: "No horizontal overflowing, smooth touch interactions, and accessible text.",
    },
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round(
    (completedCount / checklistItems.length) * 100
  );

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="rules"
      className="py-20 sm:py-28 border-t border-slate-200/50 dark:border-white/5 relative"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guidelines & Submission Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Rules & Submission
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Keep it lightweight, frontend-focused, and deployable in seconds.
          </p>
        </div>

        {/* Two-Column Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {/* Card 1: Eligibility & Teams */}
          <div className="rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-500 dark:text-cyan-400 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Eligibility & Teams
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Open to all developers, designers, and students worldwide.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    Team size: <strong>1 to 6 members</strong> (solo hackers
                    welcome).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    All participants must register before the submission window
                    closes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Cross-disciplinary squads (Design + Dev) are highly encouraged.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Tech Rules */}
          <div className="rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-400/10 border border-violet-400/20 text-violet-500 dark:text-violet-400 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Tech Stack & Sandbox
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Frontend-only build. Optimize for craft and execution speed.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 font-bold">•</span>
                  <span>
                    <strong>Frontend only:</strong> React, Vue, Svelte, or plain
                    HTML/CSS/JS.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 font-bold">•</span>
                  <span>
                    <strong>Zero backend required:</strong> Mock data, static
                    JSON, or free public APIs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 font-bold">•</span>
                  <span>AI coding assistants are permitted; code originality is evaluated.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Deliverables */}
          <div className="rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-500 dark:text-amber-400 flex items-center justify-center mb-5">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Required Deliverables
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Everything required for fair evaluation by the jury.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong>Public GitHub Repository</strong> with setup
                    instructions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong>Live Deployment URL</strong> accessible on any
                    browser.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong>60-Second Demo Video</strong> showing live
                    interactions and twist.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong>Concise README:</strong> Target user, problem, and
                    key design decisions.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4: Deployment Targets */}
          <div className="rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-5">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Instant Cloud Deployment
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Zero server maintenance. Instant static hosting.
              </p>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center font-mono text-xs font-semibold">
                  Vercel
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center font-mono text-xs font-semibold">
                  Netlify
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center font-mono text-xs font-semibold">
                  GitHub Pages
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ensure production builds compile with zero errors before submitting.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Submission Checklist Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-cyan-400/20 bg-gradient-to-b from-cyan-400/5 to-transparent relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                Interactive Participant Checklist
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Ready to Ship? Verify Your Submission
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Tick each requirement as your team finishes building. Saved
                locally in your browser.
              </p>
            </div>

            {/* Checklist Progress Badge */}
            <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-950/80 p-4 rounded-2xl border border-slate-200 dark:border-white/10 shrink-0">
              <div className="text-right">
                <div className="text-2xl font-mono font-extrabold text-cyan-500 dark:text-cyan-400">
                  {progressPercent}%
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {completedCount}/{checklistItems.length} Complete
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-white/10 flex items-center justify-center relative">
                <div
                  className="absolute inset-0 rounded-full border-4 border-cyan-400"
                  style={{
                    clipPath:
                      progressPercent === 100
                        ? "none"
                        : `polygon(50% 50%, 50% 0%, ${
                            progressPercent >= 25 ? "100% 0%," : ""
                          } ${progressPercent >= 50 ? "100% 100%," : ""} ${
                            progressPercent >= 75 ? "0% 100%," : ""
                          } ${progressPercent > 0 ? "0% 0%," : ""} 50% 50%)`,
                  }}
                />
                <CheckCircle2
                  className={`w-5 h-5 transition-colors ${
                    progressPercent === 100
                      ? "text-emerald-400"
                      : "text-slate-400"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Checklist Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {checklistItems.map((item) => {
              const checked = checklist[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-150 flex items-start gap-3.5 ${
                    checked
                      ? "bg-cyan-500/10 border-cyan-400/40 text-slate-900 dark:text-white"
                      : "bg-slate-100/80 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/10"
                  }`}
                >
                  {checked ? (
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div
                      className={`text-sm font-bold ${
                        checked ? "text-cyan-500 dark:text-cyan-300" : ""
                      }`}
                    >
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
