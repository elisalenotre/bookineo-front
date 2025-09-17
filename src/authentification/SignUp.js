import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignIn.css";

export default function SignUp() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


const handleSubmit = async (e) => {
  e.preventDefault();

  // Vérification email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Email invalide.");
    return;
  }

  // Vérification mot de passe conforme
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.");
    return;
  }

  // Vérification confirmation
  if (password !== confirmPassword) {
    setError("Les mots de passe ne correspondent pas.");
    return;
  }

  setError(""); // Réinitialise l'erreur si tout est OK

  // Simulation 
  const profileData = {
    firstName: prenom,
    lastName: nom,
    email: email,
  };
  localStorage.setItem("profileData", JSON.stringify(profileData));

  try {
    const response = await axios.post("https://localhost:8000/api/users", {
      email,
      password,
    });
    console.log(response.data);
    alert("Utilisateur créé ! (simulation profile stockée)");
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la création !");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Page d'inscription</h2>
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              placeholder="Charles"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>

            <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              placeholder="Leclerc"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="exemple@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "🐵"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="submit-btn" type="submit">
            S'inscrire
          </button>

          <p className="signup-link">
            Déjà un compte ? <Link to="/login">Connexion</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
