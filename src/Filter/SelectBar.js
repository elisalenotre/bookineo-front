import React from "react";
import books from './BookData';
import Genre from './Genre'
    
    const GenreList = ({ selectedGenre, setSelectedGenre }) => {
    const uniqueGenres = [...new Set(books.map(book => book.genre))];

    return(
        <div className="selector-box">
            <h3>Choisissez un genre :</h3>
            <select className='select-bar input'
                value={selectedGenre}
                onChange={e => setSelectedGenre(e.target.value)}
            >
                
                <option value="">Tous</option>
                {uniqueGenres.map((genre, index) => (
                <Genre key={index} genre={genre} />
                ))}
            </select>
        </div>
    );
};

export default GenreList;



    