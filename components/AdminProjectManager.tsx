"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type Project = {
  id: number;
  title: string;
  slug: string;
  industry: string;
  location: string;
  clientType: string;
  challenge: string;
  solution: string;
  outcome: string;
  services: string;
  date: string;
};

export function AdminProjectManager({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    industry: "",
    location: "",
    clientType: "",
    challenge: "",
    solution: "",
    outcome: "",
    services: "",
    date: "",
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

    const response = await fetch("/api/admin/projects?action=create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const project = await response.json();
      setProjects((current) => [project, ...current]);
      setFormData({
        title: "",
        slug: "",
        industry: "",
        location: "",
        clientType: "",
        challenge: "",
        solution: "",
        outcome: "",
        services: "",
        date: "",
      });
      setStatus("success");
      setMessage("Project created successfully.");
    } else {
      setStatus("error");
      setMessage("Unable to save project. Please try again.");
    }
  }

  async function removeProject(id: number) {
    const response = await fetch(`/api/admin/projects?action=delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setProjects((current) => current.filter((project) => project.id !== id));
    }
  }

  return (
    <div className="space-y-10">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Create project</p>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { label: "Title", name: "title" },
              { label: "Slug", name: "slug" },
              { label: "Industry", name: "industry" },
              { label: "Location", name: "location" },
              { label: "Client type", name: "clientType" },
              { label: "Date", name: "date" },
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
            Challenge
            <textarea
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              required
              rows={3}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Solution
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              required
              rows={3}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Outcome
            <textarea
              name="outcome"
              value={formData.outcome}
              onChange={handleChange}
              required
              rows={3}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Services
            <input
              name="services"
              value={formData.services}
              onChange={handleChange}
              required
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
            />
          </label>
          {status !== "idle" && (
            <div className={`rounded-3xl border px-4 py-3 text-sm ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
              {message}
            </div>
          )}
          <button type="submit" className="inline-flex rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal">
            Create project
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xl font-semibold text-charcoal">{project.title}</p>
                <p className="mt-2 text-sm text-slate-600">{project.industry} — {project.slug}</p>
              </div>
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                Delete
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{project.challenge}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
