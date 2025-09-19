// src/api/auth.js
import { tokenStore } from "./http";

const BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8001";

export async function loginUser({ email, password, rememberMe }) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Identifiants invalides");
  const data = await res.json();

  // ton back peut renvoyer {token: "..."} ou {jwt: "..."} → on gère les 2
  const token = data.token || data.jwt || data.access_token;
  if (!token) throw new Error("Token manquant dans la réponse");
  tokenStore.set(token);                         // <-- on stocke le JWT ici

  // optionnel : mémoriser l’email si "Se souvenir de moi"
  if (rememberMe) localStorage.setItem("current_user_email", email);
  else localStorage.removeItem("current_user_email");

  return data;
}

export async function registerUser(payload) {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Inscription impossible");
  return res.json();
}

export function logout() {
  tokenStore.clear();
  localStorage.removeItem("current_user_email");
}
