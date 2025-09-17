import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { logout } from "../api/auth";

const Navbar = ({ isLoggedIn, onLogout, username }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Bookineo</div>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <Link to="/login" className="nav-btn">
            Connexion
          </Link>
        ) : (
          <div className="user-menu">
            <div
              className="user-info"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <FaUserCircle className="user-icon" />
              <span className="username">{username}</span>
            </div>

            {openMenu && (
              <div className="dropdown">
                <button onClick={() => navigate("/profile")}>Profil</button>
                <button onClick={() => navigate("/messages")}>Messagerie</button>
                <button onClick={() => navigate("/restitution")}>Retourner un livre</button>
                <button onClick={onLogout}>Déconnexion</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
