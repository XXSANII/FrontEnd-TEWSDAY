import { api, tokenStore } from "./api";

export type Mode = "student" | "tutor";
type Session = { userId: string; sessionId: string; token: string; expiredAt: string; currentMode: Mode };
export type Profile = {
  userId: string; displayName: string; email: string; role: "user" | "admin"; currentMode: Mode;
  studentProfileId: string | null; tutorProfileId: string | null;
};

// auth_002_c
export async function login(email: string, password: string) {
  const s = await api<Session>("/auth/login", { method: "POST", body: { email, password }, auth: false });
  tokenStore.set(s.token);
  return s;
}

// auth_001_c
export async function register(input: { email: string; password: string; displayName: string; currentMode: Mode }) {
  const s = await api<Session>("/auth/register", { method: "POST", body: input, auth: false });
  tokenStore.set(s.token);
  return s;
}

// me_001_g
export const getProfile = () => api<Profile>("/me/profile/get");

// auth_005_c — always clear the local token, even if the server call fails.
export async function logout() {
  try { await api("/auth/logout", { method: "POST" }); } finally { tokenStore.clear(); }
}

export const homeFor = (p: Pick<Profile, "role" | "currentMode">) =>
  p.role === "admin" ? "/admin" : p.currentMode === "tutor" ? "/me/tutor" : "/me";
