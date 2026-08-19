import type { ApplicationStatus } from "@/types/application";

type Props = {
  status: ApplicationStatus;
  label?: string;
};

const styles: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-50 text-blue-700 ring-blue-600/20",
  "In Review": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Interview: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Rejected: "bg-red-50 text-red-700 ring-red-600/20",
  Offer: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

const dots: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-500",
  "In Review": "bg-amber-500",
  Interview: "bg-violet-500",
  Rejected: "bg-red-500",
  Offer: "bg-emerald-500",
};

export default function StatusBadge({ status, label }: Props) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full px-2.5 py-1
        text-xs font-medium
        ring-1 ring-inset
        ${styles[status]}
      `}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${dots[status]}`}
      />

      {label ?? status}
    </span>
  );
}