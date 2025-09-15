import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.includes("@")) {
      setError("Email invalide");
      return;
    }

    // Simulation 
    setSuccess("Un lien de réinitialisation a été envoyé à votre email ✅");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Mot de passe oublié</h2>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <form onSubmit={handleSubmit}>
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

          <button className="submit-btn" type="submit">
            Réinitialiser le mot de passe
          </button>

          <p className="signup-link">
            <Link to="/login">Retour à la connexion</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
