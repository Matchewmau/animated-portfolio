import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Experience from "@/components/Experience";
import { experience } from "./experience";
import { projects } from "./projects";
import { skillGroups } from "./skills";

describe("resume content", () => {
  it("lists all three resume projects", () => {
    expect(experience).toHaveLength(3);
    const organizations = experience.map((item) => item.organization).join(" ");
    expect(organizations).toMatch(/HairMixer/);
    expect(organizations).toMatch(/PConnect/);
    expect(organizations).toMatch(/TJ Fitness/);
  });

  it("keeps PConnect B2B and removes the campus story", () => {
    const pconnectProject = projects.find((project) => project.slug === "pconnect");
    const pconnectExperience = experience.find((item) =>
      item.organization.includes("PConnect")
    );

    expect(pconnectProject).toBeDefined();
    expect(pconnectExperience).toBeDefined();

    const projectText = JSON.stringify(pconnectProject ?? {}).toLowerCase();
    const experienceText = JSON.stringify(pconnectExperience ?? {}).toLowerCase();

    expect(projectText).toContain("b2b");
    expect(projectText).toContain("multi-tenant");
    expect(projectText).not.toMatch(/campus|student|faculty|admin/);
    expect(experienceText).not.toMatch(/campus|student|faculty|admin/);
  });

  it("removes the -50% claim from projects", () => {
    expect(JSON.stringify(projects)).not.toContain("-50%");
  });

  it("adds the new resume skills", () => {
    const names = skillGroups
      .flatMap((group) => group.skills.map((skill) => skill.name))
      .join(" ");

    expect(names).toContain("TypeScript");
    expect(names).toContain("PostgreSQL");
    expect(names).toContain("Deep Learning");
  });

  it("shows the resume education and certifications", () => {
    render(<Experience />);

    expect(
      screen.getByText(/Western Mindanao State University/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Civil Service Eligibility/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Published Presenter/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Data Structures/)).toBeInTheDocument();
  });
});
