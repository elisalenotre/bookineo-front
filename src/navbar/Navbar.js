import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    birthDate: "1990-01-01",
  });
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    setSuccessMessage("Profil mis à jour avec succès !");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">MonApp</div>
        <div className="navbar-right">
          {isLoggedIn && (
            <button className="nav-btn" onClick={() => setShowProfile(!showProfile)}>
              Profil
            </button>
          )}
          {isLoggedIn ? (
            <button className="nav-btn" onClick={onLogout}>
              Déconnexion
            </button>
          ) : (
            <Link to="/login" className="nav-btn">
                Connexion
            </Link>
          )}
        </div>
      </nav>

      {/* Modal / Dropdown Profil */}
      {showProfile && isLoggedIn && (
        <div className="login-container">
          <div className="login-box">
            <h2>Profil Utilisateur</h2>

            {successMessage && <div className="success-box">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div className="form-group">
                <label>Date de naissance</label>
                <input
                  type="date"
                  name="birthDate"
                  value={profile.birthDate}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              {editMode ? (
                <button type="submit" className="submit-btn">
                  Valider
                </button>
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
      )}
    </>
  );
};

export default Navbar;
