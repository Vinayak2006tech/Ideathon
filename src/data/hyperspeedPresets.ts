export interface HyperspeedSlideConfig {
  id: string;
  name: string;
  tagline: string;
  curve: 'straight' | 'gentle' | 'winding' | 'hills' | 'racing' | 'deep';
  curvature: number;
  speed: number;
  boost: number;
  tailColors: string[];
  headColors: string[];
  poleColors: string[];
  roadOpacity: number;
  glow: number;
  density: number;
}

export const hyperspeedSlides: HyperspeedSlideConfig[] = [
  {
    id: "ideathon",
    name: "Cyberpunk Sprint",
    tagline: "4 Challenges · Multi-spectral speedway",
    curve: "winding",
    curvature: 1,
    speed: 1.3,
    boost: 3.5,
    tailColors: ["#00F0FF", "#818CF8", "#06B6D4"],
    headColors: ["#C084FC", "#E879F9", "#38BDF8"],
    poleColors: ["#00F0FF"],
    roadOpacity: 0.35,
    glow: 0.9,
    density: 55,
  },
  {
    id: "decoded",
    name: "Decoded Warp",
    tagline: "PS1 · Cyan plain-language highway",
    curve: "straight",
    curvature: 0.4,
    speed: 1.6,
    boost: 4,
    tailColors: ["#22D3EE", "#38BDF8", "#00F0FF"],
    headColors: ["#67E8F9", "#0284C7", "#38BDF8"],
    poleColors: ["#22D3EE"],
    roadOpacity: 0.38,
    glow: 1.0,
    density: 60,
  },
  {
    id: "everyone-online",
    name: "Violet Inclusion",
    tagline: "PS2 · Violet low-bandwidth cruise",
    curve: "gentle",
    curvature: 0.8,
    speed: 1.2,
    boost: 3,
    tailColors: ["#C084FC", "#A855F7", "#8B5CF6"],
    headColors: ["#E879F9", "#F472B6", "#A855F7"],
    poleColors: ["#C084FC"],
    roadOpacity: 0.35,
    glow: 0.9,
    density: 50,
  },
  {
    id: "campus-pulse",
    name: "Amber Pulse",
    tagline: "PS3 · Amber campus rush",
    curve: "racing",
    curvature: 1.2,
    speed: 1.5,
    boost: 3.5,
    tailColors: ["#FBBF24", "#F59E0B", "#FCD34D"],
    headColors: ["#FDE047", "#F59E0B", "#F59E0B"],
    poleColors: ["#FBBF24"],
    roadOpacity: 0.4,
    glow: 0.95,
    density: 65,
  },
  {
    id: "greentrail",
    name: "Emerald Eco-Drift",
    tagline: "PS4 · Emerald sustainable highway",
    curve: "hills",
    curvature: 1.1,
    speed: 1.3,
    boost: 3.2,
    tailColors: ["#34D399", "#10B981", "#6EE7B7"],
    headColors: ["#6EE7B7", "#34D399", "#059669"],
    poleColors: ["#34D399"],
    roadOpacity: 0.36,
    glow: 0.9,
    density: 55,
  },
];
