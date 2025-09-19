import React, { useEffect, useState } from "react";
import "./Historique.css";
import { fetchHistory } from "../api/book";

export default function Historique() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchHistory();
        setRows(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const filtered = rows.filter((r) =>
    [r.titre, r.proprietaire, r.locataire].some(v => (v || "").toLowerCase().includes(filter.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    return (a[sortKey] || "").localeCompare(b[sortKey] || "");
  });

  const getDuration = (start, end) => {
    if (!start || !end) return "";
    const d1 = new Date(start), d2 = new Date(end);
    return Math.ceil((d2 - d1) / (1000*60*60*24)) + " jours";
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
          {sorted.map((r) => (
            <tr key={r.id}>
              <td>{r.titre}</td>
              <td>{r.proprietaire}</td>
              <td>{r.locataire}</td>
              <td>{r.dateLocation || "-"}</td>
              <td>{r.dateRetour || "-"}</td>
              <td>{getDuration(r.dateLocation, r.dateRetour)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
