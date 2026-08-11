import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminInsightManager } from "@/components/AdminInsightManager";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export default async function AdminInsightsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  const insights = await db.insight.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen bg-warm py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Insights</p>
            <h1 className="mt-4 text-3xl font-semibold text-charcoal">Manage insights and articles</h1>
          </div>
          <AdminLogoutButton />
        </div>
        <AdminInsightManager
          initialInsights={insights.map((insight) => ({
            id: insight.id,
            title: insight.title,
            slug: insight.slug,
            category: insight.category,
            excerpt: insight.excerpt,
            content: insight.content,
            author: insight.author,
            readTime: insight.readTime,
          }))}
        />
      </div>
    </main>
  );
}
