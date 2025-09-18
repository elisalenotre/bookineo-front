import React, { useEffect, useState } from "react";
import { fetchGenres } from "../api/api";

const GenreList = ({ selectedGenre, setSelectedGenre }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let on = true;
    setLoading(true);
    fetchGenres()
      .then(gs => { if (on) setGenres(gs); })
      .catch(() => { if (on) setGenres([]); })
      .finally(() => { if (on) setLoading(false); });
    return () => { on = false; };
  }, []);

  return (
    <div className="selector-box">
      <h3>Choisissez un genre :</h3>
      <select
        className="select-bar input"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">Tous</option>
        {genres.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      {loading && <small>Chargement…</small>}
    </div>
  );
};

export default GenreList;