import React from "react";

const Book = ({
  title,
  author,
  description,
  price,
  genre,
  status,
  onRent,
  onEdit,
  onDelete,
}) => {
  const dispoLabel = status === "available" ? "Disponible" : "Indisponible";

  return (
    <div className="box book-box">
      <p className="title-tag"><strong>{title}</strong></p>

      <p className="availability-tag"><i>{dispoLabel}</i></p>

      <strong>Auteur :</strong> {author}<br/>
      <strong>Résumé :</strong> {description}<br/>
      <p className="price-tag">{price}€</p>
      <strong>Genre :</strong> {genre || "-"}

      <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          className={`btn btn-rent ${status === "available" ? "active" : "disabled"}`}
          onClick={onRent}
          disabled={status !== "available"}
        >
          Emprunter
        </button>

        <button className="btn btn-edit" onClick={onEdit}>
          Modifier
        </button>

        <button
          className="btn btn-delete"
          onClick={onDelete}
          style={{ background: "#e74c3c", color: "#fff" }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Book;
