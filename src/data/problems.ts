export interface Problem {
  id: string;
  codename: string;
  subtitle: string;
  accent: "cyan" | "violet" | "amber" | "emerald";
  icon: "ScanSearch" | "Globe" | "LayoutDashboard" | "Leaf";
  hook: string;
  tags: string[];
  difficulty: 1 | 2 | 3;
  buildTime: string;
  background: string;
  challenge: string;
  domains: string[];
  mustHaves: string[];
  twist: string;
  bonus: string[];
}

export const problems: Problem[] = [
  {
    id: "decoded",
    codename: "Decoded",
    subtitle: "Make Complex Things Instantly Understandable",
    accent: "cyan",
    icon: "ScanSearch",
    hook: "Turn a confusing document into clarity in 30 seconds.",
    tags: ["Plain Language", "Data Viz", "Design-Heavy"],
    difficulty: 2,
    buildTime: "3 hrs",
    background: `Everyday life is full of confusing information: electricity bills, lab reports, loan agreements, government scheme eligibility, insurance policies, exam syllabi. People sign, pay, or skip things they don't understand, and it costs them money, health, and opportunities.`,
    challenge: `Pick ONE domain and build a frontend experience that takes confusing information and makes it clear in under 30 seconds — using visuals, interaction, and plain language instead of walls of text.`,
    domains: [
      "A medical report explainer (what's normal, what to worry about, what to ask the doctor)",
      "A bill or expense breakdown (where the money goes, what's unusual, how to save)",
      "A scheme or scholarship eligibility finder (answer a few questions, see what you qualify for)",
      "A terms-and-conditions or contract simplifier (highlighted risky clauses)"
    ],
    mustHaves: [
      "Input flow: paste, upload mockup, or guided questions",
      "A '30-second summary' view: key takeaways, colour-coded status (good / caution / critical)",
      "Interactive visuals (charts, timelines, sliders, expandable explanations)",
      "An 'Explain like I'm new' toggle: simple vs. detailed mode",
      "Fully responsive, with a mobile-first reading experience"
    ],
    twist: "The main result screen must be understood WITHOUT scrolling on a mobile phone.",
    bonus: [
      "Multilingual toggle",
      "'What if' simulators",
      "Printable or shareable summary card",
      "Voice read-out",
      "Dark mode"
    ]
  },
  {
    id: "everyone-online",
    codename: "Everyone Online",
    subtitle: "Design for the Next Billion Users",
    accent: "violet",
    icon: "Globe",
    hook: "Make one essential service usable by someone who has never used an app.",
    tags: ["Accessibility", "Inclusive Design", "Low Bandwidth"],
    difficulty: 3,
    buildTime: "3 hrs",
    background: `Millions of first-time smartphone users, elderly people, low-literacy users, and people with slow networks or low-end devices get locked out of essential digital services because most interfaces assume fast internet, small-print literacy, and tech confidence.`,
    challenge: `Build an inclusive web experience for ONE essential service, so a first-time user can complete a task without help.`,
    domains: [
      "Booking a doctor or vaccination slot",
      "Paying a utility bill or fee",
      "Applying for a certificate or government service",
      "Ordering groceries or medicines from a local shop"
    ],
    mustHaves: [
      "A guided, step-by-step flow with one clear action per screen",
      "Large touch targets, high contrast, and readable typography",
      "At least two languages, switchable at any point",
      "Icons and visuals that reduce dependence on reading",
      "Graceful low-bandwidth behaviour (lightweight assets, loading states, offline or error messages that make sense)",
      "Keyboard and screen-reader friendliness"
    ],
    twist: "The app must stay usable on a throttled 'Slow 3G' connection (testable in DevTools) and load within a reasonable time.",
    bonus: [
      "Voice input or voice guidance",
      "A 'help me' assistant",
      "Large-text or simple mode",
      "PWA or offline support",
      "Trust-building design (clear confirmations, undo, no dark patterns)"
    ]
  },
  {
    id: "campus-pulse",
    codename: "Campus Pulse",
    subtitle: "A Smart Student Hub",
    accent: "amber",
    icon: "LayoutDashboard",
    hook: "One dashboard for a student's entire campus life.",
    tags: ["Dashboard", "Beginner-Friendly", "No Backend"],
    difficulty: 1,
    buildTime: "3 hrs",
    background: `Students juggle timetables, assignments, club events, exam alerts, and notices across WhatsApp groups, emails, and PDFs. Important information gets lost and the experience is fragmented.`,
    challenge: `Design and build a single, intuitive web dashboard that gives a student one clear view of their academic and campus life.`,
    domains: [
      "Academic scheduling & lecture timetables with venue directions",
      "Assignment deadlines with integrated priority matrix",
      "Campus events & student club announcement feed",
      "Hostel, mess, and administrative emergency notices"
    ],
    mustHaves: [
      "Personalized dashboard (today's classes, deadlines, events)",
      "Calendar or timeline view with filters (academics, clubs, exams)",
      "Notification or notice center with priority tagging",
      "Fully responsive layout (mobile, tablet, desktop)"
    ],
    twist: "The dashboard must be usable one-handed on a phone — no horizontal scrolling, no pinch-zoom required.",
    bonus: [
      "Dark/light mode",
      "Drag-and-drop task planner",
      "Smart 'what should I do next?' widget",
      "Accessibility features",
      "Offline-friendly UI"
    ]
  },
  {
    id: "greentrail",
    codename: "GreenTrail",
    subtitle: "A Sustainable Living Companion",
    accent: "emerald",
    icon: "Leaf",
    hook: "Make eco-tracking so fun people forget it's a chore.",
    tags: ["Gamification", "Data Viz", "Motion-Heavy"],
    difficulty: 2,
    buildTime: "3 hrs",
    background: `People want to live more sustainably, but they lack a simple, motivating way to see their daily impact (energy, water, travel, waste) and act on it.`,
    challenge: `Build an engaging frontend experience that helps users track, visualize, and improve their eco-footprint through creative interaction rather than boring forms and tables.`,
    domains: [
      "Daily commute emission tracker (metro vs cab vs cycling)",
      "Household utility & plastic-free streak keeper",
      "Campus & local community eco-action challenges",
      "Food waste & reusable container logger"
    ],
    mustHaves: [
      "Quick daily-habit logging (transport, energy, food, waste)",
      "Visual impact dashboard (charts, progress rings, or animated visuals)",
      "Goals, streaks, or challenges to keep users engaged",
      "Responsive design with smooth transitions and micro-interactions"
    ],
    twist: "Logging a daily habit must take 3 taps or fewer — time it and prove it.",
    bonus: [
      "Community leaderboard (mock data)",
      "Carbon-savings 'tree growth' visualization",
      "Personalized tips",
      "Shareable impact cards",
      "3D or animated elements"
    ]
  }
];
