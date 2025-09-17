import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">Bookineo</div>
      <div className="navbar-right">
        {isLoggedIn && (
          <button className="nav-btn" onClick={() => navigate("/profile")}>
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
  );
};

export default Navbar;