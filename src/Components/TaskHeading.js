import React from "react";
import "./TaskHeading.css"
const TaskHeading = (props) =>{
    return (
        <div><h1 className="task-heading">{props.heading}</h1></div>
    );
}

export default TaskHeading;