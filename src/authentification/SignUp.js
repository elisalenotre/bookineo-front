// import React, { useState } from "react";
// import "./SignIn"; // on réutilise le même CSS

// export default function SignUp() {
//   const [isLogin, setIsLogin] = useState(true); // true = connexion, false = inscription

//   // Etats communs
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   // Etats spécifiques inscription
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email.includes("@")) {
//       setError("Email invalide");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Mot de passe trop court");
//       return;
//     }

//     if (!isLogin && password !== confirmPassword) {
//       setError("Les mots de passe ne correspondent pas");
//       return;
//     }

//     alert(
//       isLogin
//         ? "Connexion réussie ✅ (simulation)"
//         : "Inscription réussie ✅ (simulation)"
//     );
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>{isLogin ? "Page de connexion" : "Page d'inscription"}</h2>

//         {error && <div className="error-box">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="exemple@mail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Mot de passe</label>
//             <div className="password-wrap">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={
//                   showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"
//                 }
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             {isLogin && (
//               <a href="/forgot-password" className="forgot-link">
//                 Mot de passe oublié ?
//               </a>
//             )}
//           </div>

//           {!isLogin && (
//             <div className="form-group">
//               <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
//               <input
//                 id="confirmPassword"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="********"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           {isLogin && (
//             <div className="checkbox">
//               <input
//                 id="rememberMe"
//                 type="checkbox"
//               />
//               <label htmlFor="rememberMe">Se souvenir de moi</label>
//             </div>
//           )}

//           <button className="submit-btn" type="submit">
//             {isLogin ? "Se connecter" : "S'inscrire"}
//           </button>

//           <p className="signup-link">
//             {isLogin ? (
//               <>
//                 Pas encore de compte ?{" "}
//                 <button
//                   type="button"
//                   className="link-button"
//                   onClick={() => setIsLogin(false)}
//                 >
//                   Inscription
//                 </button>
//               </>
//             ) : (
//               <>
//                 Déjà un compte ?{" "}
//                 <button
//                   type="button"
//                   className="link-button"
//                   onClick={() => setIsLogin(true)}
//                 >
//                   Connexion
//                 </button>
//               </>
//             )}
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Email invalide");
      return;
    }
    if (password.length < 6) {
      setError("Mot de passe trop court");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    alert("Inscription réussie ✅ (simulation)");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Page d'inscription</h2>
        {error && <div className="error-box">{error}</div>}

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
                {showPassword ? "🙈" : "👁️"}
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
