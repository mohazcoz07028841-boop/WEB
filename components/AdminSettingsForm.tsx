"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export function AdminSettingsForm({ settings }: { settings: Record<string, string | null> }) {
  const [formData, setFormData] = useState({
    companyName: settings.companyName ?? "",
    tagline: settings.tagline ?? "",
    phone: settings.phone ?? "",
    email: settings.email ?? "",
    address: settings.address ?? "",
    businessHours: settings.businessHours ?? "",
    heroHeading: settings.heroHeading ?? "",
    heroSubheading: settings.heroSubheading ?? "",
    heroCta: settings.heroCta ?? "",
    heroSecondaryCta: settings.heroSecondaryCta ?? "",
    aboutIntro: settings.aboutIntro ?? "",
    linkedinUrl: settings.linkedinUrl ?? "",
    facebookUrl: settings.facebookUrl ?? "",
    instagramUrl: settings.instagramUrl ?? "",
    twitterUrl: settings.twitterUrl ?? "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    const response = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("success");
      setMessage("Company settings updated.");
    } else {
      setStatus("error");
      setMessage("Unable to save settings. Please try again.");
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  return (
    <form className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Company settings</p>
        <h2 className="mt-4 text-2xl font-semibold text-charcoal">Update company details</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          { label: "Company name", name: "companyName" },
          { label: "Tagline", name: "tagline" },
          { label: "Phone", name: "phone" },
          { label: "Email", name: "email" },
          { label: "Address", name: "address" },
          { label: "Business hours", name: "businessHours" },
          { label: "Hero heading", name: "heroHeading" },
          { label: "Hero subheading", name: "heroSubheading" },
          { label: "Hero CTA", name: "heroCta" },
          { label: "Hero secondary CTA", name: "heroSecondaryCta" },
          { label: "LinkedIn URL", name: "linkedinUrl" },
          { label: "Facebook URL", name: "facebookUrl" },
          { label: "Instagram URL", name: "instagramUrl" },
          { label: "X / Twitter URL", name: "twitterUrl" },
        ].map((field) => (
          <label className="block text-sm font-medium text-slate-700" key={field.name}>
            {field.label}
            <input
              name={field.name}
              value={(formData as any)[field.name] ?? ""}
              onChange={handleChange}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
            />
          </label>
        ))}
      </div>
      <label className="block text-sm font-medium text-slate-700">
        About intro
        <textarea
          name="aboutIntro"
          value={formData.aboutIntro}
          onChange={handleChange}
          rows={4}
          className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
        />
      </label>
      {status !== "idle" && (
        <div className={`rounded-3xl border px-4 py-3 text-sm ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
          {message}
        </div>
      )}
      <button type="submit" className="inline-flex rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60">
        {status === "saving" ? "Saving..." : "Save settings"}
      </button>
    </form>
  );
}
