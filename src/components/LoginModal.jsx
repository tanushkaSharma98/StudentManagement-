import React, { useState } from "react";
import "./LoginModal.css";
import AuthForm from "./AuthForm";

const LoginModal = ({ onClose }) => {
  const [formType, setFormType] = useState("login");

  const toggleForm = () => {
    setFormType((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <AuthForm type={formType} toggleForm={toggleForm} />
      </div>
    </div>
  );
};

export default LoginModal;
