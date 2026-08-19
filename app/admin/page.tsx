import { redirect } from "next/navigation";

import AddApplicationForm from "@/components/admin/AddApplicationForm";
import AdminApplicationsTable from "@/components/admin/AdminApplicationsTable";
import LogoutButton from "@/components/auth/LogoutButton";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

import type { JobApplication } from "@/types/application";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabaseAdmin
    .from("applications")
    .select("*")
    .order("applied_at", { ascending: false });

  if (error) {
    console.error("Failed to load applications:", error);
  }

  const applications = (data ?? []) as JobApplication[];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-14">
        <header className="mb-10 flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Application Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Manage your job applications from one place.
            </p>
          </div>

          <LogoutButton />
        </header>

        <section>
          <AddApplicationForm />
        </section>

        <section className="mt-8">
          <AdminApplicationsTable applications={applications} />
        </section>
      </div>
    </main>
  );
}