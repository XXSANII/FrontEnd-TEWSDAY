import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { api } from "./api";
import type { TeachingLocation } from "./tutors";

dayjs.extend(relativeTime);

type Page<T> = { total: number; data: T[] };
export type JobStatus = "open" | "matched" | "closed" | "cancelled";
export type ApplicationStatus = "pending" | "accepted" | "rejected" | "withdrawn";

// pub_003_s row
export type Job = {
  studentJobId: string; subjectId: string; subjectName: string; targetGradeLevel: string | null; topics: string[];
  learningGoal: string | null; budgetMin: number | null; budgetMax: number | null; locationType: TeachingLocation;
  frequencyPerWeek: number | null; status: JobStatus; createdAt: string;
};

// pub_003_g
export type JobDetail = Job & { studentProfileId: string; studentDisplayName: string; preferredDays: unknown; expiredAt: string | null; shareCount: number };

// me_005_apps_s row
export type Application = {
  jobApplicationId: string; studentJobId: string; tutorProfileId: string; tutorDisplayName: string; tutorProfileImageId: string | null;
  proposedRate: number; proposedAvailability: unknown; coverMessage: string | null; status: ApplicationStatus; createdAt: string;
};

export const searchJobs = (q: { subjectId?: string; locationType?: "online" | "onsite"; pageSize?: number } = {}) =>
  api<Page<Job>>("/public/jobs/search", { method: "POST", body: { pageSize: 100, ...q } });

export const getJob = (id: string) => api<JobDetail>(`/public/jobs/${id}/get`);

// me_005_c
export const createJob = (body: {
  subjectId: string; targetGradeLevel?: string; topics?: string[]; learningGoal?: string; budgetMin?: number; budgetMax?: number;
  locationType: "online" | "onsite"; frequencyPerWeek?: number | null; preferredDays?: unknown;
}) => api<{ studentJobId: string }>("/me/jobs/create", { method: "POST", body });

// me_005_apps_s
export const searchApplications = (jobId: string) =>
  api<Page<Application>>(`/me/jobs/${jobId}/applications/search`, { method: "POST", body: { pageSize: 100 } });

// me_005_apply_c
export const applyToJob = (jobId: string, body: { proposedRate: number; proposedAvailability?: string; coverMessage?: string }) =>
  api<{ jobApplicationId: string }>(`/me/jobs/${jobId}/apply`, { method: "POST", body });

// me_005_app_status_e — accepting also creates the booking.
export const setApplicationStatus = (applicationId: string, status: "accepted" | "rejected") =>
  api<{ jobApplicationId: string; status: ApplicationStatus; bookingId: string | null }>(`/me/applications/${applicationId}/status/edit`, { method: "PUT", body: { status } });

const n = (v: number) => v.toLocaleString("en-US");
export const budgetLabel = (j: Pick<Job, "budgetMin" | "budgetMax">) =>
  j.budgetMin != null && j.budgetMax != null ? `฿${n(j.budgetMin)}–${n(j.budgetMax)} / hr`
  : j.budgetMax != null ? `Up to ฿${n(j.budgetMax)} / hr` : j.budgetMin != null ? `From ฿${n(j.budgetMin)} / hr` : "Budget not set";
export const modeLabel = (l: TeachingLocation) => (l === "online" ? "Online" : l === "onsite" ? "Onsite" : "Online or onsite");
export const freqLabel = (f: number | null) => (f ? `${f}× per week` : "Flexible");
export const jobTitle = (j: Pick<Job, "subjectName" | "targetGradeLevel">) => (j.targetGradeLevel ? `${j.subjectName} — ${j.targetGradeLevel}` : j.subjectName);
export const timeAgo = (iso: string) => dayjs(iso).fromNow();
