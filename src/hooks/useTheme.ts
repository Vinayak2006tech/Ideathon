import { useState, useEffect } from "react";

export type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
    try {
      localStorage.setItem("hacksprint-theme", "dark");
    } catch {
      // localStorage may fail in private mode
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme("dark");
  };

  return { theme, toggleTheme, setTheme };
}
