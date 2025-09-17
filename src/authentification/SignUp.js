import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/auth";

export default function SignUp() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) return setError("Email invalide");
    if (password.length < 6) return setError("Mot de passe trop court");
    if (password !== confirmPassword) return setError("Les mots de passe ne correspondent pas");

    try {
      setLoading(true);
      await registerUser({
        email,
        password,
        first_name: prenom,
        last_name: nom,
      });

      await loginUser({ email, password, rememberMe: true });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login-container">
      <div className="login-box">
        <h2>Page d'inscription</h2>
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input
              className="input"
              type="text"
              placeholder="Charles"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Prénom</label>
            <input
              className="input"
              type="text"
              placeholder="Leclerc"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>

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
                className="toggle toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "🐵"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn submit-btn" type="submit" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </button>

          <p className="link signup-link">
            Déjà un compte ? <Link to="/login">Connexion</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
