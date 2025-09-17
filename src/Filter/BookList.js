import React from 'react';
import Book from './Book';
import books from './BookData';
import SearchBar from './SearchBar';  

const BookList = ({ minPrice, maxPrice, searchInput }) => {
  const filteredBooks = books.filter((book) => {
    const inPriceRange = book.price >= minPrice && book.price <= maxPrice;
    const matchesSearch = book.title.toLowerCase().includes(searchInput.toLowerCase());
    return inPriceRange && matchesSearch;
  });

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
            status={book.status}
          />
        </li>
      ))}
    </ul>
  );
};

export default BookList;
