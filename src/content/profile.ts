import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "John Mauricio",
  title: "Full-Stack Web & AI Developer",
  location: "Zamboanga City, Philippines",
  email: "johnmathewmau@gmail.com",
  phone: "+63 956 628 4039",
  github: "https://github.com/matchewmau",
  linkedin: "https://www.linkedin.com/in/john-mauricio",
  resumeUrl: "/Mauricio_Resume.pdf",
  headline: "I build fast web apps and practical AI systems.",
  subhead:
    "Computer Science graduate and full-stack developer working across React, Next.js, Node.js, Laravel, and Python, with experience in system architecture and AI. I lead teams that ship responsive, user-focused apps and deep-learning systems — including HairMixer, accepted for presentation and publication at ECAI 2026 — and I am open to remote or on-site roles.",
  proof: [
    { value: "-40%", label: "HairMixer inference latency" },
    { value: "sub-200ms", label: "PConnect API response" },
    { value: "-35%", label: "PConnect manual order processing" },
    { value: "ECAI 2026", label: "Published presenter" },
  ],
};
