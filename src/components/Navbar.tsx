import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, Timer } from "lucide-react";

interface NavbarProps {
  onOpenTimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTimer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Problems", href: "#problems" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Rules", href: "#rules" },
    { label: "Judging", href: "#judging" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Depth Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 w-full glass-nav transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo Mark + Ideathon (SDG Council) Wordmark */}
          <a
            href="#overview"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-lg p-1"
            aria-label="Ideathon (SDG Council) Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-violet-600 to-emerald-400 p-[1.5px] transition-transform duration-200 group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-1.5 text-slate-900 dark:text-white">
                Ideathon
                <span className="text-[10px] font-mono tracking-wide px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 font-semibold">
                  (SDG Council)
                </span>
              </span>
              <span className="text-[11px] font-mono tracking-wider text-slate-500 dark:text-slate-400 hidden sm:block">
                Problem Statement Hub
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              >
                {link.label}
              </a>
            ))}

            {/* 3h Sprint Timer Link */}
            <button
              onClick={onOpenTimer}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-amber-500 dark:text-amber-400 hover:bg-amber-400/10 border border-amber-400/20 transition-colors"
              title="Open 3-Hour Sprint Countdown Timer"
            >
              <Timer className="w-3.5 h-3.5 animate-pulse" />
              <span>3h Counter</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Sheet */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-6 py-8 flex flex-col justify-start animate-fade-in"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 px-3">
                Navigation
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="px-4 py-3 rounded-xl text-lg font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTimer();
                }}
                className="px-4 py-3 rounded-xl text-lg font-bold text-amber-400 hover:bg-white/5 flex items-center justify-between text-left mt-2 border border-amber-400/20 bg-amber-400/5"
              >
                <span>3-Hour Sprint Counter</span>
                <Timer className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
