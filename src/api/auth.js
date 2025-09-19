import { apiFetch, tokenStore } from "./http";

export async function loginUser({ email, password, rememberMe }) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });

  const token = data.token || data.jwt || data.access_token || data.id_token;
  if (!token) throw new Error("Token manquant dans la réponse");
  tokenStore.set(token);

  if (rememberMe) localStorage.setItem("current_user_email", email);
  else localStorage.removeItem("current_user_email");

  return data;
}

export async function registerUser(payload) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: payload,
  });
}

export async function me() {
  return apiFetch("/api/auth/me", { auth: true });
}

export function logout() {
  tokenStore.clear();
  localStorage.removeItem("current_user_email");
}
