import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/queries";
import { AdminSettingsForm } from "@/components/AdminSettingsForm";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export default async function AdminSettingsPage() {
  const admin = getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  const settings = await getSettings();

  return (
    <main className="min-h-screen bg-warm py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Company settings</p>
            <h1 className="mt-4 text-3xl font-semibold text-charcoal">Edit company information</h1>
          </div>
          <AdminLogoutButton />
        </div>
        <AdminSettingsForm settings={{
          companyName: settings?.companyName ?? "",
          phone: settings?.phone ?? "",
          email: settings?.email ?? "",
          address: settings?.address ?? "",
          businessHours: settings?.businessHours ?? "",
          linkedinUrl: settings?.linkedinUrl ?? "",
          facebookUrl: settings?.facebookUrl ?? "",
          instagramUrl: settings?.instagramUrl ?? "",
          twitterUrl: settings?.twitterUrl ?? "",
        }} />
      </div>
    </main>
  );
}
