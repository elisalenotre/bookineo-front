import React, {useState} from 'react';
import BookList from './BookList';
import PriceSelector from './PriceSelector';
import SearchBar from './SearchBar';
import SearchFilters from './SearchFilters';
import books from './BookData';


const Home = ({minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [availability, setAvailability] = useState(null);
  const [author, setAuthor] = useState("");

  return (
    <div>
      <h1>Location de livres</h1>
      <SearchBar
        searchInput={searchInput} setSearchInput={setSearchInput}   
      >
      </SearchBar>
      
      <PriceSelector
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={onMinPriceChange}
        onMaxPriceChange={onMaxPriceChange}
      />
      <SearchFilters
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        availability={availability}
        setAvailability={setAvailability}
        author={author}
        setAuthor={setAuthor}
      />

      <BookList
        minPrice={minPrice}
        maxPrice={maxPrice}
        searchInput={searchInput}
        selectedGenre={selectedGenre}
        availability={availability}
        author={author}
      />
    </div>
  );
};

export default Home;
