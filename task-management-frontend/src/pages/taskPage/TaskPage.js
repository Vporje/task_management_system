// src/pages/TaskPage.js

import React from "react";
import TaskList from "../../components/Task/taskList/TaskList.js";
import "./taskPage.css"

const TaskPage = () => {
  return (
    <div className="taskListMain">
      <TaskList />
    </div>
  );
};

export default TaskPage;
