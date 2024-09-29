// src/components/Task/TaskItem.js
import "./taskItem.css";

import React from "react";

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className="taskItemContainer">
      <div className="taskItemInfo">
        <p className="tIElement taskItemTitle">
          <span className="taskItemTitle">Title:{task.title}</span>
        </p>
        <p className="tIElement">
          Description: <span className="taskItemDesc">{task.description}</span>
        </p>
        <p className="tIElement">
          Status: <span className="taskItemStatus">{task.status}</span>
        </p>
        <p className="tIElement">
          Due Date:
          <span className="taskItemDate">
            {new Date(task.dueDate).toISOString().split("T")[0]}
          </span>
        </p>
      </div>
      <div className="taskItemBtns">
        <button className="editBtn" onClick={() => onEdit(task._id)}>
          Edit
        </button>
        <button className="deleteBtn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
