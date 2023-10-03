import React from 'react'
import "./forgot.scss"
import { AuthContext } from "../../context/authContext";
import { useContext,useState } from "react";
import axios from 'axios';


export const forgot = () => {


  const handlesubmit = (e) =>{
        e.preventDefault();

        const data ={
          UserName:this.UserName
        };
        
        axios.post('forgot',data).then(
          res => {
            console.log(res)
          }
        ).catch(
          err => {
            console.log(err);
          }
          )
    }
    
  return (
    <div className="forgot">
      <div className="card">
          <div className="right">
          <h1>Forgot Password</h1>
          <form action="">
            <input type="text" name="UserName"  placeholder="UserName"/>
            <button onClick={handlesubmit}>Submit</button>
          </form>
          </div>
        </div>
    </div>
  )
}
export default forgot