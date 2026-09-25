import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/content/projects";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug as Parameters<typeof getProject>[0]);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug as Parameters<typeof getProject>[0]);
  if (!project) notFound();
  return <CaseStudyLayout project={project} />;
}
