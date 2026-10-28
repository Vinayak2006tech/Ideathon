import React, { useState, useMemo } from "react";
import { problems, type Problem } from "../data/problems";
import { ProblemCard } from "./ProblemCard";
import { Search, X, SlidersHorizontal, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ProblemGridProps {
  onOpenBrief: (problem: Problem) => void;
}

type FilterCategory = "All" | "Beginner-Friendly" | "Bonus-Heavy" | "Design-Heavy";

export const ProblemGrid: React.FC<ProblemGridProps> = ({ onOpenBrief }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const filterTabs: FilterCategory[] = [
    "All",
    "Beginner-Friendly",
    "Bonus-Heavy",
    "Design-Heavy",
  ];

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      // 1. Category Filter
      let matchesCategory = true;
      if (selectedFilter === "Beginner-Friendly") {
        matchesCategory = problem.tags.includes("Beginner-Friendly");
      } else if (selectedFilter === "Bonus-Heavy") {
        matchesCategory =
          problem.id === "greentrail" ||
          problem.id === "everyone-online" ||
          problem.tags.includes("Gamification");
      } else if (selectedFilter === "Design-Heavy") {
        matchesCategory =
          problem.tags.includes("Design-Heavy") ||
          problem.tags.includes("Motion-Heavy") ||
          problem.tags.includes("Inclusive Design");
      }

      if (!matchesCategory) return false;

      // 2. Search Query filter (matches title, tags, hook, background, challenge)
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchCodename = problem.codename.toLowerCase().includes(q);
      const matchSubtitle = problem.subtitle.toLowerCase().includes(q);
      const matchHook = problem.hook.toLowerCase().includes(q);
      const matchTags = problem.tags.some((t) => t.toLowerCase().includes(q));
      const matchBg = problem.background.toLowerCase().includes(q);
      const matchChallenge = problem.challenge.toLowerCase().includes(q);

      return (
        matchCodename ||
        matchSubtitle ||
        matchHook ||
        matchTags ||
        matchBg ||
        matchChallenge
      );
    });
  }, [selectedFilter, searchQuery]);

  return (
    <section id="problems" className="py-20 sm:py-28 relative">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Track Challenges</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Pick Your Challenge
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Each problem is self-contained with explicit must-haves, bonus
              vectors, and an essential twist constraint.
            </p>
          </div>

          <div className="text-sm font-mono text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              {filteredProblems.length}
            </span>{" "}
            of {problems.length} statements
          </div>
        </div>

        {/* Filter Controls Row & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-white/5">
          {/* Category Filter Chips */}
          <div
            role="tablist"
            aria-label="Problem statement filter categories"
            className="flex flex-wrap items-center gap-2"
          >
            {filterTabs.map((tab) => {
              const active = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                    active
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-md"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, tag, or topic..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Grid */}
        {filteredProblems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onOpenBrief={onOpenBrief}
              />
            ))}
          </div>
        ) : (
          /* Empty State for Search */
          <div className="rounded-2xl glass-panel p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              No matching problem statements
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              No problems match <span className="font-semibold text-cyan-400">"{searchQuery}"</span>.
              Try searching for common themes like:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["dashboard", "accessibility", "plain language", "gamification"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      setSelectedFilter("All");
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 transition-colors"
                  >
                    "{term}"
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("All");
              }}
              className="mt-6 text-xs text-slate-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
