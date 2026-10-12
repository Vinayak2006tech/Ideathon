export interface TimelineStep {
  step: number;
  title: string;
  copy: string;
  icon: string;
  duration: string;
}

export const timelineSteps: TimelineStep[] = [
  {
    step: 1,
    title: "Registration & Team Up",
    copy: "Form your squad of 1–6 builders and claim your hacker pass.",
    icon: "Users",
    duration: "Kickoff",
  },
  {
    step: 2,
    title: "Problem Selection",
    copy: "Deconstruct the 4 statements, review twist constraints, and lock your brief.",
    icon: "Crosshair",
    duration: "Hour 0",
  },
  {
    step: 3,
    title: "3-Hour Build Sprint",
    copy: "Craft your frontend with mock data, polished UI, and zero backend friction.",
    icon: "Code2",
    duration: "Hours 1–3",
  },
  {
    step: 4,
    title: "Instant Submission",
    copy: "Ship live to Vercel/Netlify, push to GitHub, and record a 60s demo link.",
    icon: "UploadCloud",
    duration: "Deadline",
  },
  {
    step: 5,
    title: "Live Demo & Judging",
    copy: "Showcase your interactive prototype to the jury and celebrate wins.",
    icon: "Award",
    duration: "Grand Finale",
  },
];
