import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "John Mauricio",
  title: "Full-Stack Software Engineer — Web & AI Systems Developer",
  location: "Zamboanga City, Philippines",
  email: "johnmathewmau@gmail.com",
  github: "https://github.com/matchewmau",
  linkedin: "https://www.linkedin.com/in/john-mauricio",
  resumeUrl: "/resume.pdf",
  headline: "I build fast web apps and practical AI systems.",
  subhead:
    "Full-stack developer working with React, Next.js, Laravel, and FastAPI. Currently leading HairMixer — a CNN-powered hairstyle recommendation system accepted at ECAI 2026 — plus campus platforms used by real students and staff.",
  proof: [
    { value: "-40%", label: "HairMixer inference latency" },
    { value: "sub-200ms", label: "PConnect page response" },
    { value: "-35%", label: "PConnect admin overhead" },
    { value: "-50%", label: "Gym paperwork at TJ Fitness" },
  ],
};
