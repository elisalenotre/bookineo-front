import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import SignIn from "./authentification/SignIn";
import SignUp from "./authentification/SignUp";
import ForgotPassword from "./authentification/ForgotPassword";
import Home from "./Filter/Home";
import './authentification/SignIn.css'
import Profile from "./profile/Profile";
import Navbar from "./navbar/Navbar";  
import Restitution from "./restitution/Restitution";  


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<SignIn onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={< Home/>} />

        <Route path="/profile" element={< Profile/>} />
        <Route path="/restitution" element={< Restitution/>} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;



