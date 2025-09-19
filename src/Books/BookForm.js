import React, { useState, useEffect } from "react";

export default function BookForm({ initialData = null, onCancel, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    description: "",
    publication_date: "",
    status: "available",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        author: initialData.author || "",
        price: initialData.price ?? "",
        genre: initialData.genre || "",
        description: initialData.description || "",
        // côté back: publicationDate est exposée en camelCase → on convertit vers string YYYY-MM-DD si présent
        publication_date: initialData.publicationDate
          ? String(initialData.publicationDate).slice(0, 10)
          : "",
        status: initialData.status || "available",
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === "price" ? value.replace(",", ".") : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      price: form.price === "" ? 0 : Number(form.price),
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="box" style={{ marginBottom: 16 }}>
      <h3 style={{ marginTop: 0 }}>{initialData ? "Modifier le livre" : "Ajouter un livre"}</h3>

      <label>Titre</label>
      <input name="title" value={form.title} onChange={handleChange} required />

      <label>Auteur</label>
      <input name="author" value={form.author} onChange={handleChange} />

      <label>Prix (€)</label>
      <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />

      <label>Genre</label>
      <input name="genre" value={form.genre} onChange={handleChange} />

      <label>Résumé</label>
      <textarea name="description" value={form.description} onChange={handleChange} />

      <label>Date de publication</label>
      <input name="publication_date" type="date" value={form.publication_date} onChange={handleChange} />

      <label>Statut</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="available">Disponible</option>
        <option value="rented">Indisponible (loué)</option>
      </select>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button type="submit" className="btn btn-primary">
          {initialData ? "Enregistrer" : "Créer"}
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}
