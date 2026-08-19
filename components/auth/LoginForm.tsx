"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const inputStyles = `
    mt-1.5 w-full rounded-lg border border-slate-300
    bg-white px-3.5 py-2.5 text-sm text-slate-900
    outline-none transition
    placeholder:text-slate-400
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputStyles}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputStyles}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="
          mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5
          text-sm font-medium text-white
          transition hover:bg-slate-700
          disabled:cursor-not-allowed disabled:opacity-50
        "
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}