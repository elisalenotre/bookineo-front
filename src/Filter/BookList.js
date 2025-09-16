import React from 'react';
import Book from './Book';
import books from './BookData';

const BookList = () => {
  return (
    <ul className="book-list">
      {books.map((book, index) => (
        <li key={index} className="contact-line">
          <Book
            title={book.title}
            author={book.author}
            description={book.description} 
          />
        </li>
      ))}
    </ul>
  );
};

export default BookList;