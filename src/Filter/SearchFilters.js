import React from "react";
import SearchBar from "./SearchBar";
import PriceSelector from "./PriceSelector";
import RadioSelector from "./RadioSelector";
import SelectBar from "./SelectBar";
import Book from './Book';
import books from './BookData';
import Genre from './Genre';
import GenreList from './SelectBar'


export default function SearchFilters(){

    return(
        <div>
        <div className="searchbar-section">
            <RadioSelector
                status={books.status}
            >
                
            </RadioSelector>
            <SelectBar
            genre={books.genre}
            >
            </SelectBar>

        </div>
        </div>
    )
};