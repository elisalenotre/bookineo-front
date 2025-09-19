import { apiFetch } from "./http";

const BASE = (process.env.REACT_APP_API_URL || "http://127.0.0.1:8001");
const API_URL = `${BASE}/api/books`;

export async function fetchBooks({ q, author, status, price_min, price_max, genre, page = 1, limit = 10 }) {
  const params = new URLSearchParams();
  if (q) params.append("q", q);
  if (author) params.append("author", author);
  if (status) params.append("status", status); 
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
  return res.json(); 
}

export async function createBook(data) {
  return apiFetch(`/api/books`, {
    method: "POST",
    body: data,
    auth: true,
  });
}

export async function updateBook(id, patch) {
  return apiFetch(`/api/books/${id}`, {
    method: "PUT",
    body: patch,
    auth: true,
  });
}

export async function deleteBook(id) {
  await apiFetch(`/api/books/${id}`, {
    method: "DELETE",
    auth: true,
  });
  return true;
}

export async function fetchGenres() {
  const res = await fetch(`${API_URL}/genres`, { mode: "cors" });
  if (!res.ok) throw new Error("Erreur genres");
  const data = await res.json();
  return data.genres || [];
}

export async function rentBookById(id, { renter_email, start_date }) {
  return apiFetch(`/api/books/${id}/rent`, {
    method: "POST",
    body: { renter_email, start_date },
    auth: true,
  });
}

export async function returnBookById(id, { return_date, comment }) {
  return apiFetch(`/api/books/${id}/return`, {
    method: "POST",
    body: { return_date, comment },
    auth: true,
  });
}

/**
 * Récupère les livres loués.
 * @param {Object} opts
 * @param {boolean} opts.onlyMine
 * @param {number} opts.page
 * @param {number} opts.limit
 * @returns {Promise<Array>}
 */
export async function fetchRentedBooks({ onlyMine = true, page = 1, limit = 100 } = {}) {
  const params = new URLSearchParams({ status: "rented", page, limit });
  if (onlyMine) params.append("mine", "1");

  if (onlyMine) {
    const json = await apiFetch(`/api/books?${params.toString()}`, { auth: true });
    return json.data || [];
  } else {
    const res = await fetch(`${API_URL}?${params.toString()}`, { mode: "cors" });
    if (!res.ok) throw new Error("Erreur API");
    const json = await res.json();
    return json.data || [];
  }
}

export async function fetchHistory(params = {}) {
  const usp = new URLSearchParams(params);
  const res = await fetch(`${API_URL}/history?${usp.toString()}`, { mode: "cors" });
  if (!res.ok) throw new Error("Erreur API");
  const json = await res.json();

  return (json.data || []).map(r => ({
    id: r.id,
    titre: r.title,
    proprietaire: r.owner,
    locataire: r.renter || r.renterEmail || null,
    dateLocation: r.rented_at,
    dateRetour: r.returned_at,
    duree: r.duration ?? undefined,
  }));
}

export async function fetchBookById(id) {
  const res = await fetch(`${API_URL}/${id}`, { mode: "cors" });
  if (!res.ok) throw new Error("Livre introuvable");
  return res.json();
}
