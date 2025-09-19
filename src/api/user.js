import { apiFetch } from "./http";

/** GET /api/users/me */
export function getMyProfile() {
  return apiFetch("/api/users/me", { auth: true });
}

export function updateMyProfile(patch) {
  return apiFetch("/api/users/me", {
    method: "PUT",
    body: patch,
    auth: true,
  });
}
