"use client";

import { useState } from "react";

type Inquiry = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  company?: string | null;
  serviceRequired?: string | null;
  projectDescription?: string | null;
  contactMethod?: string | null;
  preferredDate?: string | null;
  additionalInfo?: string | null;
  status: string;
  createdAt: string;
};

export function AdminInquiryList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [savingId, setSavingId] = useState<number | null>(null);

  async function updateStatus(id: number, status: string) {
    setSavingId(id);
    const response = await fetch(`/api/admin/inquiries?action=updateStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setSavingId(null);
    if (response.ok) {
      setInquiries((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
    }
  }

  return (
    <div className="space-y-6">
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-semibold text-charcoal">{inquiry.fullName}</p>
              <p className="mt-2 text-sm text-slate-600">{inquiry.company || "Private enquiry"}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">{inquiry.status}</span>
              <span className="text-slate-500">Submitted {new Date(inquiry.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Email</p>
              <p className="text-sm text-slate-600">{inquiry.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Phone</p>
              <p className="text-sm text-slate-600">{inquiry.phone}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Service required</p>
              <p className="text-sm text-slate-600">{inquiry.serviceRequired || "Not specified"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Preferred contact</p>
              <p className="text-sm text-slate-600">{inquiry.contactMethod || "Any"}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            {inquiry.projectDescription && (
              <div>
                <p className="font-semibold text-slate-700">Project description</p>
                <p>{inquiry.projectDescription}</p>
              </div>
            )}
            {inquiry.additionalInfo && (
              <div>
                <p className="font-semibold text-slate-700">Additional information</p>
                <p>{inquiry.additionalInfo}</p>
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {['NEW','CONTACTED','IN PROGRESS','COMPLETED'].map((statusOption) => (
              <button
                key={statusOption}
                type="button"
                disabled={savingId === inquiry.id}
                onClick={() => updateStatus(inquiry.id, statusOption)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
              >
                {statusOption}
              </button>
            ))}
          </div>
        </div>
      ))}
      {inquiries.length === 0 && <p className="rounded-[32px] border border-slate-200 bg-white p-8 text-slate-600">No inquiries yet.</p>}
    </div>
  );
}
