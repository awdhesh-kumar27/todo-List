import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import './DefaultRoute.css';
const DefaultRoute = () =>{
    return (
        <div className="login-register">
         <div className="main-page">
            <div>
                <Signin></Signin>
            </div>
            <div>
                <Signup></Signup>
            </div>
         </div>
        </div>
    );
}

export default DefaultRoute;