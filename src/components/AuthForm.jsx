import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./AuthForm.css";

const AuthForm = ({ type, toggleForm }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setIsSubmitting(true);

    try {
      if (type === "login") {
        const response = await axios.post("http://localhost:3000/auth/login", {
          email,
          password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        setMessage({ type: "success", text: "Login successful!" });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        await axios.post("http://localhost:3000/auth/signup", {
          name,
          email,
          password,
        });
        setMessage({ type: "success", text: "Signup successful! Please login." });

        setTimeout(() => {
          toggleForm();
          setMessage({ type: "", text: "" });
        }, 1500);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      setMessage({ type: "error", text: "Authentication failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{type === "login" ? "Login" : "Sign Up"}</h2>

      {type === "signup" && (
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isSubmitting}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isSubmitting}
      />

      <button type="submit" disabled={isSubmitting}>
        {type === "login" ? "Login" : "Sign Up"}
      </button>

      {message.text && (
        <div className={`auth-message ${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <p
        onClick={toggleForm}
        className="toggle-link"
        style={{ cursor: "pointer", userSelect: "none", marginTop: "15px" }}
      >
        {type === "login" ? "Not registered? Sign up" : "Already a user? Login"}
      </p>
    </form>
  );
};

export default AuthForm;
