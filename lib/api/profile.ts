export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}

export async function updateProfileApi(data: UpdateProfilePayload) {
  const res = await fetch("http://localhost:5000/api/profile/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update profile");
  }

  const json = await res.json();
  return json.data;
}
