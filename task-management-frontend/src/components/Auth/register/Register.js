// src/components/Auth/Register.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error creating an account");
      }

      await response.json();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleRegisterFormSubmit} className="registerContainer">
      <h2>Register</h2>
      <div className="inputContainer">
        <input
          className="inputField"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="inputField"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="inputField"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className="submitBtn" type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
