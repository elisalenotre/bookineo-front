// import React, { useState } from "react";
// import "./Profile.css";

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     firstName: "John",
//     lastName: "Doe",
//     birthDate: "1990-01-01",
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setEditMode(false);
//     setSuccessMessage("Profil mis à jour avec succès !");
//     setTimeout(() => setSuccessMessage(""), 3000);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Profil Utilisateur</h2>

//         {successMessage && <div className="success-box">{successMessage}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Prénom</label>
//             <input
//               type="text"
//               name="firstName"
//               value={profile.firstName}
//               onChange={handleChange}
//               disabled={!editMode}
//             />
//           </div>

//           <div className="form-group">
//             <label>Nom</label>
//             <input
//               type="text"
//               name="lastName"
//               value={profile.lastName}
//               onChange={handleChange}
//               disabled={!editMode}
//             />
//           </div>

//           <div className="form-group">
//             <label>Date de naissance</label>
//             <input
//               type="date"
//               name="birthDate"
//               value={profile.birthDate}
//               onChange={handleChange}
//               disabled={!editMode}
//             />
//           </div>

//           {editMode ? (
//             <button type="submit" className="submit-btn">
//               Valider
//             </button>
//           ) : (
//             <button
//               type="button"
//               className="submit-btn"
//               onClick={() => setEditMode(true)}
//             >
//               Modifier
//             </button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Simulation : récupérer les infos depuis le localStorage (ou un state global)
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (storedProfile) {
      setProfile(storedProfile);
    } else {
      // valeurs par défaut si rien n'est stocké
      setProfile({ firstName: "", lastName: "", birthDate: "" });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    setSuccessMessage("Profil mis à jour avec succès !");
    // Sauvegarde dans localStorage pour simuler la persistance
    localStorage.setItem("profileData", JSON.stringify(profile));
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
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
              placeholder="Entrez votre prénom"
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
              placeholder="Entrez votre nom"
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
  );
};

export default Profile;

