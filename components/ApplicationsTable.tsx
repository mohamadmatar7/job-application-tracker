"use client";

import { useMemo, useState } from "react";

import { translations, type Language } from "@/data/translations";
import type {
  ApplicationStatus,
  JobApplication,
} from "@/types/application";

import StatusBadge from "./StatusBadge";

type Props = {
  applications: JobApplication[];
  language: Language;
};

const statuses: Array<ApplicationStatus | "All"> = [
  "All",
  "Applied",
  "In Review",
  "Interview",
  "Offer",
  "Rejected",
];

export default function ApplicationsTable({
  applications,
  language,
}: Props) {
  const t = translations[language];
  const dateLocale = language === "nl" ? "nl-BE" : "en-GB";

  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<ApplicationStatus | "All">("All");

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        application.position.toLowerCase().includes(query) ||
        application.company.toLowerCase().includes(query) ||
        application.location?.toLowerCase().includes(query) ||
        false;

      const matchesStatus =
        status === "All" || application.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, status]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              {t.applications}
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              {t.applicationsDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div>
              <label htmlFor="search" className="sr-only">
                {t.search}
              </label>

              <input
                id="search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.search}
                className="
                  w-full rounded-lg border border-slate-300
                  bg-white px-3.5 py-2.5
                  text-sm text-slate-900
                  outline-none transition
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-500/10
                  sm:w-64
                "
              />
            </div>

            <div>
              <label htmlFor="status" className="sr-only">
                {t.status}
              </label>

              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as ApplicationStatus | "All",
                  )
                }
                className="
                  w-full rounded-lg border border-slate-300
                  bg-white px-3.5 py-2.5
                  text-sm text-slate-700
                  outline-none transition
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-500/10
                  sm:w-44
                "
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item === "All"
                      ? t.allStatuses
                      : t.statuses[item]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="divide-y divide-slate-100 md:hidden">
        {filteredApplications.map((application) => (
          <article
            key={application.id}
            className="px-5 py-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-950">
                  {application.position}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {application.company}
                </p>
              </div>

              <StatusBadge
                status={application.status}
                label={t.statuses[application.status]}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {t.location}
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {application.location ?? "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {t.applied}
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {new Intl.DateTimeFormat(dateLocale, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(application.applied_at))}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {t.response}
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {application.notes || t.noResponse}
              </p>
            </div>

            {application.url && (
              <div className="mt-5 border-t border-slate-100 pt-4">
                <a
                  href={application.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  {t.viewVacancy} ↗
                </a>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80">
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="px-6 py-3.5 font-semibold">
                {t.position}
              </th>
              <th className="px-6 py-3.5 font-semibold">
                {t.company}
              </th>
              <th className="px-6 py-3.5 font-semibold">
                {t.location}
              </th>
              <th className="px-6 py-3.5 font-semibold">
                {t.applied}
              </th>
              <th className="px-6 py-3.5 font-semibold">
                {t.status}
              </th>
              <th className="px-6 py-3.5 font-semibold">
                {t.response}
              </th>
              <th className="px-6 py-3.5 text-right font-semibold">
                {t.vacancy}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredApplications.map((application) => (
              <tr
                key={application.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-950">
                  {application.position}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {application.company}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {application.location ?? "—"}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {new Intl.DateTimeFormat(dateLocale, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(application.applied_at))}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <StatusBadge
                    status={application.status}
                    label={t.statuses[application.status]}
                  />
                </td>

                <td className="max-w-xs px-6 py-4 text-slate-600">
                  {application.notes ? (
                    <p className="line-clamp-2 leading-6">
                      {application.notes}
                    </p>
                  ) : (
                    <span className="text-slate-400">
                      {t.noResponse}
                    </span>
                  )}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-right">
                  {application.url ? (
                    <a
                      href={application.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 transition hover:text-blue-800"
                    >
                      {t.viewVacancy} ↗
                    </a>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {filteredApplications.length === 0 && (
        <div className="px-6 py-14 text-center">
          <p className="font-medium text-slate-700">
            {t.noApplications}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {t.noApplicationsDescription}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50/50 px-5 py-3.5 sm:px-6">
        <p className="text-xs text-slate-500">
          {t.showing} {filteredApplications.length} {t.of}{" "}
          {applications.length} {t.applicationWord}
        </p>
      </div>
    </div>
  );
}