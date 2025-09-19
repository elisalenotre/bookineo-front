import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getMyProfile, updateMyProfile } from "../api/user";

export default function Profile() {
  const navigate = useNavigate();

  // on garde des clés qui matchent le back: first_name, last_name, birth_date
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    email: "",            // affichage en lecture seule si le back le renvoie
  });

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Charge les infos du profil au montage
  useEffect(() => {
    (async () => {
      try {
        const me = await getMyProfile(); // { first_name, last_name, birth_date, email, ... }
        setProfile({
          first_name: me.first_name ?? me.firstName ?? "",
          last_name: me.last_name ?? me.lastName ?? "",
          birth_date: me.birth_date ? String(me.birth_date).slice(0, 10) : "", // YYYY-MM-DD pour <input type="date"/>
          email: me.email ?? me.username ?? "",
        });
      } catch (e) {
        // si non connecté → redirige vers login
        if (e.status === 401) navigate("/login");
        else setError(e.message || "Impossible de charger le profil");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateMyProfile({
        first_name: profile.first_name,
        last_name: profile.last_name,
        birth_date: profile.birth_date || null, // si vide on envoie null
      });
      setSuccess("Profil mis à jour avec succès !");
      setEditMode(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (e) {
      setError(e.message || "Échec de la mise à jour");
    }
  };

  if (loading) {
    return (
      <div className="login-container">
        <div className="login-box">Chargement du profil…</div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Profil Utilisateur</h2>

        {success && <div className="success-box">{success}</div>}
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={onSubmit}>
          {/* Email en lecture seule si tu veux l’afficher */}
          {profile.email && (
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={profile.email} disabled />
            </div>
          )}

          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              name="first_name"
              value={profile.first_name}
              onChange={onChange}
              disabled={!editMode}
              placeholder="Entrez votre prénom"
            />
          </div>

          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="last_name"
              value={profile.last_name}
              onChange={onChange}
              disabled={!editMode}
              placeholder="Entrez votre nom"
            />
          </div>

          <div className="form-group">
            <label>Date de naissance</label>
            <input
              type="date"
              name="birth_date"
              value={profile.birth_date}
              onChange={onChange}
              disabled={!editMode}
            />
          </div>

          {editMode ? (
            <button type="submit" className="submit-btn">Valider</button>
          ) : (
            <button
              type="button"
              className="submit-btn"
              onClick={() => setEditMode(true)}
            >
              Modifier
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
