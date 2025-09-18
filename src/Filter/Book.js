import React from 'react';
import books from './BookData';


const Book = ({title, author, description, price, genre, status}) => {

    return(
        <div className='box book-box'>
            <p className="title-tag"><strong> {title}</strong> </p>
            <p className="availability-tag"> <i>{status}</i> </p>
            <br/>
            <strong>Auteur :</strong> {author}
            <br />
            <strong>Résumé :</strong> {description}
             <br />
            <p className="price-tag"><strong></strong> {price}€ </p>
            <strong>Genre :</strong> {genre}
            <br />
            <button className={`btn btn-rent ${status === "Disponible" ? "active" : "disabled"}`}>
                Emprunter
            </button>
        </div>
    )
}

export default Book; 