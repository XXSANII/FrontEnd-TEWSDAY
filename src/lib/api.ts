// Thin client for the TewsDay backend. Every endpoint answers { success, code, message, data }.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001/api/v1";

const TOKEN_KEY = "tw_token";

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY)),
  set: (token: string) => window.localStorage.setItem(TOKEN_KEY, token),
  clear: () => window.localStorage.removeItem(TOKEN_KEY),
};

type Options = { method?: string; body?: unknown; auth?: boolean };

export async function api<T>(path: string, { method = "GET", body, auth = true }: Options = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = auth ? tokenStore.get() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  } catch {
    throw new ApiError(0, "network_error", "Cannot reach the server. Please try again.");
  }

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    // Zod failures come back with `message` as an issue list; show the first issue's text when present.
    const msg = typeof json?.message === "string" ? json.message : json?.message?.[0]?.path?.join(".") ? `Invalid ${json.message[0].path.join(".")}.` : "Something went wrong.";
    throw new ApiError(res.status, json?.code ?? "unknown", msg);
  }
  return json.data as T;
}
