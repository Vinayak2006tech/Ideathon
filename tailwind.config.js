/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F17',
          card: '#131A26',
          cardHover: '#182232',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.16)',
          text: '#F3F4F6',
          muted: '#9CA3AF',
        },
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          cardHover: '#F1F5F9',
          border: 'rgba(0, 0, 0, 0.08)',
          borderHover: 'rgba(0, 0, 0, 0.16)',
          text: '#0F172A',
          muted: '#64748B',
        },
        ps: {
          cyan: {
            DEFAULT: '#22D3EE',
            light: '#06B6D4',
            dark: '#0891B2',
            glow: 'rgba(34, 211, 238, 0.25)',
            bg: 'rgba(34, 211, 238, 0.08)',
            border: 'rgba(34, 211, 238, 0.3)',
          },
          violet: {
            DEFAULT: '#A78BFA',
            light: '#8B5CF6',
            dark: '#7C3AED',
            glow: 'rgba(167, 139, 250, 0.25)',
            bg: 'rgba(167, 139, 250, 0.08)',
            border: 'rgba(167, 139, 250, 0.3)',
          },
          amber: {
            DEFAULT: '#FBBF24',
            light: '#F59E0B',
            dark: '#D97706',
            glow: 'rgba(251, 191, 36, 0.25)',
            bg: 'rgba(251, 191, 36, 0.08)',
            border: 'rgba(251, 191, 36, 0.3)',
          },
          emerald: {
            DEFAULT: '#34D399',
            light: '#10B981',
            dark: '#059669',
            glow: 'rgba(52, 211, 153, 0.25)',
            bg: 'rgba(52, 211, 153, 0.08)',
            border: 'rgba(52, 211, 153, 0.3)',
          },
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(34, 211, 238, 0.35)',
        'glow-violet': '0 0 25px -5px rgba(167, 139, 250, 0.35)',
        'glow-amber': '0 0 25px -5px rgba(251, 191, 36, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(52, 211, 153, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
