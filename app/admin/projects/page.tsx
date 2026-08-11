import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminProjectManager } from "@/components/AdminProjectManager";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export default async function AdminProjectsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  const projects = await db.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen bg-warm py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Projects</p>
            <h1 className="mt-4 text-3xl font-semibold text-charcoal">Manage project content</h1>
          </div>
          <AdminLogoutButton />
        </div>
        <AdminProjectManager
          initialProjects={projects.map((project) => ({
            id: project.id,
            title: project.title,
            slug: project.slug,
            industry: project.industry,
            location: project.location,
            clientType: project.clientType,
            challenge: project.challenge,
            solution: project.solution,
            outcome: project.outcome,
            services: project.services,
            date: project.date,
          }))}
        />
      </div>
    </main>
  );
}
