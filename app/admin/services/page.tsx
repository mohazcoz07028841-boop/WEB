import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminServiceManager } from "@/components/AdminServiceManager";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export default async function AdminServicesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  const services = await db.service.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen bg-warm py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Services</p>
            <h1 className="mt-4 text-3xl font-semibold text-charcoal">Manage service content</h1>
          </div>
          <AdminLogoutButton />
        </div>
        <AdminServiceManager initialServices={services.map((service) => ({
          id: service.id,
          title: service.title,
          slug: service.slug,
          category: service.category,
          summary: service.summary,
          details: service.details,
        }))} />
      </div>
    </main>
  );
}
