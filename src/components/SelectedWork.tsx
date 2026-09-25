import { projects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";

export default function SelectedWork() {
  const featured = projects.filter((project) => project.featured).slice(0, 2);

  return (
    <section id="work" className="w-full">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Selected work"
          title="Production apps, not demos"
          description="Three shipped projects with real users, payments, and measurable outcomes."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
