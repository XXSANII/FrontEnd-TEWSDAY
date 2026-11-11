import { api } from "./api";

export type TeachingLocation = "online" | "onsite" | "both";

type Page<T> = { total: number; data: T[] };

// pub_002_s row
export type Tutor = {
  tutorProfileId: string; userId: string; displayName: string; profileImageId: string | null;
  bio: string | null; hourlyRate: number | null; teachingLocationType: TeachingLocation;
  verificationStatus: "unverified" | "pending" | "verified" | "rejected";
  popularityScore: number; averageRating: number; reviewCount: number; distanceKm: number | null;
};

// pub_002_g
export type TutorDetail = Omit<Tutor, "distanceKm"> & {
  serviceRadiusKm: number | null; introVideoFileId: string | null;
  subjects: { tutorSubjectId: string; subjectId: string; subjectName: string; category: string; proficiencyLevel: string | null; gradeLevels: string[]; specializedTopics: string[]; customHourlyRate: number | null }[];
  educations: { tutorEducationId: string; institution: string; degree: string | null; fieldOfStudy: string | null; graduationYear: number | null; isVerifiedFlag: boolean }[];
};

// pub_002_rev_s row
export type TutorReview = { reviewId: string; reviewerDisplayName: string; ratingScore: number; comment: string | null; createdAt: string };

// pub_001_s row
export type Subject = { subjectId: string; name: string; category: string; description: string | null };

export type TutorQuery = {
  keyword?: string; subjectId?: string; teachingLocationType?: "online" | "onsite";
  maxHourlyRate?: number; verifiedOnlyFlag?: boolean; sortKey?: "popularityScore" | "hourlyRate"; sortAsc?: boolean; pageSize?: number;
};

export const searchTutors = (q: TutorQuery = {}) =>
  api<Page<Tutor>>("/public/tutors/search", { method: "POST", body: { pageSize: 100, ...q } });

export const getTutor = (id: string) => api<TutorDetail>(`/public/tutors/${id}/get`);

export const searchTutorReviews = (id: string, pageSize = 10) =>
  api<Page<TutorReview>>(`/public/tutors/${id}/reviews/search`, { method: "POST", body: { pageSize } });

export const searchSubjects = () =>
  api<Page<Subject>>("/public/subjects/search", { method: "POST", body: { pageSize: 100 } });
