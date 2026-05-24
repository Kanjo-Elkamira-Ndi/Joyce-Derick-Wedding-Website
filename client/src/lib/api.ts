const BASE = "/api"

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = sessionStorage.getItem("admin_token")
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(body.error || "Request failed")
  }
  return res.json()
}

// ── Auth ──────────────────────────────────────────────────
export const auth = {
  login: (password: string) =>
    request<{ token: string; message: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
  me: () => request<{ authenticated: boolean }>("/auth/me"),
}

// ── RSVP ──────────────────────────────────────────────────
export const rsvp = {
  submit: (data: {
    full_name: string
    email: string
    attending: boolean
    meal_preference?: string
    plus_one_name?: string
    dietary_notes?: string
  }) =>
    request<{ message: string; data: any }>("/rsvp", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  list: () =>
    request<{ data: any[]; total: number; attending: number; declining: number }>("/rsvp/admin"),
  exportCsv: async () => {
    const token = sessionStorage.getItem("admin_token")
    const res = await fetch(`${BASE}/rsvp/admin/export`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "rsvps-joyce-derick.csv"
    a.click()
    URL.revokeObjectURL(url)
  },
  delete: (id: string) =>
    request<{ message: string }>(`/rsvp/admin/${id}`, { method: "DELETE" }),
}

// ── Guestbook ─────────────────────────────────────────────
export const guestbook = {
  list: () =>
    request<{ data: any[]; count: number }>("/guestbook"),
  submit: (guest_name: string, message: string) =>
    request<{ message: string; data: any }>("/guestbook", {
      method: "POST",
      body: JSON.stringify({ guest_name, message }),
    }),
  adminList: () =>
    request<{ data: any[]; total: number; pending: number; approved: number }>("/guestbook/admin"),
  approve: (id: string) =>
    request<{ message: string; data: any }>(`/guestbook/admin/${id}/approve`, { method: "PATCH" }),
  delete: (id: string) =>
    request<{ message: string }>(`/guestbook/admin/${id}`, { method: "DELETE" }),
}

// ── Media / Gallery ───────────────────────────────────────
export const media = {
  list: (album?: string) =>
    request<{ data: any[]; count: number }>(`/media${album ? `?album=${album}` : ""}`),
  adminList: () =>
    request<{ data: any[]; count: number }>("/media/admin"),
  delete: (id: string) =>
    request<{ message: string }>(`/media/admin/${id}`, { method: "DELETE" }),
}
