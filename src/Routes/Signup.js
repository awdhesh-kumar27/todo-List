import React from "react";
import { useState } from "react";
import './Signup.css';
import { useFirebase } from "../Context/Firebase";
const Signup = () => {
   
    const  [Name, setName] = useState("");
    const  [Email, setEmail] = useState("");
    const  [Password, setPassword] = useState("");
     
    const firebase = useFirebase();
    const namehandler = (event) =>{
         const name = event.target.value;
         setName(name);
    };

    const emailhandler = (event) =>{
        const email = event.target.value;
        setEmail(email);
   };
   const passwordhandler = (event) =>{
        const password = event.target.value;
        setPassword(password);
    };

   const registerHandler = async (event) =>{
       event.preventDefault();
       console.log("Signin the user");
       await firebase.signupUserwithEmailandPassword(Email,Password,Name);
     
        firebase.addNewUser(Name,Email);

       
       console.log("Signin successful");
      setName("");
      setEmail("");
      setPassword("");
   }
   
    return (
        <div className="register-div">
            <div className="register-form">
                <form onSubmit={registerHandler}>
                    <div><h1 className="heading">Register</h1></div>
                    <div >
                    <label>Name </label>
                    <br></br>
                    <input className="input-box" type="text" name="name" value={Name} onChange = {namehandler} required placeholder="Name"></input>
                    </div>
                    <div>
                    <label>Email </label>
                    <br></br>
                    <input className="input-box" type="email"  name="email" value={Email} onChange = {emailhandler} required placeholder="Email"></input>
                    </div>
                    <div>
                    <label>Password </label>
                    <br></br>
                    <input className="input-box" type="password" name="password" value={Password} onChange={passwordhandler} required placeholder="Password" ></input>
                    </div>
                    <div>
                        <button className="submit-button" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Signup;