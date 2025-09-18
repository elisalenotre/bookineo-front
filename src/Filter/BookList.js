import React, { useEffect, useState } from "react";
import Book from "./Book";
import { fetchBooks } from "../api/api";

const BookList = ({ searchInput, selectedGenre, availability, author, minPrice, maxPrice }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks({
          q: searchInput,
          author,
          status: availability === true ? "available" : availability === false ? "unavailable" : null,
          price_min: minPrice,
          price_max: maxPrice,
        });
        setBooks(data.data);
      } catch (err) {
        console.error("Erreur chargement livres:", err);
      }
    };
    loadBooks();
  }, [searchInput, author, availability, minPrice, maxPrice, selectedGenre]);

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <Book
            title={book.title}
            author={book.author}
            description={book.description}
            price={book.price}
            genre={book.genre}
            status={book.status}
          />
        </li>
      ))}
    </ul>
  );
};

export default BookList;
