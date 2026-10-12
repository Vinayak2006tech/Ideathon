export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Technical" | "Submission";
}

export const faqItems: FAQItem[] = [
  {
    id: "backend-needed",
    question: "Do I need a backend or database?",
    answer: "No. This hackathon is 100% frontend-first! You are encouraged to use local JSON files, mock data, in-memory state, or free public CORS-enabled APIs. No database setup, no auth server, and no cloud backends are required.",
    category: "Technical"
  },
  {
    id: "ai-tools",
    question: "Can I use AI coding tools like Copilot, v0, or ChatGPT?",
    answer: "Yes, modern development tools are welcomed! However, your team must deeply understand your codebase, architectural choices, and design rationale. During the demo round, judges will ask technical questions about component architecture, state management, and accessibility decisions.",
    category: "General"
  },
  {
    id: "multiple-problems",
    question: "Can our team submit solutions to multiple problems?",
    answer: "Each team must choose exactly ONE primary problem statement to submit for official judging. We recommend focusing your entire 3-hour sprint on crafting an exceptional, polished experience for one challenge rather than splitting focus.",
    category: "Submission"
  },
  {
    id: "solo-participation",
    question: "Can I participate as a solo hacker?",
    answer: "Yes! Teams can be anywhere from 1 to 6 members. Solo hackers compete on an equal footing and create standout, award-worthy projects.",
    category: "General"
  },
  {
    id: "twist-constraint",
    question: "How strictly is the 'Twist Constraint' judged?",
    answer: "Very strictly! The Twist Constraint is the creative signature of each problem statement (e.g. 3-tap habit logging, mobile above-the-fold clarity, or throttled 3G performance). It carries significant weight under the 'Craft & Polish' and 'Problem Fit' judging criteria.",
    category: "Technical"
  },
  {
    id: "mock-data-specs",
    question: "What kind of mock data should I provide?",
    answer: "Use realistic, high-fidelity mock data rather than placeholder strings like 'Lorem Ipsum' or 'Test 123'. Include realistic names, edge-case numbers, diverse dates, and varied status states to demonstrate real-world resilience.",
    category: "Technical"
  },
  {
    id: "deployment-platforms",
    question: "Where should our frontend be hosted?",
    answer: "Any zero-config static hosting platform works: Vercel, Netlify, GitHub Pages, or Cloudflare Pages. A live, publicly accessible URL is mandatory for your submission form.",
    category: "Submission"
  },
  {
    id: "broken-build",
    question: "What happens if our live build breaks right before the deadline?",
    answer: "Always deploy early and test often! We recommend pushing a minimal working skeleton in the first 30 minutes, then continuously deploying small commits. If a last-minute deployment fails, your GitHub commit history timestamp and local demo recording can be reviewed by the jury.",
    category: "Submission"
  }
];
