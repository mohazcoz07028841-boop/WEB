"use client";

import { useState, type FormEvent } from "react";

const services = [
  "Real Estate",
  "IT Development",
  "Financial Management",
  "Financial Advisory",
  "Bookkeeping",
  "Marketing",
  "Business Development",
  "Warehousing",
];

export function InquiryForm({ heading, intro, submitLabel }: { heading: string; intro: string; submitLabel: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: data.get("fullName"),
      company: data.get("company"),
      email: data.get("email"),
      phone: data.get("phone"),
      serviceRequired: data.get("serviceRequired"),
      projectDescription: data.get("projectDescription"),
      contactMethod: data.get("contactMethod"),
      preferredDate: data.get("preferredDate"),
      additionalInfo: data.get("additionalInfo"),
    };

    if (!payload.fullName || !payload.email || !payload.phone) {
      setStatus("error");
      setMessage("Please fill in your name, email and phone number.");
      return;
    }

    setStatus("submitting");
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setStatus("success");
      setMessage("Thank you. Your request has been received. Our team will review your inquiry and get back to you.");
      form.reset();
    } else {
      setStatus("error");
      setMessage("There was a problem submitting your request. Please try again.");
    }
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{heading}</p>
        <p className="mt-4 text-3xl font-semibold text-charcoal">{intro}</p>
      </div>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Full Name
            <input name="fullName" type="text" required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Company
            <input name="company" type="text" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10" />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Email
            <input name="email" type="email" required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Phone
            <input name="phone" type="tel" required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10" />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Service Required
            <select name="serviceRequired" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10">
              <option value="">Select a service</option>
              {services.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Preferred Contact Method
            <select name="contactMethod" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10">
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Preferred Consultation Date
            <input name="preferredDate" type="date" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Project Description
            <input name="projectDescription" type="text" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10" />
          </label>
        </div>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Additional Information
          <textarea name="additionalInfo" rows={4} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10" />
        </label>
        {status !== "idle" && (
          <div className={`rounded-3xl border px-4 py-3 text-sm ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : submitLabel}
        </button>
      </form>
    </div>
  );
}
