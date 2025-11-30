const BASE = process.env.NEXT_PUBLIC_API_URL;

async function request(url: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${url}`, {
    ...options,
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    let msg = "Request failed";
    try {
      const data = await res.json();
      msg = data.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export const api = {
  getClubs: () => request("/clubs"),
  getClub: (id: string) => request(`/clubs/${id}`),
  createClub: (data: any) =>
    request("/club/create", { method: "POST", body: JSON.stringify(data) }),
  updateClub: (id: string, data: any) =>
    request(`/clubs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteClub: (id: string) =>
    request(`/clubs/${id}`, { method: "DELETE" }),
};
