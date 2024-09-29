import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import './login.css'


const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const{setUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleLoginForm(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const info = await response.json();
      console.log(info)
      setUser(info)
      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleLoginForm} className="loginContainer">
      <h2>Login</h2>
      <div className="inputContainer">
        <input
          className="inputField"
          type="text"
          placeholder="Enter Username"
          required
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
        className="inputField"
          type="password"
          placeholder="Enter Password"
          required
          name="password"
          onChange={handleChange}
        />

        <button type="submit" className="submitBtn">Login</button>
      </div>
    </form>
  );
};
export default Login;
