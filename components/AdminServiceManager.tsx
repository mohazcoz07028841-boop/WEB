"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type Service = {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  details: string;
};

export function AdminServiceManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices);
  const [formData, setFormData] = useState({ title: "", slug: "", category: "", summary: "", details: "" });
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    const response = await fetch("/api/admin/services?action=create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const service = await response.json();
      setServices((current) => [service, ...current]);
      setFormData({ title: "", slug: "", category: "", summary: "", details: "" });
      setStatus("success");
      setMessage("Service created successfully.");
    } else {
      setStatus("error");
      setMessage("Unable to save service. Check the fields and try again.");
    }
  }

  async function removeService(id: number) {
    const response = await fetch(`/api/admin/services?action=delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setServices((current) => current.filter((service) => service.id !== id));
    }
  }

  return (
    <div className="space-y-10">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Create service</p>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { label: "Title", name: "title" },
              { label: "Slug", name: "slug" },
              { label: "Category", name: "category" },
              { label: "Summary", name: "summary" },
            ].map((field) => (
              <label className="block text-sm font-medium text-slate-700" key={field.name}>
                {field.label}
                <input
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
                />
              </label>
            ))}
          </div>
          <label className="block text-sm font-medium text-slate-700">
            Details
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              rows={4}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
            />
          </label>
          {status !== "idle" && (
            <div className={`rounded-3xl border px-4 py-3 text-sm ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
              {message}
            </div>
          )}
          <button type="submit" className="inline-flex rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal">
            Create service
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xl font-semibold text-charcoal">{service.title}</p>
                <p className="mt-2 text-sm text-slate-600">{service.category} — {service.slug}</p>
              </div>
              <button
                type="button"
                onClick={() => removeService(service.id)}
                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                Delete
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{service.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
