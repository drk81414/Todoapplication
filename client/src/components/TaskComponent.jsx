import React from "react";
import "./TaskComponent.css";

const TaskComponent = (props) => {
  const task = props.task;
  return (
    <div className="task-container">
    <button><i className="fa-regular fa-square"></i></button>
      <p>{task.title}</p>
    </div>
  );
};

export default TaskComponent;
