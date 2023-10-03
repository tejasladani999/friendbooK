import "./register.scss"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  
  const [ inputs, setInputs] = useState({
    UserName:"",
    Email:"",
    Password:"",
    Name:"",
  });

  const [ err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault()

    try
    {
      await axios.post("http://localhost:8800/api/auth/register", inputs)
    }
    catch(err)
    {
      setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">

      <div className="left">
          <h1>Friend Book</h1>
          <p>Welcome to our Social Media App called FriendBook</p>
          <span>Do you have an Account? Click on Login Now</span>
          {/* <a href="/login">
          <button>Login</button>
          </a> */}
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form action="">
            <input type="text" placeholder="UserName" name="UserName" onChange={handleChange}/>
            <input type="text" placeholder="Name" name="Name" onChange={handleChange}/>
            <input type="Email" placeholder="Email" name="Email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="Password" onChange={handleChange} />

            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
        
      </div>
    </div>
  )
}

export default Register
