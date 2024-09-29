// src/components/Task/TaskList.js

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import TaskItem from "../taskItem/TaskItem";
import "./taskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { user, setUser } = useContext(UserContext);
  // const [updatedTasks, setUpdatedTasks] = useState(tasks);
  const navigate = useNavigate();

  const userId = user?.data?.details?._id;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tasks/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const result = await response.json();

        setTasks(result.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleLogOut = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setUser(null);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      //filtering the deleted task if from the tasks list and updating the tasks
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);

      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = () => {
    navigate("/tasks/create");
  };

  return (
    <div className="taskListContainer">
      <div className="top">
        <div className="userName">Hello {user?.data?.details?.username}</div>
        <h3 className="tlTitle">Task List</h3>
        <div className="Btns">
          <button className="createTaskBtn" onClick={handleCreateTask}>Create Task</button>
          <button className="logoutBtn" onClick={handleLogOut}>Logout</button>
        </div>
      </div>
      <div className="bottom">
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
