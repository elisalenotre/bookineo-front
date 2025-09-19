import React, { useEffect, useState } from "react";
import { fetchBooks, deleteBook } from "../api/book";
import { useNavigate } from "react-router-dom";

export default function BooksAdmin() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function load() {
    try {
      setLoading(true);
      const json = await fetchBooks({ q, page: 1, limit: 100 });
      setRows(json.data || []);
    } catch (e) {
      console.error(e);
      alert("Impossible de charger les livres");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []); // au premier rendu

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce livre ?")) return;
    try {
      await deleteBook(id);
      setRows(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      console.error(e);
      alert(e.message || "Suppression impossible");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box" style={{ maxWidth: 900 }}>
        <h2>Administration des livres</h2>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            className="input"
            placeholder="Rechercher par titre..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button className="submit-btn" onClick={load} disabled={loading}>Rechercher</button>
          <button className="submit-btn" onClick={() => navigate("/books/new")}>Ajouter un livre</button>
        </div>

        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Genre</th>
              <th>Prix</th>
              <th>Statut</th>
              <th style={{ width: 210 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.title}</td>
                <td>{r.author}</td>
                <td>{r.genre || "-"}</td>
                <td>{r.price?.toFixed?.(2)} €</td>
                <td>{r.status}</td>
                <td>
                  <button className="submit-btn" onClick={() => navigate(`/books/${r.id}/edit`)}>Modifier</button>{" "}
                  <button className="submit-btn" onClick={() => handleDelete(r.id)} style={{ background: "#E11D48" }}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && (
              <tr><td colSpan="7" style={{ textAlign: "center" }}>Aucun résultat</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
