export async function getUserMatricesApi() {
  const res = await fetch("http://localhost:5000/api/matrix", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch user metrics");
  }

  const json = await res.json();
  return json.data;
}

export async function createMatrixApi(body: any) {
  const res = await fetch("http://localhost:5000/api/matrix/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create matrix");
  }

  const json = await res.json();
  return json.data;
}
