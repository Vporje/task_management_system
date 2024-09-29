// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navigation from './components/Navigation';
import Home from "./pages/home/Home.js";
import TaskPage from "./pages/taskPage/TaskPage.js";
import Login from "./components/Auth/login/Login.js";
import Register from "./components/Auth/register/Register.js";
import { UserProvider } from "./context/UserContext";
import TaskEdit from "./components/Task/taskEdit/TaskEdit";
import TaskForm from "./components/Task/taskForm/TaskForm.js";

const App = () => {
  return (
    <div className="main">
      <UserProvider>
        <Router>
          {/* <Navigation /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/tasks/create" element={<TaskForm />} />
            <Route path="/tasks/edit/:taskId" element={<TaskEdit />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
