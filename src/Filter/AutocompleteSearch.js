import React, { useState } from "react";
import books from "./BookData";

export default function AutocompleteSearch({ author, setAuthor }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setAuthor(value);

    if (value.length > 0) {
      const matches = books
        .map(b => b.author)
        .filter(a => a.toLowerCase().includes(value.toLowerCase()));
      setSuggestions([...new Set(matches)]);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="selector-box">
      <h3>Filtrer par auteur</h3>
      <input type="text" className="input search-bar" value={author} onChange={handleChange} placeholder="rechercher l'auteur"/>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => setAuthor(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
