import React from 'react';

const SearchBar = ({ searchInput, setSearchInput }) => {
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

    return(
        <div>
            <h3>Rechercher un livre</h3>
            <div className="search-bar-section">
                <input 
                    type="search"
                    className="input search-bar" 
                    onChange={handleChange}
                    value={searchInput} 
                    placeholder="rechercher le titre"
                />
            </div>
        </div>
    )
}
    
    export default SearchBar;
