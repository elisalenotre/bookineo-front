import { apiFetch } from "./http";

const BASE = (process.env.REACT_APP_API_URL || "http://127.0.0.1:8001");
const API_URL = `${BASE}/api/books`;

export async function fetchBooks({ q, author, status, price_min, price_max, genre, page = 1, limit = 10 }) {
  const params = new URLSearchParams();
  if (q) params.append("q", q);
  if (author) params.append("author", author);
  if (status) params.append("status", status);           // 'available' | 'rented'
  if (price_min != null) params.append("price_min", price_min);
  if (price_max != null) params.append("price_max", price_max);
  if (genre) params.append("genre", genre);  
  params.append("page", page);
  params.append("limit", limit);

  const res = await fetch(`${API_URL}?${params.toString()}`, { mode: "cors" });
  if (!res.ok) {
    const txt = await res.text().catch(() => "Erreur API");
    throw new Error(txt || "Erreur API");
  }
  return res.json(); // => { data, page, limit }
}

export async function createBook(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "cors",
  });
  if (!res.ok) throw new Error("Erreur création");
  return res.json();
}

export async function updateBook(id, patch) {
  // PUT protégé → envoie le token automatiquement grâce à apiFetch({auth:true})
  return apiFetch(`/api/books/${id}`, {
    method: "PUT",
    body: patch,
    auth: true,
  });
}

export async function deleteBook(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE", mode: "cors" });
  if (!res.ok) throw new Error("Erreur suppression");
  return true;
}

export async function fetchGenres() {
  const res = await fetch(`${API_URL}/genres`, { mode: "cors" });
  if (!res.ok) throw new Error("Erreur genres");
  const data = await res.json();   // { genres: [...] }
  return data.genres || [];
}