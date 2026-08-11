import Link from "next/link";
import { getPublishedProjects } from "@/lib/queries";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Projects"
            title="Portfolio and case studies."
            description="Browse a selection of recent engagements across real estate, finance and technology."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} title={project.title} industry={project.industry} location={project.location} href={`/projects/${project.slug}`} />
            ))}
          </div>
          <div className="mt-10 text-right">
            <Link href="/request-consultation" className="inline-flex items-center gap-2 text-sm font-semibold text-midnight hover:text-gold">
              Discuss your project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
