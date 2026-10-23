import type { Project, ProjectSlug } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "hairmixer-ai",
    title: "HairMixer AI",
    tagline: "CNN-powered hairstyle recommendation accepted for publication at ECAI 2026",
    year: "2026",
    role: "Lead Developer & Lead Researcher",
    stack: ["Python", "ResNet50", "OpenCV", "React.js", "FastAPI"],
    metrics: ["-40% inference latency", "ECAI 2026 published", "CNN face-shape classifier"],
    description:
      "HairMixer is an AI system that recommends hairstyles from a selfie using a ResNet50-based face-shape classifier with an OpenCV pipeline, served through a FastAPI backend and a React.js front end.",
    challenge:
      "Generic hairstyle advice ignored facial structure, and face-shape classification was too slow for interactive previews.",
    solution:
      "Built a tuned ResNet50 classifier, an optimized OpenCV pipeline, and a lightweight FastAPI inference service behind a responsive React.js UI.",
    outcome:
      "Cut inference and rendering latency by 40% and earned presentation and publication acceptance at ECAI 2026.",
    image: "/projects/hairmixer-1.png",
    gallery: ["/projects/hairmixer-1.png", "/projects/hairmixer-2.png", "/projects/hairmixer-3.png", "/projects/hairmixer-4.png", "/projects/hairmixer-5.png"],
    liveUrl: "https://github.com/matchewmau",
    repoUrl: "https://github.com/matchewmau",
    featured: true,
  },
  {
    slug: "pconnect",
    title: "PConnect",
    tagline: "Multi-tenant B2B distribution platform with RBAC and sub-200ms APIs",
    year: "2025–2026",
    role: "Project Manager & Lead Developer",
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    metrics: [
      "-35% manual processing",
      "sub-200ms API response",
      "RBAC + multi-tier commissions",
    ],
    description:
      "PConnect is a multi-tenant B2B commerce platform bridging regional suppliers and bulk commercial retailers, with role-based access, tiered commissions, and real-time inventory synchronization.",
    challenge:
      "Regional suppliers and bulk retailers depended on fragmented ordering, manual commissions, and inventory updates that did not scale.",
    solution:
      "Directed full-cycle agile development and database architecture; shipped RBAC, multi-tier commission models, real-time inventory sync, and optimized Eloquent/REST endpoints.",
    outcome:
      "Reduced manual order processing overhead by 35% while sustaining sub-200ms API responses under heavy transactional reads.",
    image: "/projects/pconnect-1.jpg",
    gallery: ["/projects/pconnect-1.jpg", "/projects/pconnect-2.jpg", "/projects/pconnect-3.jpg"],
    liveUrl: "https://github.com/matchewmau",
    repoUrl: "https://github.com/matchewmau",
    featured: true,
  },
  {
    slug: "tj-fitness",
    title: "TJ Fitness Gym Management",
    tagline: "Centralized gym management from onboarding to renewals",
    year: "2024",
    role: "Full-Stack Developer",
    stack: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "Git"],
    metrics: [
      "Centralized member records",
      "Automated renewals",
      "MVC + Git workflow",
    ],
    description:
      "A gym management system for TJ Fitness handling member onboarding, subscription renewals, daily attendance, and financial tracking with an MVC PHP backend and responsive admin dashboards.",
    challenge:
      "Membership tracking ran on paper logs and spreadsheets, causing errors, missed renewals, and slow front-desk work.",
    solution:
      "Built an MVC PHP/MySQL app with automated membership lifecycles, daily attendance, financial tracking, and automated expiry notifications.",
    outcome:
      "Gave staff a single source of truth for daily operations and reduced front-desk administrative paperwork.",
    image: "/projects/tj-fitness-1.png",
    gallery: ["/projects/tj-fitness-1.png", "/projects/tj-fitness-2.png", "/projects/tj-fitness-3.png"],
    liveUrl: "https://github.com/matchewmau",
    repoUrl: "https://github.com/matchewmau",
    featured: true,
  },
];

export function getProject(slug: ProjectSlug): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjects(): Project[] {
  return projects;
}
