import React, { useEffect, useState } from "react";

import TaskForm from "../Components/TaskForm";
import DisplayTask from "../Components/DisplayTask";
import {useFirebase} from "../Context/Firebase";
import {onAuthStateChanged} from "firebase/auth";
import TaskHeading from "../Components/TaskHeading";
import {deleteDoc,updateDoc,query,where,getDocs,orderBy,doc,getDoc,collection,addDoc} from "firebase/firestore";
import { async } from "@firebase/util";
import Signin from "./Signin";
const UserHome = () =>{
  
   const {user} = useFirebase();
   const firebase = useFirebase();
   const {firestore} = useFirebase();
   const {TaskData} = useFirebase();
   
   useEffect(()=>{
      //  console.log(user);
   },[user])

  const [taskData,settaskData] = useState([]);
  
  const [currentData,setcurrentData] = useState([]);

   useEffect( ()=>{
     if(firebase.loginStatus){  
        setcurrentData([]);
        firebase.fetchUserData().then((Data) => {
            const newData = currentData;
            
            newData.push(Data);
        //   console.log(Data);
        //   console.log(currentData);
            setcurrentData([...currentData,Data]) });
     }
    },[user,TaskData]);

    useEffect(()=>{
        settaskData([]);
    },[currentData])

  //    useEffect(()=>{
//       if(firebase.loginStatus){
//          setcurrentData([]);
//          firebase.fetchUserData();
//          setcurrentData(TaskData);
//       } 
//    },[user,TaskData])
//     console.log("current " + currentData);

    // useEffect( ()=>{
    //     if(firebase.loginStatus){  
    //        setcurrentData([]);
    //        firebase.fetchUserData().then((Data) => {
    
    //            setcurrentData([...currentData,Data]) });
    //     }
       
    //    },[user,TaskData]);
   
  //  console.log(currentData);
    {
        if(!firebase.loginStatus){
            return <Signin></Signin>
        }
     }

    return (
    <div>
     
     <TaskForm></TaskForm>
     <TaskHeading heading="TASKS"></TaskHeading>
      {
        TaskData.map((taskDetail)=>(
            // taskDetail.map((task)=>(
            //     console.log(task),
            //     <DisplayTask key={task.TaskId} task={task}></DisplayTask>
            // ))
        //     console.log(taskDetail),
            <DisplayTask key={taskDetail.TaskId} task ={taskDetail}></DisplayTask>
          //   console.log(taskDetail)
         )
        )
     } 

    {/* {
        TaskData.map((data)=>{
            <DisplayTask key={data.TaskId} task={data}></DisplayTask>
          }
        )
    } */}
     </div>
    );
}

export default UserHome;