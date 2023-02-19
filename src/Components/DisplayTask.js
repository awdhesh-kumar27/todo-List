import React, { useEffect } from "react";
import './DisplayTask.css';
import Edit from "../Assets/edit.svg";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
import Del from "../Assets/delete.svg";
const DisplayTask = (props) =>{
   //   console.log(props);
   const navigate = useNavigate();
    const firebase = useFirebase();
     const deleteHandler = async (event)=>{
           event.preventDefault();
          await firebase.deleteTaskById(props.task.TaskId);
         
          firebase.setTaskData([]);
          navigate("/UserHome");
         console.log("Task Deleleted Successfully");
     }
      

       return (
        <div>
              <div className="task">
                <div className="task-row">
                  <div className="title">{props.task.title}</div>
                  <div>
                    <img onClick={(event)=> navigate(`/updateTask/${props.task.TaskId}`)} className="resize-img" src={Edit}></img>
                    <img onClick={deleteHandler} className="resize-img" src={Del}></img>
                  </div>
                </div>
                <div className="description">
                 { props.task.description}
                </div>
              </div>
        </div>
       );
}

export default DisplayTask;