export const API_BASE = "http://localhost:5000";

export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Signup failed");
  }

  return await res.json();
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return await res.json();
}

export async function logout() {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Logout failed");
  }

  return await res.json();
}

export async function authCheck() {
  const res = await fetch(`${API_BASE}/api/auth/check-auth`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return await res.json();
}
