import { notFound, redirect } from "next/navigation";

import EditApplicationForm from "@/components/admin/EditApplicationForm";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";

import type { JobApplication } from "@/types/application";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditApplicationPage({
  params,
}: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const applicationId = Number(id);

  if (!Number.isInteger(applicationId)) {
    notFound();
  }

  const { data, error } = await supabaseAdmin
    .from("applications")
    .select("*")
    .eq("id", applicationId)
    .single();

  if (error || !data) {
    notFound();
  }

  const application = data as JobApplication;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-10 lg:py-14">
        <header className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Edit Application
          </h1>

          <p className="mt-2 text-slate-600">
            Update the details and status of this job application.
          </p>
        </header>

        <EditApplicationForm application={application} />
      </div>
    </main>
  );
}