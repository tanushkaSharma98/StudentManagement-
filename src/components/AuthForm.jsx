import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./AuthForm.css";

const AuthForm = ({ type, toggleForm }) => {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "login") {
        const response = await axios.post("http://localhost:3000/auth/login", {
          email,
          password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token); 
        navigate("/dashboard"); 
      } else {
        
        await axios.post("http://localhost:3000/auth/signup", {
          name,
          email,
          password,
          
        });
        alert("Signup successful! Please login.");
        toggleForm();
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Authentication failed.");
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
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">{type === "login" ? "Login" : "Sign Up"}</button>

      <p onClick={toggleForm} className="toggle-link">
        {type === "login" ? "Not registered? Sign up" : "Already a user? Login"}
      </p>
    </form>
  );
};

export default AuthForm;
