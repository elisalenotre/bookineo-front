import { apiFetch, tokenStore } from "./http";

export async function registerUser({ email, password, first_name, last_name }) {
  // le back valide: email et mot de passe fort
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: { email, password, first_name, last_name },
  });
}

export async function loginUser({ email, password, rememberMe }) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
  tokenStore.set(data.token, !!rememberMe);
  return data.token;
}

export async function fetchMe() {
  return apiFetch("/api/users/me", { auth: true });
}

export function logout() {
  tokenStore.clear();
}
