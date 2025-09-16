import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./authentification/SignIn";
import SignUp from "./authentification/SignUp";
import ForgotPassword from "./authentification/ForgotPassword";
import Home from "./Filter/Home";
import './authentification/SignIn.css'

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={< Home/>} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;

