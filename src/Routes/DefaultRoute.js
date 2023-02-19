import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import './DefaultRoute.css';
const DefaultRoute = () =>{
    return (
        <div className="login-register">
            <div>
                <Signin></Signin>
            </div>
            <div>
                <Signup></Signup>
            </div>
        </div>
    );
}

export default DefaultRoute;