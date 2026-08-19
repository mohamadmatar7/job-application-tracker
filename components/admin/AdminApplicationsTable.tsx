"use client";

import { useRouter } from "next/navigation";

import type { JobApplication } from "@/types/application";
import StatusBadge from "@/components/StatusBadge";

type Props = {
  applications: JobApplication[];
};

export default function AdminApplicationsTable({
  applications,
}: Props) {
  const router = useRouter();

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/applications/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      window.alert("Failed to delete application.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Manage Applications
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Edit or remove existing job applications.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Position</th>
              <th className="px-6 py-3 font-medium">Company</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {applications.map((application) => (
              <tr
                key={application.id}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                  {application.position}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {application.company}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <StatusBadge status={application.status} />
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(application.applied_at))}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <a
                      href={`/admin/applications/${application.id}/edit`}
                      className="font-medium text-blue-600 transition hover:text-blue-800"
                    >
                      Edit
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDelete(application.id)}
                      className="font-medium text-red-600 transition hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <div className="px-6 py-12 text-center text-sm text-slate-500">
          No applications yet.
        </div>
      )}
    </div>
  );
}