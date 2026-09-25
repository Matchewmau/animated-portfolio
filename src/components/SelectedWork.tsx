import { projects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

export default function SelectedWork() {
  const featured = projects.filter((project) => project.featured).slice(0, 2);

  return (
    <section id="work" className="w-full">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Production apps, not demos"
            description="Featured production work with real users and measurable outcomes."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
