import { apiFetch } from "./http";

export async function getInbox({ unread = false, page = 1, limit = 50 } = {}) {
  const qs = new URLSearchParams();
  if (unread) qs.append("unread", "1");
  qs.append("page", page);
  qs.append("limit", limit);
  return apiFetch(`/api/messages?${qs.toString()}`, { auth: true });
}

export async function getConversations() {
  return apiFetch(`/api/messages/conversations`, { auth: true });
}

export async function getConversationWith(email, { page = 1, limit = 200 } = {}) {
  const qs = new URLSearchParams({ page, limit });
  return apiFetch(`/api/messages/with/${encodeURIComponent(email)}?${qs}`, { auth: true });
}

export async function sendMessage(to, content) {
  return apiFetch(`/api/messages`, {
    method: "POST",
    body: { to, content },
    auth: true,
  });
}

export async function markAsRead(id) {
  return apiFetch(`/api/messages/${id}/read`, { method: "POST", auth: true });
}

export async function getUnreadCount() {
  return apiFetch(`/api/messages/unread-count`, { auth: true });
}