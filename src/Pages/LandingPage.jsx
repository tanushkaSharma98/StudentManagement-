import React, { useState } from "react";
import "./LandingPage.css";
import LoginModal from "../components/LoginModal";
import logo from "../assets/Student_Management.png";
// import lockKey from "../assets/Lock_Key.png"; 

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleClose = () => {
    setShowLogin(false);
  };

  return (
    <div className="landing-container">
      
      {/* <img src={lockKey} alt="Lock Key" className="lock-key-floating" /> */}

      <div className="floating-card top-left">100% Secure Data</div>
      <div className="floating-card top-right">Easy To use</div>
      <div className="floating-card bottom-right">Let's Get Started</div>

      <div className="overlay-box">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="main-title">Student Management</h1>
        <h2 className="subtitle">System</h2>
        <p className="description">Only Admin Can Login!</p>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>

      {showLogin && <LoginModal onClose={handleClose} />}
    </div>
  );
};

export default LandingPage;
