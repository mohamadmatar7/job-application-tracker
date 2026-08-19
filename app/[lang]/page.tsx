import { notFound } from "next/navigation";

import type { Metadata } from "next";

import ApplicationsTable from "@/components/ApplicationsTable";
import DashboardHeader from "@/components/DashboardHeader";
import StatsGrid from "@/components/StatsGrid";

import { translations, type Language } from "@/data/translations";
import { supabase } from "@/lib/supabase";

import type { JobApplication } from "@/types/application";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { lang } = await params;

  if (lang !== "en" && lang !== "nl") {
    return {};
  }

  const isDutch = lang === "nl";

  return {
    title: isDutch
      ? "Mijn sollicitaties | Job Application Tracker"
      : "My Applications | Job Application Tracker",

    description: isDutch
      ? "Een overzicht van mijn sollicitaties, hun status en ontvangen reacties."
      : "An overview of my job applications, their status and received responses.",

    robots: {
      index: false,
      follow: false,
    },

    alternates: {
      languages: {
        nl: "/nl",
        en: "/en",
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;

  if (lang !== "en" && lang !== "nl") {
    notFound();
  }

  const language = lang as Language;
  const t = translations[language];

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("applied_at", { ascending: false });

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-6">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            {language === "nl"
              ? "Sollicitaties konden niet geladen worden"
              : "Unable to load applications"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {language === "nl"
              ? "Probeer de pagina later opnieuw."
              : "Please try again later."}
          </p>
        </div>
      </main>
    );
  }

  const applications = (data ?? []) as JobApplication[];

  const stats = {
    total: applications.length,

    waiting: applications.filter(
      ({ status }) => status === "Applied" || status === "In Review",
    ).length,

    interviews: applications.filter(
      ({ status }) => status === "Interview",
    ).length,

    offers: applications.filter(
      ({ status }) => status === "Offer",
    ).length,
  };

  const lastUpdated =
  applications.length > 0
    ? applications.reduce((latest, application) => {
        return new Date(application.updated_at) > new Date(latest)
          ? application.updated_at
          : latest;
      }, applications[0].updated_at)
    : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        <DashboardHeader
          language={language}
          title={t.title}
          description={t.description}
          eyebrow={t.eyebrow}
          lastUpdated={lastUpdated}
        />

        <StatsGrid
          items={[
            { label: t.total, value: stats.total },
            { label: t.waiting, value: stats.waiting },
            { label: t.interviews, value: stats.interviews },
            { label: t.offers, value: stats.offers },
          ]}
        />

        <section className="mt-8">
          <ApplicationsTable
            applications={applications}
            language={language}
          />
        </section>
      </div>
    </main>
  );
}