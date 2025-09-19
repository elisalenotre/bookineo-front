const API_URL = "http://localhost:8000/api/books"; 

export async function fetchBooks({ q, author, status, price_min, price_max, page = 1, limit = 10 }) {
  const params = new URLSearchParams();
  if (q) params.append("q", q);
  if (author) params.append("author", author);
  if (status) params.append("status", status);
  if (price_min != null) params.append("price_min", price_min);
  if (price_max != null) params.append("price_max", price_max);
  params.append("page", page);
  params.append("limit", limit);

  const res = await fetch(`${API_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Erreur API");
  return res.json();
}

export async function createBook(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur création");
  return res.json();
}

export async function updateBook(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur mise à jour");
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur suppression");
  return true;
}
