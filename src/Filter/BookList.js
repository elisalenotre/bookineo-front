import { useEffect, useState, useCallback } from "react";
import Book from "./Book";
import BookForm from "../Books/BookForm";
import { fetchBooks, createBook, updateBook, deleteBook } from "../api/book";
import { tokenStore } from "../api/http";

const BookList = ({ searchInput, selectedGenre, availability, author, minPrice, maxPrice }) => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); 

  const loadBooks = useCallback(async () => {
    try {
      const data = await fetchBooks({
        q: searchInput,
        author,
        status: availability === true ? "available" : availability === false ? "rented" : null,
        price_min: minPrice,
        price_max: maxPrice,
        genre: selectedGenre || null,
      });
      setBooks(data.data || []);
    } catch (err) {
      console.error("Erreur chargement livres:", err);
    }
  }, [searchInput, author, availability, minPrice, maxPrice, selectedGenre]);

  useEffect(() => { loadBooks(); }, [loadBooks]);

  async function handleRent(id) {
    try {
      if (!tokenStore.get()) { alert("Connecte-toi pour emprunter."); return; }
      await updateBook(id, { status: "rented" });
      setBooks(bs => bs.map(b => (b.id === id ? { ...b, status: "rented" } : b)));
    } catch (e) {
      alert(e.message || "Erreur lors de l'emprunt (auth requise ?)");
    }
  }

  function openCreate() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(book) {
    setEditing(book);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer ce livre ?")) return;
    try {
      await deleteBook(id);
      setBooks(bs => bs.filter(b => b.id !== id));
    } catch (e) {
      alert(e.message || "Erreur suppression");
    }
  }

  async function handleSubmit(payload) {
    try {
      if (editing) {
        await updateBook(editing.id, payload); 
      } else {
        await createBook(payload);           
      }
      setShowForm(false);
      setEditing(null);
      await loadBooks(); 
    } catch (e) {
      console.error(e);
      alert(e.message || "Erreur enregistrement");
    }
  }

  return (
    <div className="books-section">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Livres</h2>
        <button className="btn btn-primary btn-display-books" onClick={openCreate}>Ajouter un livre</button>
      </div>

      {showForm && (
        <BookForm
          initialData={editing}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          onSubmit={handleSubmit}
        />
      )}

      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="contact-line">
            <Book
              title={book.title}
              author={book.author}
              description={book.description}
              price={book.price}
              genre={book.genre}
              status={book.status}
              onRent={() => handleRent(book.id)}
              onEdit={() => openEdit(book)}
              onDelete={() => handleDelete(book.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
