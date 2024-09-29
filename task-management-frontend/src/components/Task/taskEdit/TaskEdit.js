import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import {UserContext}  from "../../context/UserContext";

const TaskEdit = () => {
  // const {task} = useContext(UserContext)
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });
  console.log(taskId);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tasks/byId/${taskId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.error();
        }

        const result = await response.json();
        setTask(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleInputChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(task),
        }
      );

      if (!response.ok) {
        console.log("Error..");
      }

      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="taskFormContainer">
      <form className="taskForm">
        <h2 className="taskFormHeading">Edit Task</h2>
        <label>Title:</label>
        <input
        className="taskFormInput"
          type="text"
          name="title"
          value={task.title}
          onChange={handleInputChange}
          required
        />
        <label>Description:</label>
        <textarea
        className="taskFormInput"
          name="description"
          value={task.description}
          onChange={handleInputChange}
          required
        />
        <label>Status:</label>
        <select
        className="taskItemSelect"
          name="status"
          value={task.status}
          onChange={handleInputChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <label>Due Date:</label>
        <input
        className="taskFormCal"
          type="date"
          name="dueDate"
          // value={new Date(task.dueDate).toISOString().split('T')[0]}
          value={task.dueDate}
          onChange={handleInputChange}
          required
        />

        <button className="submitBtn" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default TaskEdit;
