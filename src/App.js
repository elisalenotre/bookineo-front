import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import SignIn from "./authentification/SignIn";
import SignUp from "./authentification/SignUp";
import ForgotPassword from "./authentification/ForgotPassword";
import Home from "./Filter/Home";
import books from '././Filter/BookData';
import './authentification/SignIn.css'
import Profile from "./profile/Profile";
import Navbar from "./navbar/Navbar";   

const dataMinPrice = Math.min(...books.map(book => book.price));
const dataMaxPrice = Math.max(...books.map(book => book.price));


function App() {
  const [minPrice, setMinPrice] = useState(dataMinPrice);
  const [maxPrice, setMaxPrice] = useState(dataMaxPrice);

  const handleMinPriceChange = (newMinPrice) => {
    setMinPrice(newMinPrice);
  };

  const handleMaxPriceChange = (newMaxPrice) => {
    setMaxPrice(newMaxPrice);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true); // "true" pour tester le bouton Profil dans la Navbar

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
        <Route path="/home" element={<Home
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={handleMinPriceChange}
                onMaxPriceChange={handleMaxPriceChange}
              />
        } 
          />

        <Route path="/profile" element={< Profile/>} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;



