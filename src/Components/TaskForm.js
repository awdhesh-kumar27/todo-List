import React, { useState, useEffect } from "react";
import './TaskForm.css';
import {useFirebase} from "../Context/Firebase";
import { useNavigate } from "react-router-dom";
const TaskForm = () =>{

    const firebase = useFirebase();
     const [Title, setTitle] = useState("");
     const [Description,setDescription] = useState("");
     const navigate = useNavigate();

     const titlehandler = (event) =>{
          const title= event.target.value;
          setTitle(title);
     }

     const descriptionHandler = (event) =>{
         const description = event.target.value;
         setDescription(description);
     }

    //  useEffect(()=>{
        
    //      //  navigate(`/UserHome/${firebase.user.uid}`);
    //        navigate("/UserHome");
        
    //   },[]);
      

    const taskHandler = async (event)=>{
           event.preventDefault();
           await firebase.addUserTask(Title,Description);
           setTitle("");
           setDescription("");
           firebase.setTaskData([]);
           navigate("/UserHome");
           console.log("Task successfully added");
    }
    return (
        <div >
            <form className="task-form" onSubmit={taskHandler}>
               <div>
                  <label>Title</label>
                  <br></br>
                  <input className="input-title" type="text" name="title" value={Title} onChange={titlehandler} maxLength="20" placeholder="Add Title of max-length 20 characters" required></input>
               </div>
               <div>
                  <label>Description</label>
                  <br></br>
                  <textarea className="input-des" type="text" name="description" value={Description} onChange={descriptionHandler} maxLength ="150" placeholder="Add Description of max-length 150 characters" required></textarea>
               </div>
              <div>
                <button className="submit-btn" type="submit">Add Task</button>
              </div>
            </form>
        </div>
    );
}

export default TaskForm;