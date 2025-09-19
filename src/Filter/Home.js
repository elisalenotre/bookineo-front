import React, {useState} from 'react';
import BookList from './BookList';
import PriceSelector from './PriceSelector';
import SearchBar from './SearchBar';
import SearchFilters from './SearchFilters';
import books from './BookData';
import RadioSelector from "./RadioSelector";
import SelectBar from "./SelectBar";
import AutocompleteSearch from "./AutocompleteSearch";
import ChatBox from '../chatbox/ChatBox';


const Home = ({minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [availability, setAvailability] = useState(null);
  const [author, setAuthor] = useState("");

  return (
      <div>
        <h1>Location de livres entre particuliers</h1>
        <div className="search-sidebar box">
          <div className="searchbars">
            <SearchBar
              searchInput={searchInput} setSearchInput={setSearchInput}   
            >
            </SearchBar>

            <AutocompleteSearch 
            author={author} setAuthor={setAuthor} 
            />
          </div>
          
          <div className="selectors">
            <PriceSelector
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={onMinPriceChange}
              onMaxPriceChange={onMaxPriceChange}
            />
          <RadioSelector
                  availability={availability} setAvailability={setAvailability} 
              >
              </RadioSelector>
              
              <SelectBar
              selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}
              >
              </SelectBar>
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
