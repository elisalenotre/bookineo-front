import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Email invalide");
      return;
    }
    if (password.length < 6) {
      setError("Mot de passe incorrect");
      return;
    }

    alert(
      `Connexion réussie ✅ (simulation)\nSe souvenir de moi : ${rememberMe ? "Oui" : "Non"}`
    );
  };

  return (
    <div className="container login-container">
      <div className="box login-box">
        <h2>Page de connexion</h2>
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              className="input"
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
                className="input"
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
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
            <a href="/forgot-password" className="link forgot-link">
              Mot de passe oublié ?
            </a>
          </div>

          {/* Checkbox "Se souvenir de moi" */}
          <div className="checkbox">
            <input
              className="input"
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Se souvenir de moi</label>
          </div>

          <button className="btn submit-btn" type="submit">
            Se connecter
          </button>

          <p className="link signup-link">
            Pas encore de compte ? <Link to="/signup">Inscription</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
