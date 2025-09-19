import React from "react";

const Book = ({title, author, description, price, genre, status, onRent}) => {

    return(
        <div className='box book-box'>
            <p className="title-tag"><strong> {title}</strong> </p>
            <p className="availability-tag"> <i>{status}</i> </p>
            <p className="availability-tag">
               <i>{status === "available" ? "Disponible" : "Indisponible"}</i>
            </p>
            <br/>
            <strong>Auteur :</strong> {author}
            <br />
            <strong>Résumé :</strong> {description}
             <br />
            <p className="price-tag"><strong></strong> {price}€ </p>
            <strong>Genre :</strong> {genre}
            <br />
            <button
            className={`btn btn-rent ${status === "available" ? "active" : "disabled"}`}
            onClick={onRent}
            disabled={status !== "available"}>
            Emprunter
            </button>
        </div>
    )
}

export default Book; 
