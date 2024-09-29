// src/components/Task/TaskForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./taskForm.css";

const TaskForm = () => {
  const navigate = useNavigate();
  const [createtask, setCreateTask] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });

  const onChange = (event) => {
    setCreateTask({ ...createtask, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://localhost:3000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(createtask),
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/tasks");
  };

  return (
    <div className="taskFormContainer">
      <form className="taskForm" onSubmit={handleSubmit}>
        <h2 className="taskFormHeading">Create Task</h2>
        <label>Title:</label>
        <input
          className="taskFormInput"
          placeholder="title"
          name="title"
          type="text"
          value={createtask.title}
          onChange={onChange}
          required
        />
        <label>Description:</label>
        <textarea
          className="taskFormInput"
          placeholder="description"
          name="description"
          value={createtask.description}
          onChange={onChange}
          required
        />
        <label>Status:</label>
        <select className="taskItemSelect" name="status" value={createtask.status} onChange={onChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <label>Due Date:</label>
        <input
          className="taskFormCal"
          type="date"
          name="dueDate"
          value={createtask.dueDate}
          onChange={onChange}
          required
        />
        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
