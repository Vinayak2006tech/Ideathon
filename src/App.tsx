import { useState, useCallback, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import type { Problem } from "./data/problems";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { ProblemGrid } from "./components/ProblemGrid";
import { ProblemDrawer } from "./components/ProblemDrawer";
import { Rules } from "./components/Rules";
import { Judging } from "./components/Judging";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Toast, type ToastMessage } from "./components/Toast";
import { CommandPalette } from "./components/CommandPalette";
import { SprintTimerPage } from "./components/SprintTimerPage";

export function App() {
  useTheme();
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [currentView, setCurrentView] = useState<"hub" | "timer">(() => {
    if (typeof window !== "undefined" && window.location.hash === "#timer") {
      return "timer";
    }
    return "hub";
  });

  // Listen to hash changes for smooth bookmarkable navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#timer") {
        setCurrentView("timer");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCurrentView("hub");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToTimer = () => {
    window.location.hash = "timer";
    setCurrentView("timer");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHub = () => {
    window.location.hash = "overview";
    setCurrentView("hub");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto-dismiss in 2 seconds as specified
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-dark-text transition-colors duration-200">
      {/* If on the 3-Hour Sprint Timer Page */}
      {currentView === "timer" ? (
        <SprintTimerPage
          onBackToHub={navigateToHub}
          onOpenProblemBrief={(prob) => setSelectedProblem(prob)}
        />
      ) : (
        /* Standard Problem Statement Hub Page */
        <>
          <Navbar onOpenTimer={navigateToTimer} />

          <main id="main-content" className="flex-1">
            <Hero onOpenTimer={navigateToTimer} />
            <HowItWorks />
            <ProblemGrid onOpenBrief={(prob) => setSelectedProblem(prob)} />
            <Rules />
            <Judging />
            <FAQ />
          </main>

          <Footer />
        </>
      )}

      {/* Full-Screen / Slide-Over Modal Brief */}
      <ProblemDrawer
        problem={selectedProblem}
        onClose={() => setSelectedProblem(null)}
        onSelectProblem={(prob) => setSelectedProblem(prob)}
        onCopySuccess={(msg) => addToast(msg, "success")}
      />

      {/* Cmd + K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProblem={(prob) => setSelectedProblem(prob)}
        onOpenTimer={navigateToTimer}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
