import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminStats } from "@/lib/queries";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  const stats = await getAdminStats();

  return (
    <main className="min-h-screen bg-warm py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Welcome back</p>
            <h1 className="mt-4 text-3xl font-semibold text-charcoal">Administrator dashboard</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">Manage services, insights and inquiries from a secure admin experience.</p>
          </div>
          <AdminLogoutButton />
        </div>
        <div className="mb-10 grid gap-3 sm:grid-cols-4">
          {[
            { label: "Services", value: stats.services },
            { label: "Projects", value: stats.projects },
            { label: "Insights", value: stats.insights },
            { label: "Inquiries", value: stats.inquiries },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl bg-slate-50 p-5 text-center">
              <p className="text-2xl font-semibold text-charcoal">{item.value}</p>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Services", href: "/admin/services" },
            { title: "Projects", href: "/admin/projects" },
            { title: "Insights", href: "/admin/insights" },
            { title: "Inquiries", href: "/admin/inquiries" },
            { title: "Settings", href: "/admin/settings" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[28px] border border-slate-200 bg-white p-8 text-lg font-semibold text-charcoal transition hover:-translate-y-1 hover:shadow-soft">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
