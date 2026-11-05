// Mock data shaped after the TRD tables (TutorProfile, StudentJob, JobApplication, Booking, ClassSession, Invoice).
export type Tutor = {
  tutorProfileId: string; name: string; headline: string; subjects: string[]; rate: number;
  rating: number; reviews: number; badge: "VERIFIED PRO" | "TOP 1% TUTOR"; verified: boolean; online: boolean;
  teachingLocationType: "online" | "onsite" | "both"; area: string; bio: string;
};

export const tutors: Tutor[] = [
  { tutorProfileId: "t1", name: "Dr. Elena Rostova", headline: "Ph.D. Applied Mathematics • Imperial", subjects: ["Calculus", "SAT Math", "IB Physics"], rate: 1200, rating: 5.0, reviews: 142, badge: "VERIFIED PRO", verified: true, online: true, teachingLocationType: "both", area: "Bangkok, Sukhumvit", bio: "Former university lecturer with 9+ years mentoring high school and undergraduate students." },
  { tutorProfileId: "t2", name: "Marcus Vance, M.Sc.", headline: "M.Sc. Computer Science • Cambridge", subjects: ["Python", "AP Computer Science", "Data Structures"], rate: 850, rating: 4.9, reviews: 98, badge: "TOP 1% TUTOR", verified: true, online: true, teachingLocationType: "online", area: "Virtual Whiteboard", bio: "Senior engineer transitioning full-time into education. Specializing in making algorithmic thinking intuitive." },
  { tutorProfileId: "t3", name: "Sarah Lin, MA", headline: "MA Applied Linguistics • Columbia Univ", subjects: ["IELTS 8.5+", "Academic Writing", "IGCSE English"], rate: 950, rating: 5.0, reviews: 210, badge: "VERIFIED PRO", verified: true, online: false, teachingLocationType: "both", area: "Siam / Sathorn", bio: "Certified British Council examiner. Personalized mock interviews and structured essay feedback." },
  { tutorProfileId: "t4", name: "Tanawat Prasert", headline: "B.Eng. First Class Honours • Chulalongkorn", subjects: ["Physics 1 & 2", "A-Level Math", "PAT 3 Prep"], rate: 650, rating: 4.9, reviews: 76, badge: "VERIFIED PRO", verified: true, online: true, teachingLocationType: "both", area: "Samyan / Ari", bio: "Gold medalist in National Physics Olympiad. Focuses on conceptual clarity and exam technique." },
  { tutorProfileId: "t5", name: "Nattaporn S.", headline: "B.Sc. Biochemistry • Mahidol Univ", subjects: ["IGCSE Biology", "Chemistry", "BMAT Science"], rate: 500, rating: 4.8, reviews: 54, badge: "VERIFIED PRO", verified: true, online: true, teachingLocationType: "both", area: "Bang Na / Rama 9", bio: "Specialized in medical school admissions prep and bilingual science curriculum." },
  { tutorProfileId: "t6", name: "David Chen, Ph.D.", headline: "Ph.D. Economics • London School of Economics", subjects: ["Macroeconomics", "Statistics", "IB Economics HL"], rate: 1400, rating: 5.0, reviews: 188, badge: "TOP 1% TUTOR", verified: true, online: true, teachingLocationType: "both", area: "Bangkok Central", bio: "12 years preparing students for elite UK and US admissions. Comprehensive exam techniques." },
];

export const jobs = [
  { studentJobId: "J-2201", title: "IB Math AA HL — Calculus & Vectors", student: "Ploy C.", grade: "Grade 12", budget: "฿900–1,300 / hr", mode: "Online", freq: "2× per week", posted: "2h ago", bids: 4, match: 96, topics: ["Calculus", "Vectors", "IA Support"] },
  { studentJobId: "J-2202", title: "IGCSE Chemistry exam prep (May series)", student: "Kanya P.", grade: "Grade 10", budget: "฿600–850 / hr", mode: "Onsite · Ari", freq: "1× per week", posted: "5h ago", bids: 2, match: 84, topics: ["Organic", "Stoichiometry"] },
  { studentJobId: "J-2203", title: "SAT English & essay coaching", student: "Mind W.", grade: "Grade 11", budget: "฿800–1,100 / hr", mode: "Online", freq: "2× per week", posted: "1d ago", bids: 7, match: 78, topics: ["Writing", "Reading"] },
  { studentJobId: "J-2204", title: "Python for AP Computer Science A", student: "Nine T.", grade: "Grade 11", budget: "฿700–950 / hr", mode: "Online", freq: "1× per week", posted: "1d ago", bids: 3, match: 71, topics: ["Java", "OOP"] },
];

export const bids = [
  { id: "B-1", tutor: tutors[0], rate: 1200, msg: "I have taught IB AA HL for 6 years. Happy to start with a free diagnostic of your IA topic.", slots: "Mon/Wed 16:00", match: 96 },
  { id: "B-2", tutor: tutors[3], rate: 650, msg: "Strong on vectors and kinematics. Can adapt to your school's pacing guide.", slots: "Tue/Thu 18:00", match: 88 },
  { id: "B-3", tutor: tutors[5], rate: 1100, msg: "Statistics background; can also support your Economics HL coursework alongside.", slots: "Sat 10:00", match: 74 },
];

export const invoices = [
  { invoiceId: "INV-2026-10-0042", period: "Sep 1 – Sep 30, 2026", status: "unpaid", sessions: 14, hours: 21, rate: 0.08, gross: 18900, due: "Oct 11, 2026" },
  { invoiceId: "INV-2026-09-0038", period: "Aug 1 – Aug 31, 2026", status: "pendingVerification", sessions: 9, hours: 13.5, rate: 0.1, gross: 12150, due: "Sep 11, 2026" },
  { invoiceId: "INV-2026-08-0031", period: "Jul 1 – Jul 31, 2026", status: "paid", sessions: 11, hours: 16.5, rate: 0.1, gross: 14850, due: "Aug 11, 2026" },
];

export const conversations = [
  { id: "c1", name: "Dr. Elena Rostova", last: "Sure, see you at 16:00 with the formula sheet.", time: "10:42", unread: 2, online: true },
  { id: "c2", name: "Marcus Vance", last: "I uploaded the past paper walkthrough.", time: "Yesterday", unread: 0, online: false },
  { id: "c3", name: "Sarah Lin", last: "Please send the outline draft by Friday.", time: "Mon", unread: 0, online: true },
];

export const messages = [
  { from: "them", text: "Hi Ploy! Ready for today's integration by parts session?", time: "10:30" },
  { from: "me", text: "Yes! I struggled with problem 4.2 though — the polar coordinates part.", time: "10:34" },
  { from: "them", text: "No problem, we'll start with that. Please bring your notes.", time: "10:38" },
  { from: "them", text: "Sure, see you at 16:00 with the formula sheet.", time: "10:42" },
];

export const verifications = [
  { tutorProfileId: "t9", name: "Piyawat K.", submitted: "Oct 21, 2026", subjects: "Biology, Chemistry", docs: 4, status: "pending" },
  { tutorProfileId: "t10", name: "Aom S.", submitted: "Oct 20, 2026", subjects: "English, IELTS", docs: 3, status: "pending" },
  { tutorProfileId: "t11", name: "Krit L.", submitted: "Oct 18, 2026", subjects: "Mathematics", docs: 5, status: "verified" },
];
