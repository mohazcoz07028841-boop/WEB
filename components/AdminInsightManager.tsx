"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type Insight = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
};

export function AdminInsightManager({ initialInsights }: { initialInsights: Insight[] }) {
  const [insights, setInsights] = useState(initialInsights);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    author: "",
    readTime: "",
  });
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

    const response = await fetch("/api/admin/insights?action=create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const insight = await response.json();
      setInsights((current) => [insight, ...current]);
      setFormData({ title: "", slug: "", category: "", excerpt: "", content: "", author: "", readTime: "" });
      setStatus("success");
      setMessage("Insight created successfully.");
    } else {
      setStatus("error");
      setMessage("Unable to save insight. Please try again.");
    }
  }

  async function removeInsight(id: number) {
    const response = await fetch(`/api/admin/insights?action=delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setInsights((current) => current.filter((insight) => insight.id !== id));
    }
  }

  return (
    <div className="space-y-10">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Create insight</p>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { label: "Title", name: "title" },
              { label: "Slug", name: "slug" },
              { label: "Category", name: "category" },
              { label: "Author", name: "author" },
              { label: "Read time", name: "readTime" },
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
            Excerpt
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Content
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={5}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
            />
          </label>
          {status !== "idle" && (
            <div className={`rounded-3xl border px-4 py-3 text-sm ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
              {message}
            </div>
          )}
          <button type="submit" className="inline-flex rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal">
            Create insight
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xl font-semibold text-charcoal">{insight.title}</p>
                <p className="mt-2 text-sm text-slate-600">{insight.category} — {insight.slug}</p>
              </div>
              <button
                type="button"
                onClick={() => removeInsight(insight.id)}
                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                Delete
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{insight.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
