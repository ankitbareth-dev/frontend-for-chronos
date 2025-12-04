export const API_BASE = "http://localhost:5000";

export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || json.message || "Signup failed");
  return json;
}

export async function login(data: { email: string; password: string }) {
  alert("hello");
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || json.message || "Login failed");
  return json;
}

export async function logout() {
  try {
    const res = await fetch(`${API_BASE}/api/auth/logout`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Logout failed");
    }
    return await res.json();
  } catch (err: any) {
    alert("Error: " + err.message);
    throw err;
  }
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
