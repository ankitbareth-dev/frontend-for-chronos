export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

const API_BASE = "http://localhost:5000";

export async function loginApi(data: {
  email: string;
  password: string;
}): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Login failed");
  return json.user;
}

export async function signupApi(data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Signup failed");
  return json.user;
}

export async function logoutApi(): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
}

export async function authCheckApi(): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/check-auth`, {
    method: "GET",
    credentials: "include",
  });
  const json = await res.json();

  if (!res.ok) throw new Error("Unauthorized");
  return {
    id: json.user.id,
    name: json.user.name,
    email: json.user.email,
  };
}
