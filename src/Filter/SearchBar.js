import React from "react";

function SearchBar() {
    return(
        <div>
            <h3>Rechercher un livre</h3>
            <div className="search-bar-section">
                <input className="input search-bar" type="text" placeholder="titre du livre"/>
                <button className="btn search-btn">Rechercher</button>
            </div>
        </div>
    )
}
    
    export default SearchBar;
