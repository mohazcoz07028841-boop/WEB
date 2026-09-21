"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export function AdminPasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setStatus("error");
      setMessage("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword.length < 8) {
      setStatus("error");
      setMessage("New password must be at least 8 characters long.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus("error");
      setMessage("New password and confirmation do not match.");
      return;
    }

    const response = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      setStatus("success");
      setMessage("Password updated successfully.");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setStatus("error");
      setMessage(result.error || "Unable to update password. Please try again.");
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  return (
    <form className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Security</p>
        <h2 className="mt-4 text-2xl font-semibold text-charcoal">Change admin password</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <label className="block text-sm font-medium text-slate-700">
          Current password
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          New password
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Confirm new password
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
          />
        </label>
      </div>

      {status !== "idle" && (
        <div className={`rounded-3xl border px-4 py-3 text-sm ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
          {message}
        </div>
      )}

      <button type="submit" className="inline-flex rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60" disabled={status === "saving"}>
        {status === "saving" ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
