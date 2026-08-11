import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminInquiryList } from "@/components/AdminInquiryList";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export default async function AdminInquiriesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  const inquiries = await db.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen bg-warm py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Inquiries</p>
            <h1 className="mt-4 text-3xl font-semibold text-charcoal">View and manage incoming leads</h1>
          </div>
          <AdminLogoutButton />
        </div>
        <AdminInquiryList
          initialInquiries={inquiries.map((item) => ({
            id: item.id,
            fullName: item.fullName,
            email: item.email,
            phone: item.phone,
            company: item.company,
            serviceRequired: item.serviceRequired,
            projectDescription: item.projectDescription,
            contactMethod: item.contactMethod,
            preferredDate: item.preferredDate,
            additionalInfo: item.additionalInfo,
            status: item.status,
            createdAt: item.createdAt.toISOString(),
          }))}
        />
      </div>
    </main>
  );
}
