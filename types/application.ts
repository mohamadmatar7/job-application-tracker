export type ApplicationStatus =
  | "Applied"
  | "In Review"
  | "Interview"
  | "Rejected"
  | "Offer";

export type JobApplication = {
  id: number;
  company: string;
  position: string;
  location: string | null;
  applied_at: string;
  status: ApplicationStatus;
  url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};