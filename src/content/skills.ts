import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "PHP", level: "Advanced" },
      { name: "SQL", level: "Intermediate" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React / Next.js", level: "Advanced" },
      { name: "Laravel", level: "Advanced" },
      { name: "FastAPI", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Advanced" },
    ],
  },
  {
    title: "AI & Tools",
    skills: [
      { name: "ResNet50 / OpenCV", level: "Intermediate" },
      { name: "Git / Docker", level: "Intermediate" },
      { name: "Vercel / Figma", level: "Intermediate" },
      { name: "REST APIs", level: "Advanced" },
    ],
  },
];
