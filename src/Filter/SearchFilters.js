import React from "react";
import SearchBar from "./SearchBar";
import PriceSelector from "./PriceSelector";
import RadioSelector from "./RadioSelector";


export default function SearchFilters(){

    return(
        <div>
        <SearchBar></SearchBar>
        <PriceSelector></PriceSelector>
        <RadioSelector></RadioSelector>
        </div>
    )
};