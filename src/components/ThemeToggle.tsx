import React from "react";
import { Sun, Moon } from "lucide-react";
import type { Theme } from "../hooks/useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = "",
}) => {
  return (
    <button
      onClick={onToggle}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 border text-slate-400 hover:text-white dark:border-white/10 dark:hover:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-300 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-violet-600 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
};
