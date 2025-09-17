import React from 'react';
import BookList from './BookList';
import PriceSelector from './PriceSelector';
import SearchBar from './SearchBar';
import SearchFilters from './SearchFilters';

const Home = ({ minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }) => {
  return (
    <div>
      <h1>Location de livres</h1>
      <SearchBar></SearchBar>
      <PriceSelector
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={onMinPriceChange}
        onMaxPriceChange={onMaxPriceChange}
      />
      <SearchFilters />

      <BookList minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  );
};

export default Home;
