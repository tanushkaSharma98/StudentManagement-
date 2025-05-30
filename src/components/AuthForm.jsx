import React from "react";
import "./AuthForm.css";

const AuthForm = ({ type, toggleForm }) => {
  return (
    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
      <h2>{type === "login" ? "Login" : "Sign Up"}</h2>

      
      {type === "signup" && (
        <input type="text" placeholder="Full Name" required />
      )}

      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />

      <button type="submit">{type === "login" ? "Login" : "Sign Up"}</button>

      <p onClick={toggleForm} className="toggle-link">
        {type === "login"
          ? "Not registered? Sign up"
          : "Already a user? Login"}
      </p>
    </form>
  );
};

export default AuthForm;
