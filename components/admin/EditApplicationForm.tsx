"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { JobApplication } from "@/types/application";

type Props = {
  application: JobApplication;
};

const statuses = [
  "Applied",
  "In Review",
  "Interview",
  "Offer",
  "Rejected",
];

export default function EditApplicationForm({
  application,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const data = {
      company: formData.get("company"),
      position: formData.get("position"),
      location: formData.get("location"),
      applied_at: formData.get("applied_at"),
      status: formData.get("status"),
      url: formData.get("url"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch(
        `/api/applications/${application.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update application");
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const inputStyles = `
    mt-1.5 w-full rounded-lg border border-slate-300
    bg-white px-3.5 py-2.5 text-sm text-slate-900
    outline-none transition
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="company"
            className="text-sm font-medium text-slate-700"
          >
            Company
          </label>

          <input
            id="company"
            name="company"
            type="text"
            defaultValue={application.company}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label
            htmlFor="position"
            className="text-sm font-medium text-slate-700"
          >
            Position
          </label>

          <input
            id="position"
            name="position"
            type="text"
            defaultValue={application.position}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="text-sm font-medium text-slate-700"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            defaultValue={application.location ?? ""}
            className={inputStyles}
          />
        </div>

        <div>
          <label
            htmlFor="applied_at"
            className="text-sm font-medium text-slate-700"
          >
            Application Date
          </label>

          <input
            id="applied_at"
            name="applied_at"
            type="date"
            defaultValue={application.applied_at}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            defaultValue={application.status}
            className={inputStyles}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="url"
            className="text-sm font-medium text-slate-700"
          >
            Vacancy URL
          </label>

          <input
            id="url"
            name="url"
            type="url"
            defaultValue={application.url ?? ""}
            placeholder="https://..."
            className={inputStyles}
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="notes"
          className="text-sm font-medium text-slate-700"
        >
          Response / Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={application.notes ?? ""}
          className={inputStyles}
        />
      </div>

      {message && (
        <p
          role="alert"
          className="mt-5 text-sm text-red-600"
        >
          {message}
        </p>
      )}

      <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          disabled={loading}
          className="
            rounded-lg border border-slate-300 bg-white
            px-4 py-2.5 text-sm font-medium text-slate-700
            transition hover:bg-slate-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-lg bg-slate-900 px-5 py-2.5
            text-sm font-medium text-white
            transition hover:bg-slate-700
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}