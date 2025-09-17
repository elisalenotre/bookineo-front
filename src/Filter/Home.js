import React, {useState} from 'react';
import BookList from './BookList';
import PriceSelector from './PriceSelector';
import SearchBar from './SearchBar';
import SearchFilters from './SearchFilters';
import books from './BookData';


const Home = ({minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }) => {
  const [searchInput, setSearchInput] = useState("");

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
      <SearchFilters />

      <BookList 
      minPrice={minPrice} maxPrice={maxPrice} searchInput={searchInput}
      />
    </div>
  );
};

export default Home;
