import React from 'react';
import books from './BookData';


const Book = ({title, author, description, price}) => {

    return(
        <div className='box book-box'>
            <strong>Titre :</strong> {title} 
            <br />
            <strong>Auteur :</strong> {author}
            <br />
            <strong>Résumé :</strong> {description}
             <br />
            <strong>Prix :</strong> {price}
        </div>
    )
}

export default Book; 