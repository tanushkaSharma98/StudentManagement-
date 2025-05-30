import React, { useState } from "react";
import "./LandingPage.css";
import LoginModal from "../components/LoginModal";

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
      <div className="content-box">
        <h1>Student Management System</h1>
        <button onClick={handleLogin}>Login</button>
      </div>

      {showLogin && <LoginModal onClose={handleClose} />}
    </div>
  );
};

export default LandingPage;
