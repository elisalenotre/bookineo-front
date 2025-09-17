import React from 'react';
import books from './BookData';


const Genre = ({genre}) => {
    return(
        <option className='option genre-option' value={genre}>
            {genre}
        </option>
    )
}

export default Genre; 