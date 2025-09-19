import React, { useEffect, useState } from "react";
import "./Restitution.css";
import { fetchRentedBooks, returnBookById } from "../api/book";

export default function ReturnBook() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // si tu as l’email en localStorage après login, tu peux filtrer:
        // const email = localStorage.getItem("current_user_email");
        // const { data } = await fetchRentedBooks({ renter_email: email });
        const list = await fetchRentedBooks(); // renvoie directement un []
        setBooks(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
        alert("Impossible de charger les livres loués");
      }
    })();
  }, []);

  const handleReturn = async () => {
    if (!selectedBookId || !returnDate) {
      alert("Sélectionne un livre + une date de retour");
      return;
    }
    try {
      await returnBookById(selectedBookId, { return_date: returnDate, comment });
      // optimiste : maj local
      setBooks(prev => prev.filter(b => b.id !== Number(selectedBookId)));
      setSelectedBookId("");
      setReturnDate("");
      setComment("");
      alert("Livre restitué !");
    } catch (e) {
      console.error(e);
      alert(e.message || "HTTP 500");
    }
  };

  return (
    <div className="return-book">
      <h2>Retourner un livre</h2>

      <div>
        <label>Livre :</label>
        <select value={selectedBookId} onChange={e => setSelectedBookId(e.target.value)}>
          <option value="">Sélectionner un livre</option>
          {books.map(b => (
            <option key={b.id} value={b.id}>
              {b.title} ({b.status})
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

      <button onClick={handleReturn}>Retourner le livre</button>
    </div>
  );
}
