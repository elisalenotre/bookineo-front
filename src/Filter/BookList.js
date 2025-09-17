import React from 'react';
import Book from './Book';
import books from './BookData';

const BookList = ({ minPrice, maxPrice }) => {
  const filteredBooks = books.filter(
    (book) => book.price <= maxPrice && book.price >= minPrice
  
  );

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
