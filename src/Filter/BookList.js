import React, { useEffect, useState } from "react";
import Book from "./Book";
import { fetchBooks, updateBook } from "../api/book";
import { tokenStore } from "../api/http";

const BookList = ({ searchInput, selectedGenre, availability, author, minPrice, maxPrice }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
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
    };
    loadBooks();
  }, [searchInput, author, availability, minPrice, maxPrice, selectedGenre]);

  async function handleRent(id) {
    try {
      if (!tokenStore.get()) { alert("Connecte-toi pour emprunter."); return; }
      await updateBook(id, { status: "rented" });
      setBooks(bs => bs.map(b => (b.id === id ? { ...b, status: "rented" } : b)));
    } catch (e) {
      alert(e.message || "Erreur lors de l'emprunt (auth requise ?)");
    }
  }

  return (
    <ul className="book-list">
      {filteredBooks.map((book, index) => (
        <li key={index} className="contact-line">
          <Book
            title={book.title}
            author={book.author}
            description={book.description}
            price={book.price}
            genre={book.genre}
            status={book.available ? "Disponible" : "Indisponible"}
          />
        </li>
      ))}
    </ul>
  );
};

export default BookList;