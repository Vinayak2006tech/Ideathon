import React, { useState } from "react";
import {
  ArrowDown,
  FileCode2,
  Clock,
  Users,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Radio,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Hyperspeed } from "./Hyperspeed";
import { TechText } from "./TechText";
import { hyperspeedSlides } from "../data/hyperspeedPresets";

interface HeroProps {
  onOpenTimer?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTimer }) => {
  const heroRef = useScrollReveal<HTMLDivElement>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeSlide = hyperspeedSlides[currentSlideIndex];

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % hyperspeedSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(
      (prev) => (prev - 1 + hyperspeedSlides.length) % hyperspeedSlides.length
    );
  };

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="overview"
      className="relative min-h-[94vh] flex flex-col justify-center pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden transition-colors duration-200"
    >
      {/* High-Visibility Projector-Tuned Hyperspeed Background (Low Transparency) */}
      <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden opacity-95">
        <Hyperspeed
          key={activeSlide.id}
          curve={activeSlide.curve}
          curvature={activeSlide.curvature}
          speed={activeSlide.speed}
          boost={activeSlide.boost}
          fov={88}
          boostFov={135}
          lanes={3}
          roadWidth={11}
          medianWidth={2.2}
          density={activeSlide.density}
          trailLength={1.2}
          lightSize={1.5}
          poles={26}
          dust={200}
          glow={activeSlide.glow}
          reflections={0.7}
          roadOpacity={activeSlide.roadOpacity}
          steer={0.35}
          tailColors={activeSlide.tailColors}
          headColors={activeSlide.headColors}
          poleColors={activeSlide.poleColors}
          interactive={true}
        />

        {/* Lighter, balanced gradient overlay so projector displays crisp, bright trails */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950/85 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div
        ref={heroRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Top Highlight Badge & Live Slide Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/40 bg-slate-950/80 text-cyan-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-cyan-400" />
            <span className="font-semibold tracking-wide">
              Ideathon (SDG Council)
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          {/* Interactive Background Slide Switcher Pill */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full border border-white/20 bg-slate-950/85 backdrop-blur-md text-xs font-mono shadow-lg">
            <button
              onClick={prevSlide}
              className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Previous Background Slide"
              aria-label="Previous background slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1 px-1.5">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-white font-semibold">
                Slide {currentSlideIndex + 1}/{hyperspeedSlides.length}:
              </span>
              <span className="text-cyan-400 font-bold hidden sm:inline">
                {activeSlide.name}
              </span>
            </div>
            <button
              onClick={nextSlide}
              className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Next Background Slide"
              aria-label="Next background slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* TechText Interactive Wordmark from React Bits */}
        <div className="w-full max-w-4xl mx-auto h-[110px] sm:h-[150px] md:h-[180px] relative my-1">
          <TechText
            text="IDEATHON"
            fontWeight={800}
            fontSize={140}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            color="#FFFFFF"
            accentColor="#00F0FF"
            draggable={true}
            sweep={true}
            speed={1}
          />
        </div>

        {/* Headline with High-Contrast Background Shading */}
        <div className="max-w-5xl mx-auto backdrop-blur-[2px] rounded-3xl py-2 px-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Four Problems.{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
              Three Hrs to Build Something That Matters.
            </span>
          </h1>

          {/* Subline */}
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-100 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Frontend-first challenges. Mock data allowed. No backend required.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={() => scrollTo("#problems")}
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-200 text-slate-950 shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          >
            <span>Browse Problems</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          <button
            onClick={() => scrollTo("#rules")}
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 border border-white/25 bg-slate-950/75 hover:bg-slate-950/90 text-white backdrop-blur-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 shadow-xl"
          >
            <FileCode2 className="w-4 h-4 text-cyan-400" />
            <span>View Rules</span>
          </button>

          {onOpenTimer && (
            <button
              onClick={onOpenTimer}
              type="button"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-base transition-all duration-200 border border-amber-400/50 bg-slate-950/80 hover:bg-slate-900 text-amber-300 flex items-center justify-center gap-2 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400/50 shadow-xl shadow-amber-400/10"
            >
              <Clock className="w-4 h-4 animate-pulse text-amber-400" />
              <span>3-Hour Sprint Timer</span>
            </button>
          )}
        </div>

        {/* Live Stat Strip */}
        <div className="mt-10 max-w-3xl mx-auto rounded-2xl glass-panel p-4 sm:p-6 shadow-2xl backdrop-blur-xl border border-white/15 bg-slate-950/70">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                <Layers className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold font-mono">
                  4
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-200">
                Problem Statements
              </span>
            </div>

            {/* Stat 2 - Interactive 3-Hour Sprint Counter Launcher */}
            <button
              onClick={onOpenTimer}
              className="flex flex-col items-center justify-center p-2 text-center group hover:bg-white/10 rounded-xl transition-colors cursor-pointer pt-4 sm:pt-2"
              title="Launch the 3-Hour Countdown Clock"
            >
              <div className="flex items-center gap-1.5 text-amber-400 mb-1 group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold font-mono">
                  3-Hour
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-200 flex items-center gap-1">
                <span>Focused Sprint</span>
                <span className="text-[10px] text-amber-400 font-mono font-bold">
                  [Timer →]
                </span>
              </span>
            </button>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center p-2 text-center pt-4 sm:pt-2">
              <div className="flex items-center gap-1.5 text-violet-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold font-mono">
                  1–6
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-200">
                Person Teams
              </span>
            </div>
          </div>
        </div>

        {/* Tip for interactive boost */}
        <div className="mt-4 text-[11px] font-mono text-slate-300">
          💡 Tip: Click and hold anywhere on the background to engage <span className="text-cyan-300 font-semibold">Hyperspeed Boost</span>!
        </div>
      </div>
    </section>
  );
};
