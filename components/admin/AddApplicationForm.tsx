"use client";

import { useState } from "react";

const statuses = [
  "Applied",
  "In Review",
  "Interview",
  "Offer",
  "Rejected",
];

export default function AddApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add application");
      }

      form.reset();
      setMessage("Application added successfully.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyles =
    "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

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
            defaultValue="Applied"
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
          className={inputStyles}
          placeholder="Optional response or note about this application..."
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
        <p
          className={`text-sm ${
            message.includes("successfully")
              ? "text-emerald-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>

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
          {loading ? "Adding..." : "Add Application"}
        </button>
      </div>
    </form>
  );
}