import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom";
import Signin from './Routes/Signin';
import Signup from './Routes/Signup';
import Navbar from './Routes/NavigationBar';
import UserHome from './Routes/UserHome';
import DisplayTask from './Components/DisplayTask';
import { useFirebase } from './Context/Firebase';
import {onAuthStateChanged} from "firebase/auth";
import UpdateTask from './Routes/UpdateTask';
import NoRoute from './Routes/NoRoute';
import Welcome from './Components/Welcome';
function App() {
  const firebase = useFirebase();
  useEffect(()=>{
    onAuthStateChanged(firebase.firebaseAuth,(user)=>{
       if(firebase.user){
           firebase.setUser(user);
       }else{
           firebase.setUser(null);
       }
    });
    console.log("executed");
 },[]);

  return (
     <div>
      <Navbar></Navbar>
      <Welcome></Welcome>
      {/* <DisplayTask></DisplayTask> */}
      <Routes>
      <Route path ='/UserHome' element={<UserHome></UserHome>}></Route>
      <Route path='/updateTask/:taskId' element={<UpdateTask></UpdateTask>}></Route>
        {/* <Route path ='/UserHome' element={<UserHome></UserHome>}></Route> */}
        <Route path='/SignIn' element={<Signin></Signin>}></Route>
        <Route path='/SignUp' element={<Signup></Signup>}></Route>
        <Route path='/' element={<Signin></Signin>}></Route>
        <Route paht='*' element={<NoRoute></NoRoute>}></Route>
      </Routes>
     </div>
  );
}

export default App;
