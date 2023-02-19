import React, { useState, useEffect } from "react";
import './UpdateTask.css';
import {useFirebase} from "../Context/Firebase";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TaskHeading from "../Components/TaskHeading";

const UpdateTask = (props) =>{

    const [oldData,setoldData] = useState(null);
    const [newData, setnewData]= useState([]);
    const params = useParams();
    console.log(params);
    const firebase = useFirebase();
     const [Title, setTitle] = useState("");
     const [Description,setDescription] = useState("");
     const navigate = useNavigate();
  
    useEffect(()=>{
         firebase.getTaskById(params.taskId).then((value)=> setoldData(value.data()));
        
    },[]);
   


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
        await firebase.updateTaskById(params.taskId,Title,Description);
        const updatedData = oldData;
        updatedData.title = Title;
        updatedData.description = Description;
        setoldData(updatedData);
        setTitle("");
        setDescription("");
        
        firebase.setTaskData([]);
        navigate("/UserHome");
        console.log("Task successfully updated");
    }
    return (
        <div >
            <TaskHeading heading="UPDATE TASK"></TaskHeading>
            <form className="task-form" onSubmit={taskHandler}>
               <div>
                  <label>Title</label>
                  <br></br>
                  <input className="input-title" type="text" name="title" value={Title} onChange={titlehandler} maxLength="20" placeholder={oldData ? oldData.title : "Enter new Title"} required></input>
               </div>
               <div>
                  <label>Description</label>
                  <br></br>
                  <textarea className="input-des" type="text" name="description" value={Description} onChange={descriptionHandler} maxLength ="150" placeholder={oldData ? oldData.description : "Enter new Description"} required></textarea>
               </div>
              <div>
                <button className="submit-btn" type="submit">Update Task</button>
              </div>
            </form>
        </div>
    );
}

export default UpdateTask;