import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedProjects } from "@/lib/queries";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SUDMO Projects | Real Estate, Technology & Business Case Studies Kenya",
  description:
    "Browse SUDMO Company Limited project work and case studies across real estate, business strategy, technology and operational support in Kenya.",
  alternates: {
    canonical: "https://web-mfik-eight.vercel.app/projects",
  },
  openGraph: {
    title: "SUDMO Projects | Real Estate, Technology & Business Case Studies Kenya",
    description:
      "Browse SUDMO Company Limited project work and case studies across real estate, business strategy, technology and operational support in Kenya.",
    url: "https://web-mfik-eight.vercel.app/projects",
    type: "website",
  },
};

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
