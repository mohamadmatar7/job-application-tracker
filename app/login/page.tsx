import { redirect } from "next/navigation";

import LoginForm from "@/components/auth/LoginForm";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-blue-600">
            Job Application Tracker
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Admin Login
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sign in to manage your job applications.
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm">
          <a
            href="/"
            className="font-medium text-slate-500 transition hover:text-slate-900"
          >
            ← Back to applications
          </a>
        </p>
      </div>
    </main>
  );
}