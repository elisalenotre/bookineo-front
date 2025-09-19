import { useState } from 'react';
import BookList from './BookList';
import PriceSelector from './PriceSelector';
import SearchBar from './SearchBar';
import RadioSelector from "./RadioSelector";
import SelectBar from "./SelectBar";
import AutocompleteSearch from "./AutocompleteSearch";
import ChatBox from '../chatbox/ChatBox';

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [availability, setAvailability] = useState(null); 
  const dataMinPrice = 0;
  const dataMaxPrice = 500;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  return (
    <div>
      <h1>Location de livres entre particuliers</h1>

      <div className="search-sidebar box">
        <div className="searchbars">
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <AutocompleteSearch
            author={author}
            setAuthor={setAuthor}
          />
        </div>

        <div className="selectors">
          <PriceSelector
            dataMinPrice={dataMinPrice}
            dataMaxPrice={dataMaxPrice}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
          />
          <RadioSelector
            availability={availability}
            setAvailability={setAvailability}
          />
          <SelectBar
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>
      </div>

      <BookList
        minPrice={minPrice}
        maxPrice={maxPrice}
        searchInput={searchInput}
        selectedGenre={selectedGenre}
        availability={availability}
        author={author}
      />

      <ChatBox />
    </div>
  );
};


export default Home;


