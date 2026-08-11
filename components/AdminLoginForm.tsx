"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      setStatus("error");
      setMessage("Invalid email or password.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft sm:p-14">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Admin login</p>
        <h1 className="mt-4 text-3xl font-semibold text-charcoal">Secure dashboard access</h1>
      </div>
      <label className="block text-sm font-medium text-slate-700">
        Email
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
          className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Password
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
          className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-midnight focus:ring-2 focus:ring-midnight/10"
        />
      </label>
      {status === "error" && <p className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{message}</p>}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
