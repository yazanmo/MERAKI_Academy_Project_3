import React, { useState } from 'react';
import axios from 'axios';


export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const cheakLogin = () => {     
        const login={email:email, password:password};
         axios.post(`http://localhost:5000/login`,login)
            .then((response) => {
            { console .log(response)}
            })
            .catch((err)=>{
               console.log("error")
           })
        }
 return (
        <>
            <div className="Login">
                <input className="LoginInput" type="text" placeholder="Enter the email" onChange={(e) => {
                setEmail(e.target.value);
            }}/>
                <input className="LoginInput" type="password" placeholder="Enter the password" onChange={(e) => {
                setPassword(e.target.value);
            }}/>

                <button className="LoginButton" onClick={cheakLogin}>Login</button>
            </div>
        </>
    );
}