import { api } from "./api";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

// adm_001_s row
export type VerificationRow = {
  tutorProfileId: string; userId: string; displayName: string; email: string; verificationStatus: VerificationStatus;
  introVideoFileId: string | null; introVideoStatus: "processing" | "ready" | "approved" | "flagged" | "failed" | null; createdAt: string;
};

export const searchVerifications = (verificationStatus?: VerificationStatus) =>
  api<{ total: number; data: VerificationRow[] }>("/admin/tutors/verification/search", { method: "POST", body: { pageSize: 100, verificationStatus } });

// adm_001_verify
export const verifyTutor = (tutorId: string, verificationStatus: "verified" | "rejected") =>
  api<{ tutorProfileId: string; verificationStatus: VerificationStatus }>(`/admin/tutors/${tutorId}/verify`, { method: "PUT", body: { verificationStatus } });
