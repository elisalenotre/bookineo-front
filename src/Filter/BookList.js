import React from 'react';
import Book from './Book';
import books from './BookData';
import SearchBar from './SearchBar';  
import AutocompleteSearch from './AutocompleteSearch';
import SelectBar from './SelectBar';

const BookList = ({ minPrice, maxPrice, searchInput, selectedGenre, availability, author }) => {
  const filteredBooks = books.filter((book) => {
  const inPriceRange = book.price >= minPrice && book.price <= maxPrice;
  const matchesSearch = book.title.toLowerCase().includes(searchInput.toLowerCase());
  const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
  const matchesAvailability = availability !== null ? book.available === availability : true;
  const matchesAuthor = author ? book.author.toLowerCase().includes(author.toLowerCase()) : true;
  return inPriceRange && matchesSearch && matchesGenre && matchesAvailability && matchesAuthor;
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
            status={book.available ? "Disponible" : "Indisponible"}
          />
        </li>
      ))}
    </ul>
  );
};

export default BookList;
