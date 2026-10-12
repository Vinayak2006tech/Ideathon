import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  ArrowLeft,
  Clock,
  Zap,
} from "lucide-react";
import { problems, type Problem } from "../data/problems";
import { Hyperspeed } from "./Hyperspeed";
import { hyperspeedSlides } from "../data/hyperspeedPresets";

interface SprintTimerPageProps {
  onBackToHub: () => void;
  onOpenProblemBrief: (problem: Problem) => void;
}

interface SprintPhase {
  title: string;
  durationRange: string;
  startSec: number;
  endSec: number;
  description: string;
  focus: string;
}

const TOTAL_SPRINT_SECONDS = 3 * 60 * 60; // 10800 seconds = 3 hours

const PHASES: SprintPhase[] = [
  {
    title: "Phase 1: Architecture & Mock Data",
    durationRange: "0:00 - 0:30",
    startSec: 0,
    endSec: 30 * 60,
    description: "Lock problem choice, scaffold app, define data JSON, layout wireframes.",
    focus: "Setup & Skeleton",
  },
  {
    title: "Phase 2: Core Flow & Must-Haves",
    durationRange: "0:30 - 1:30",
    startSec: 30 * 60,
    endSec: 90 * 60,
    description: "Build primary interactive user journey and integrate mock datasets.",
    focus: "Main Features",
  },
  {
    title: "Phase 3: Tackle the Twist Constraint",
    durationRange: "1:30 - 2:15",
    startSec: 90 * 60,
    endSec: 135 * 60,
    description: "Solve your problem's unique constraint (3-tap log, 3G speed, mobile above-fold).",
    focus: "Twist Constraint",
  },
  {
    title: "Phase 4: Responsive Polish & Deploy",
    durationRange: "2:15 - 2:45",
    startSec: 135 * 60,
    endSec: 165 * 60,
    description: "Test 360px mobile view, deploy to Vercel/Netlify, check for 0 console errors.",
    focus: "Live Deployment",
  },
  {
    title: "Phase 5: 60s Demo Video & Submission",
    durationRange: "2:45 - 3:00",
    startSec: 165 * 60,
    endSec: 180 * 60,
    description: "Record crisp Loom video, fill submission checklist, and submit GitHub link.",
    focus: "Final Submission",
  },
];

export const SprintTimerPage: React.FC<SprintTimerPageProps> = ({
  onBackToHub,
  onOpenProblemBrief,
}) => {
  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    const saved = localStorage.getItem("hacksprint-timer-seconds");
    return saved !== null ? parseInt(saved, 10) : TOTAL_SPRINT_SECONDS;
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedProblemId, setSelectedProblemId] = useState<string>("decoded");

  const timerRef = useRef<number | null>(null);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("hacksprint-timer-seconds", secondsRemaining.toString());
  }, [secondsRemaining]);

  // Interval ticker
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (soundEnabled) {
              playAlertSound();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, soundEnabled]);

  const playAlertSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // AudioContext fallback
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = (duration = TOTAL_SPRINT_SECONDS) => {
    setIsRunning(false);
    setSecondsRemaining(duration);
  };

  const adjustTime = (deltaSeconds: number) => {
    setSecondsRemaining((prev) => Math.max(0, Math.min(TOTAL_SPRINT_SECONDS * 2, prev + deltaSeconds)));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      pageContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Time calculations
  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const elapsedSeconds = Math.max(0, TOTAL_SPRINT_SECONDS - secondsRemaining);
  const progressPercent = Math.min(100, Math.round((elapsedSeconds / TOTAL_SPRINT_SECONDS) * 100));

  // Current milestone phase determination
  const currentPhaseIndex = PHASES.findIndex(
    (p) => elapsedSeconds >= p.startSec && elapsedSeconds < p.endSec
  );
  const activePhase = PHASES[currentPhaseIndex >= 0 ? currentPhaseIndex : PHASES.length - 1];

  const selectedProblem = problems.find((p) => p.id === selectedProblemId) || problems[0];
  const slideConfig = hyperspeedSlides.find((s) => s.id === selectedProblemId) || hyperspeedSlides[0];

  const format2Digits = (num: number) => num.toString().padStart(2, "0");

  return (
    <div
      ref={pageContainerRef}
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
        isFullscreen ? "p-6 sm:p-12" : "py-8 px-4 sm:px-6 lg:px-8"
      }`}
    >
      {/* High-Visibility Projector Background (Decreased Transparency / High Opacity) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
        <Hyperspeed
          key={selectedProblemId + (isRunning ? "_running" : "_paused")}
          curve={slideConfig.curve}
          curvature={slideConfig.curvature}
          speed={isRunning ? slideConfig.speed * 1.6 : slideConfig.speed * 0.9}
          boost={isRunning ? 4 : 2.5}
          density={45}
          glow={0.85}
          roadOpacity={0.35}
          lightSize={1.4}
          tailColors={slideConfig.tailColors}
          headColors={slideConfig.headColors}
          poleColors={slideConfig.poleColors}
          interactive={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/40 to-slate-950/80" />
      </div>

      {/* Top Bar Navigation & Controls */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 mb-8 relative z-10">
        <button
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-slate-950/80 hover:bg-slate-900 text-xs sm:text-sm font-semibold transition-colors text-slate-200 hover:text-white backdrop-blur-md shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Problem Hub</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl border border-white/20 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors backdrop-blur-md shadow-lg"
            title={soundEnabled ? "Mute alert chimes" : "Unmute alert chimes"}
            aria-label="Toggle audio alert"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl border border-white/20 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors backdrop-blur-md shadow-lg"
            title={isFullscreen ? "Exit Fullscreen" : "Projector Fullscreen Mode"}
            aria-label="Toggle fullscreen mode"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <Maximize2 className="w-4 h-4 text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* Main Countdown Display Center */}
      <div className="max-w-5xl mx-auto w-full my-auto text-center relative z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/50 bg-slate-950/90 text-cyan-300 text-xs sm:text-sm font-mono font-semibold mb-6 backdrop-blur-md shadow-xl shadow-cyan-500/10">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isRunning ? "bg-emerald-400 animate-ping" : "bg-amber-400"
            }`}
          />
          <span>{isRunning ? "SPRINT ACTIVE — TIME RUNNING" : "SPRINT PAUSED"}</span>
          <span className="text-slate-500">|</span>
          <span>{progressPercent}% Complete</span>
        </div>

        {/* Large Digital Clock Face */}
        <div className="relative py-4 sm:py-8">
          {/* Ambient Backlight Glow */}
          <div
            className={`absolute inset-0 blur-[130px] pointer-events-none rounded-full transition-all duration-500 ${
              secondsRemaining < 600
                ? "bg-rose-500/25"
                : isRunning
                ? "bg-cyan-500/25"
                : "bg-amber-500/20"
            }`}
            aria-hidden="true"
          />

          <div
            className={`font-mono font-extrabold tracking-tighter select-none leading-none flex items-center justify-center gap-1 sm:gap-3 transition-colors ${
              secondsRemaining < 600
                ? "text-rose-400"
                : "text-white"
            } text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)]`}
          >
            <div className="flex flex-col items-center">
              <span>{format2Digits(hours)}</span>
              <span className="text-[10px] sm:text-xs font-sans font-medium uppercase tracking-widest text-slate-300 mt-2">
                Hours
              </span>
            </div>
            <span className="text-slate-400 mb-6 sm:mb-10 animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span>{format2Digits(minutes)}</span>
              <span className="text-[10px] sm:text-xs font-sans font-medium uppercase tracking-widest text-slate-300 mt-2">
                Minutes
              </span>
            </div>
            <span className="text-slate-400 mb-6 sm:mb-10 animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span>{format2Digits(seconds)}</span>
              <span className="text-[10px] sm:text-xs font-sans font-medium uppercase tracking-widest text-slate-300 mt-2">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar with Milestone Markers */}
        <div className="max-w-2xl mx-auto my-6 px-4">
          <div className="h-3.5 w-full bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-white/20 relative backdrop-blur-md shadow-lg">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                secondsRemaining < 600
                  ? "bg-gradient-to-r from-amber-400 to-rose-400 shadow-glow-amber"
                  : "bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 shadow-glow-cyan"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-300 mt-2 font-medium">
            <span>00:00 (Kickoff)</span>
            <span>01:30 (Midpoint)</span>
            <span>03:00 (Submission Lock)</span>
          </div>
        </div>

        {/* Main Controls (Start, Pause, Reset, Adjust) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
          <button
            onClick={() => adjustTime(-300)}
            className="p-3 sm:px-4 sm:py-3 rounded-2xl border border-white/20 bg-slate-950/85 hover:bg-slate-900 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors backdrop-blur-md shadow-lg"
            title="Subtract 5 Minutes"
          >
            <Minus className="w-4 h-4" />
            <span className="hidden sm:inline">5 min</span>
          </button>

          <button
            onClick={toggleTimer}
            className={`px-8 sm:px-12 py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 flex items-center gap-3 shadow-2xl ${
              isRunning
                ? "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/30"
                : "bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 shadow-cyan-400/35 hover:scale-105"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause Sprint</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Start 3-Hour Sprint</span>
              </>
            )}
          </button>

          <button
            onClick={() => resetTimer(TOTAL_SPRINT_SECONDS)}
            className="p-3 sm:px-4 sm:py-3 rounded-2xl border border-white/20 bg-slate-950/85 hover:bg-slate-900 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors backdrop-blur-md shadow-lg"
            title="Reset to 3 Hours"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => adjustTime(300)}
            className="p-3 sm:px-4 sm:py-3 rounded-2xl border border-white/20 bg-slate-950/85 hover:bg-slate-900 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors backdrop-blur-md shadow-lg"
            title="Add 5 Minutes"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">5 min</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-mono">
          <span className="text-slate-300 mr-1">Presets:</span>
          <button
            onClick={() => resetTimer(3 * 3600)}
            className="px-2.5 py-1 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-white/20 text-slate-200 backdrop-blur-md shadow"
          >
            3 Hours (Full)
          </button>
          <button
            onClick={() => resetTimer(1 * 3600)}
            className="px-2.5 py-1 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-white/20 text-slate-200 backdrop-blur-md shadow"
          >
            1 Hour (Polish)
          </button>
          <button
            onClick={() => resetTimer(30 * 60)}
            className="px-2.5 py-1 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-white/20 text-slate-200 backdrop-blur-md shadow"
          >
            30 Mins (Deploy)
          </button>
          <button
            onClick={() => resetTimer(10 * 60)}
            className="px-2.5 py-1 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-white/20 text-slate-200 backdrop-blur-md shadow"
          >
            10 Mins (Crunch)
          </button>
        </div>
      </div>

      {/* Bottom Section: Active Milestone & Problem Pin */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-white/15 mt-10 relative z-10">
        {/* Card 1: Current Sprint Phase Guide */}
        <div className="rounded-2xl glass-panel p-6 border border-white/20 bg-slate-950/75 relative overflow-hidden text-left backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Current Sprint Milestone</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-semibold">
              {activePhase.durationRange}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-1">
            {activePhase.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mb-4 leading-relaxed">
            {activePhase.description}
          </p>

          <div className="grid grid-cols-5 gap-1.5 pt-3 border-t border-white/10">
            {PHASES.map((phase, idx) => {
              const isPast = elapsedSeconds >= phase.endSec;
              const isCurrent = idx === currentPhaseIndex;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-center transition-all ${
                    isCurrent
                      ? "bg-cyan-500/30 border border-cyan-300 text-cyan-200 font-bold shadow-glow-cyan"
                      : isPast
                      ? "bg-white/10 text-slate-400 line-through"
                      : "bg-white/5 text-slate-500"
                  }`}
                  title={`${phase.title} (${phase.durationRange})`}
                >
                  <div className="text-[10px] font-mono">P{idx + 1}</div>
                  <div className="text-[9px] truncate">{phase.focus}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 2: Chosen Problem & Twist Pin */}
        <div className="rounded-2xl glass-panel p-6 border border-amber-400/30 bg-slate-950/75 text-left flex flex-col justify-between backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Pinned Challenge Twist</span>
              </div>

              {/* Problem Selector Dropdown */}
              <select
                value={selectedProblemId}
                onChange={(e) => setSelectedProblemId(e.target.value)}
                className="bg-slate-900 border border-white/20 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                {problems.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.codename}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <span className="text-sm font-bold text-white">
                {selectedProblem.codename}
              </span>{" "}
              <span className="text-xs text-slate-300">
                — {selectedProblem.subtitle}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-400/20 text-xs sm:text-sm text-amber-200 font-medium leading-relaxed">
              ⚡ <strong>Twist Constraint:</strong> "{selectedProblem.twist}"
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/10 text-xs">
            <span className="text-slate-300">
              Target: Under 30s comprehension
            </span>
            <button
              onClick={() => onOpenProblemBrief(selectedProblem)}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View Full Brief</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
