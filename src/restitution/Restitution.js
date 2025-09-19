import { useEffect, useState } from "react";
import "./Restitution.css";
import { fetchBooks, updateBook } from "../api/book";

export default function ReturnBook() {
  const [books, setBooks] = useState([]);        // livres loués
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedBookId, setSelectedBookId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetchBooks({ status: "rented", page: 1, limit: 100 });
        setBooks(res.data || []);
      } catch (e) {
        setError(e.message || "Erreur chargement");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleReturn = async () => {
    if (!selectedBookId || !returnDate) {
      alert("Veuillez sélectionner un livre et saisir une date.");
      return;
    }
    try {
      setError("");
      // met livre disponible
      await updateBook(selectedBookId, { status: "available" });

      const b = books.find(x => String(x.id) === String(selectedBookId));
      setBooks(prev => prev.filter(x => String(x.id) !== String(selectedBookId))); // on l’enlève de la liste “loués”

      // reset champs
      setSelectedBookId("");
      setReturnDate("");
      setComment("");

      alert(`Le livre "${b?.title ?? selectedBookId}" est maintenant disponible ✅`);
    } catch (e) {
      alert(e.message || "HTTP 500");
    }
  };

  return (
    <div className="return-book">
      <h2>Retourner un livre</h2>

      {loading && <p>Chargement…</p>}
      {error && !loading && <p style={{color:"crimson"}}>{error}</p>}

      <div>
        <label>Livre :</label>
        <select value={selectedBookId} onChange={e => setSelectedBookId(e.target.value)}>
          <option value="">Sélectionner un livre</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>
              {book.title} ({book.status === "rented" ? "emprunté" : book.status})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Date de retour :</label>
        <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
      </div>

      <div>
        <label>Commentaire :</label>
        <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Facultatif" />
      </div>

      <button onClick={handleReturn} disabled={!books.length || loading}>
        Retourner le livre
      </button>
    </div>
  );
}
