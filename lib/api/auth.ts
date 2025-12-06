export const API_BASE = "http://localhost:5000";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

// ---------- SIGNUP ----------
export async function signupApi(data: SignupPayload) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || json.error || "Signup failed");
  }

  return json; // { message, user? }
}

// ---------- LOGIN ----------
export async function loginApi(data: LoginPayload): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || json.error || "Login failed");
  }

  return json.user;
}

// ---------- LOGOUT ----------
export async function logoutApi(): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "GET",
    credentials: "include",
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "Logout failed");
  }

  return json;
}

// ---------- AUTH CHECK ----------
export async function authCheckApi(): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/check-auth`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
