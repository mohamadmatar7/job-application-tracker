export const translations = {
  en: {
    eyebrow: "Application Management",
    title: "Job Application Tracker",
    description:
      "A clear overview of my job applications and their current status.",

    total: "Total Applications",
    waiting: "Waiting for Response",
    interviews: "Interviews",
    offers: "Offers",

    applications: "Applications",
    applicationsDescription:
      "Browse my submitted job applications and their current status.",

    search: "Search applications...",
    allStatuses: "All statuses",

    position: "Position",
    company: "Company",
    location: "Location",
    applied: "Applied",
    status: "Status",
    vacancy: "Vacancy",

    viewVacancy: "View vacancy",
    noApplications: "No applications found",
    noApplicationsDescription:
      "Try changing your search or status filter.",

    showing: "Showing",
    of: "of",
    applicationWord: "applications",

    statuses: {
      Applied: "Applied",
      "In Review": "In Review",
      Interview: "Interview",
      Offer: "Offer",
      Rejected: "Rejected",
    },

    response: "Response",
    noResponse: "No response yet",
  },

  nl: {
    eyebrow: "Sollicitatieoverzicht",
    title: "Mijn sollicitaties",
    description:
      "Een duidelijk overzicht van mijn sollicitaties en hun huidige status.",

    total: "Totaal sollicitaties",
    waiting: "Wacht op antwoord",
    interviews: "Gesprekken",
    offers: "Aanbiedingen",

    applications: "Sollicitaties",
    applicationsDescription:
      "Een overzicht van mijn verstuurde sollicitaties en hun huidige status.",

    search: "Zoek sollicitaties...",
    allStatuses: "Alle statussen",

    position: "Functie",
    company: "Bedrijf",
    location: "Locatie",
    applied: "Gesolliciteerd",
    status: "Status",
    vacancy: "Vacature",

    viewVacancy: "Bekijk vacature",
    noApplications: "Geen sollicitaties gevonden",
    noApplicationsDescription:
      "Pas de zoekopdracht of statusfilter aan.",

    showing: "Toont",
    of: "van",
    applicationWord: "sollicitaties",

    statuses: {
      Applied: "Gesolliciteerd",
      "In Review": "In behandeling",
      Interview: "Gesprek",
      Offer: "Aanbod",
      Rejected: "Afgewezen",
    },

    response: "Reactie",
    noResponse: "Nog geen reactie",
  },
};

export type Language = keyof typeof translations;