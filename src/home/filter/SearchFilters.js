import React from "react";
import SearchBar from "./SearchBar";
import PriceSelector from "./PriceSelector";
import RadioSelector from "./RadioSelector";
import SelectBar from "./SelectBar";
import Book from './Book';
import books from './BookData';
import Genre from './Genre';
import GenreList from './SelectBar'
import AutocompleteSearch from "./AutocompleteSearch";

export default function SearchFilters({selectedGenre,
    setSelectedGenre,
    availability,
    setAvailability,
    author,
    setAuthor
    }){

    return(
        <div>
        <div className="searchbar-section">    
    
            <RadioSelector
                availability={availability} setAvailability={setAvailability} 
            >
            </RadioSelector>
            
            <SelectBar
            selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}
            >
            </SelectBar>

             <AutocompleteSearch 
             author={author} setAuthor={setAuthor} 
             />

        </div>
        </div>
    )
};