import React, { useState } from "react";
import axios from "axios"

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [massage, setMassage] = useState(false);
  const [errorMassage, setErrorMassage] = useState(false);
  const add = ()=>{

      console.log({
        firstName,lastName,age,country,email,password
      })
      axios.post("http://localhost:5000/users",{
        firstName,lastName,age,country,email,password
      }).then(result=>{
              if ( result.status ==201  ){
                setMassage(true)
                setErrorMassage(false)


              }else{
                setErrorMassage(true)
              }

      })}

  return (
    <div className="Register">
      <p>Register:</p>
      <div className="RegisterInput">
        <input
          type="text"
          placeholder="First Name "
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div  className="RegisterButton">
          <button onClick={add}>Register</button>
      </div>
      <div >{massage  ?  <p className="created">The user has been created successfully</p> : "" }</div>
      <div >{errorMassage  ?  <p className = "errCreated">Error happened while register, please try again </p> : "" }</div>
    </div>
  );
}