// src/pages/Home.js

import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <div class="home">
        <h1>Welcome to Task Management System</h1>
        <p className="tagline">
          Organize your tasks, track progress, and meet deadlines effortlessly!
        </p>
        <div className="features">
          <h3>Features</h3>
          <ul>
            <li>Manage tasks with ease</li>
            <li>Track task progress and status</li>
            <li>Set due dates and get reminders</li>
          </ul>
        </div>
        <div className="cta-buttons">
          <Link to={"/login"}>
            <button>Log In</button>
          </Link>
          <Link to={"/register"}>
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
