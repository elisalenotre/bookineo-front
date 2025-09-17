import React, { useState } from "react";
import "./Restitution.css";

const ReturnBook = () => {
  // Simulation
  const [books, setBooks] = useState([
    { id: 1, title: "Harry Potter", status: "emprunté" },   
    { id: 2, title: "Le Petit Prince", status: "emprunté" },
  ]);

  const [selectedBookId, setSelectedBookId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [comment, setComment] = useState("");
  const [history, setHistory] = useState([]);

  const handleReturn = () => {
    if (!selectedBookId || !returnDate) {
      alert("Veuillez sélectionner un livre et saisir une date.");
      return;
    }

    setBooks(prev =>
      prev.map(book =>
        book.id === parseInt(selectedBookId)
          ? { ...book, status: "disponible" }
          : book
      )
    );

    setHistory(prev => [
      ...prev,
      {
        bookId: selectedBookId,
        date: returnDate,
        comment: comment || "Aucun commentaire",
      },
    ]);

    setSelectedBookId("");
    setReturnDate("");
    setComment("");
  };

  const selectedBook = books.find(book => book.id === parseInt(selectedBookId));

return (
  <div className="return-book">
    <h2>Retourner un livre</h2>

    <div>
      <label>Livre :</label>
      <select
        value={selectedBookId}
        onChange={e => setSelectedBookId(e.target.value)}
      >
        <option value="">Sélectionner un livre</option>
        {books.map(book => (
          <option key={book.id} value={book.id}>
            {book.title} ({book.status})
          </option>
        ))}
      </select>
    </div>

    <div>
      <label>Date de retour :</label>
      <input
        type="date"
        value={returnDate}
        onChange={e => setReturnDate(e.target.value)}
      />
    </div>

    <div>
      <label>Commentaire :</label>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Facultatif"
      />
    </div>

    <button onClick={handleReturn}>Retourner le livre</button>

    {selectedBook && selectedBook.status === "disponible" && (
      <div className="book-status">
        Le livre "{selectedBook.title}" est maintenant disponible !
      </div>
    )}

    <div className="history">
      <h3>Historique des retours :</h3>
      <ul>
        {history.map((h, index) => {
          const book = books.find(b => b.id === parseInt(h.bookId));
          return (
            <li key={index}>
              {book?.title} - {h.date} - {h.comment}
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

};

export default ReturnBook;
