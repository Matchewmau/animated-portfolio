import type { ExperienceItem } from "@/lib/types";

export const experience: ExperienceItem[] = [
  {
    role: "Lead Developer & Lead Researcher",
    organization:
      "HairMixer — AI-Powered Hairstyle Recommendation & Simulation System",
    period: "May 2026",
    location: "Zamboanga City, Philippines",
    bullets: [
      "Architected and trained an end-to-end computer vision pipeline using ResNet50 and OpenCV for multi-class facial-structure classification and landmark mapping.",
      "Engineered a full-stack interactive simulation app with React.js and FastAPI, reducing client-side inference and rendering latency by 40%.",
      "Authored the peer-reviewed manuscript “HairMixer: A Hairstyle Recommendation and Simulation System Based on Facial Structure Using CNNs,” accepted for presentation and publication at ECAI 2026.",
    ],
    tags: ["Python", "ResNet50", "OpenCV", "React.js", "FastAPI"],
  },
  {
    role: "Project Manager & Lead Developer",
    organization: "PConnect — B2B Distribution & E-Commerce Platform",
    period: "Mar 2025 – Sept 2026",
    location: "Zamboanga City, Philippines",
    bullets: [
      "Directed full-cycle agile development and database architecture for a multi-tenant B2B commerce platform bridging regional suppliers and bulk commercial retailers.",
      "Implemented role-based access control, multi-tier transaction commission models, and real-time inventory synchronization, reducing manual order processing overhead by 35%.",
      "Optimized Eloquent ORM queries, indexing, and REST API endpoints, sustaining sub-200ms response times during heavy transactional reads.",
    ],
    tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS"],
  },
  {
    role: "Full-Stack Developer",
    organization: "TJ Fitness — Full-Stack Gym Management System",
    period: "Aug 2024 – Nov 2024",
    location: "Zamboanga City, Philippines",
    bullets: [
      "Designed and deployed a centralized management system to automate member onboarding, subscription renewals, daily attendance, and financial tracking.",
      "Created responsive administrative dashboards with automated expiry notifications, decreasing front-desk administrative paperwork.",
      "Standardized modular MVC architecture and Git branch workflows to ensure continuous integration and maintain code quality.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "Git"],
  },
];
