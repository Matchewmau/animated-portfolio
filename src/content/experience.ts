import type { ExperienceItem } from "@/lib/types";

export const experience: ExperienceItem[] = [
  {
    role: "Lead Developer & Researcher",
    organization: "HairMixer — ECAI 2026",
    period: "2025–2026",
    location: "Zamboanga City, Philippines",
    bullets: [
      "Led development of a ResNet50 face-shape classifier with an OpenCV preprocessing pipeline.",
      "Built the FastAPI inference service and React front end, cutting latency by 40%.",
      "Authored the accepted ECAI 2026 paper and prepared the end-to-end research demo.",
    ],
    tags: ["Python", "ResNet50", "OpenCV", "FastAPI", "React"],
  },
  {
    role: "Project Manager & Lead Developer",
    organization: "PConnect Campus Platform",
    period: "2025–2026",
    location: "Zamboanga City, Philippines",
    bullets: [
      "Led a team shipping Laravel modules with role-based access control for students, faculty, and admin.",
      "Optimized MySQL queries and caching to hold sub-200ms page responses.",
      "Reduced admin overhead by 35% through automated announcements and records workflows.",
    ],
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
  },
];
