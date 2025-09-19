import React, { useState } from "react";
import "./Historique.css";

const Historique = () => {
  // Simulation
  const [history, setHistory] = useState([
    {
      id: 1,
      titre: "Harry Potter",
      proprietaire: "Alice",
      locataire: "Bob",
      dateLocation: "2025-08-01",
      dateRetour: "2025-08-15",
    },
    {
      id: 2,
      titre: "Le Petit Prince",
      proprietaire: "Elisa",
      locataire: "David",
      dateLocation: "2025-08-05",
      dateRetour: "2025-08-20",
    },
    {
      id: 3,
      titre: "Le Seigneur des Anneaux",
      proprietaire: "Alice",
      locataire: "Emma",
      dateLocation: "2025-08-10",
      dateRetour: "2025-08-25",
    },
  ]);

  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  // Filtrage simple
  const filteredHistory = history.filter(
    item =>
      item.titre.toLowerCase().includes(filter.toLowerCase()) ||
      item.proprietaire.toLowerCase().includes(filter.toLowerCase()) ||
      item.locataire.toLowerCase().includes(filter.toLowerCase())
  );

  // Tri simple
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (!sortKey) return 0;
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  // Calcul durée
  const getDuration = (start, end) => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff + " jours";
  };

  return (
    <div className="history-page">
      <h2>Historique des locations</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Filtrer par livre, propriétaire ou locataire..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />

        <select value={sortKey} onChange={e => setSortKey(e.target.value)}>
          <option value="">Trier par</option>
          <option value="titre">Livre</option>
          <option value="proprietaire">Propriétaire</option>
          <option value="locataire">Locataire</option>
          <option value="dateLocation">Date de location</option>
          <option value="dateRetour">Date de retour</option>
        </select>
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>Livre</th>
            <th>Propriétaire</th>
            <th>Locataire</th>
            <th>Date de location</th>
            <th>Date de retour</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map(item => (
            <tr key={item.id}>
              <td>{item.titre}</td>
              <td>{item.proprietaire}</td>
              <td>{item.locataire}</td>
              <td>{item.dateLocation}</td>
              <td>{item.dateRetour}</td>
              <td>{getDuration(item.dateLocation, item.dateRetour)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historique;
