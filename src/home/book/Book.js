import React from 'react';
import books from '../../Filter/BookData';


const Book = ({title, author, description, price, genre, status}) => {

    return(
        <div className='box book-box'>
            <strong>Titre :</strong> {title} 
            <br />
            <strong>Auteur :</strong> {author}
            <br />
            <strong>Résumé :</strong> {description}
             <br />
            <strong>Prix :</strong> {price}
            <br />
            <strong>Genre :</strong> {genre}
            <br />
            <strong>Status :</strong> {status}
        </div>
    )
}

export default Book; 