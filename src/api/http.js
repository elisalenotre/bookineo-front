const BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8001";

export const tokenStore = {
  get: () => localStorage.getItem("auth_token"),
  set: (t) => localStorage.setItem("auth_token", t),
  clear: () => localStorage.removeItem("auth_token"),
};

export async function apiFetch(path, { method = "GET", body, auth = false, headers } = {}) {
  const init = {
    method,
    mode: "cors",
    headers: { "Content-Type": "application/json", ...(headers || {}) },
  };

  if (body instanceof FormData) {
    init.body = body;
    delete init.headers["Content-Type"];
  } else if (body != null) {
    init.body = JSON.stringify(body);
  }

  if (auth) {
    const t = tokenStore.get();
    if (!t) throw new Error("JWT Token not found");
    init.headers.Authorization = `Bearer ${t}`;
  }

  const res = await fetch(`${BASE}${path}`, init);
  if (!res.ok) throw new Error((await res.text().catch(() => "")) || `HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}
