const BASE_URL =
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) ||
  "http://127.0.0.1:8001";

// --- token store: localStorage (remember) ou sessionStorage ---
export const tokenStore = {
  get() {
    return localStorage.getItem("bookineo_token") || sessionStorage.getItem("bookineo_token");
  },
  set(token, remember) {
    if (remember) {
      localStorage.setItem("bookineo_token", token);
      sessionStorage.removeItem("bookineo_token");
    } else {
      sessionStorage.setItem("bookineo_token", token);
      localStorage.removeItem("bookineo_token");
    }
  },
  clear() {
    localStorage.removeItem("bookineo_token");
    sessionStorage.removeItem("bookineo_token");
  },
};

export async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const t = tokenStore.get();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    // si 401 alors purge token
    if (res.status === 401) tokenStore.clear();
    const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}
