import type { Language } from "@/data/translations";

type Props = {
  language: Language;
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string | null;
};

export default function DashboardHeader({
  language,
  eyebrow,
  title,
  description,
  lastUpdated,
}: Props) {
  const locale = language === "nl" ? "nl-BE" : "en-GB";

  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-blue-600">
            {eyebrow}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {description}
          </p>

          {lastUpdated && (
            <p className="mt-5 text-sm text-slate-400">
              {language === "nl" ? "Laatst bijgewerkt" : "Last updated"}{" "}
              <span className="font-medium text-slate-600">
                {new Intl.DateTimeFormat(locale, {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(lastUpdated))}
              </span>
            </p>
          )}
        </div>

        <div className="flex w-fit rounded-xl border border-slate-200 bg-slate-50 p-1">
          {(["nl", "en"] as const).map((item) => {
            const active = language === item;

            return (
              <a
                key={item}
                href={`/${item}`}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.toUpperCase()}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}