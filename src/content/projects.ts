import type { Project, ProjectSlug } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "hairmixer-ai",
    title: "HairMixer AI",
    tagline: "CNN-powered hairstyle recommendation accepted at ECAI 2026",
    year: "2026",
    role: "Lead Developer & Researcher",
    stack: ["Python", "ResNet50", "OpenCV", "React", "FastAPI"],
    metrics: ["-40% inference latency", "ECAI 2026 accepted", "CNN face-shape classifier"],
    description:
      "HairMixer is an AI system that recommends hairstyles from a selfie using a ResNet50-based face-shape classifier with an OpenCV preprocessing pipeline, served through a FastAPI backend and a React front end.",
    challenge:
      "Hairstyle advice was generic and face-shape classification was too slow for interactive use.",
    solution:
      "Built a tuned ResNet50 classifier with an optimized OpenCV pipeline and a lightweight FastAPI inference service behind a responsive React UI.",
    outcome:
      "Cut inference latency by 40% and earned acceptance at ECAI 2026 with a working end-to-end demo.",
    image: "/projects/hairmixer-1.png",
    gallery: ["/projects/hairmixer-1.png", "/projects/hairmixer-2.png", "/projects/hairmixer-3.png", "/projects/hairmixer-4.png", "/projects/hairmixer-5.png"],
    liveUrl: "https://github.com/matchewmau",
    repoUrl: "https://github.com/matchewmau",
    featured: true,
  },
  {
    slug: "pconnect",
    title: "PConnect",
    tagline: "Campus connection platform with RBAC and sub-200ms pages",
    year: "2025–2026",
    role: "Project Manager & Lead Developer",
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    metrics: ["-35% admin overhead", "sub-200ms page response", "Role-based access control"],
    description:
      "PConnect is a campus platform connecting students, faculty, and admin with announcements, records, and role-based workflows built on Laravel and MySQL.",
    challenge:
      "Campus communication was fragmented and manual admin work consumed staff hours every week.",
    solution:
      "Led the team to ship Laravel modules with RBAC, queued notifications, indexed queries, and a Tailwind UI tuned for low-end devices.",
    outcome:
      "Reduced admin overhead by 35% with consistent sub-200ms page responses in production use.",
    image: "/projects/pconnect-1.jpg",
    gallery: ["/projects/pconnect-1.jpg", "/projects/pconnect-2.jpg", "/projects/pconnect-3.jpg"],
    liveUrl: "https://github.com/matchewmau",
    repoUrl: "https://github.com/matchewmau",
    featured: true,
  },
  {
    slug: "tj-fitness",
    title: "TJ Fitness Gym Management",
    tagline: "MVC membership system that cut gym paperwork by half",
    year: "2024",
    role: "Full-Stack Developer",
    stack: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "Git"],
    metrics: ["-50% paperwork", "Automated memberships", "MVC architecture"],
    description:
      "A gym management system for TJ Fitness handling members, plans, attendance, and billing with an MVC PHP backend and a Tailwind interface.",
    challenge:
      "Membership tracking ran on paper logs and spreadsheets, causing errors and slow renewals.",
    solution:
      "Built an MVC PHP/MySQL app with automated membership lifecycles, attendance tracking, and printable billing reports.",
    outcome:
      "Cut gym paperwork by 50% and gave staff a single source of truth for daily operations.",
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
