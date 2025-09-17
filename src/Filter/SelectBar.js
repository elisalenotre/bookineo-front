import React from "react";
import books from './BookData';
import Genre from './Genre'
    
    const GenreList = () => {
    return(
        <div className="box selector-box">
            <h3>Choisissez un genre :</h3>
            <select className='select-bar'>
                
                {books.map((genre, index) => (
                <Genre
                 genre={genre.genre}
                />  
                ))}
            </select>
        </div>
    );
};

export default GenreList;



    