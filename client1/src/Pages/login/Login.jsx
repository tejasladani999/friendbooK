import "./login.scss"
import { useContext,useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import forgot from "../forgot/Forgot";


export const Login = () => {

  const [ inputs, setInputs] = useState({
    UserName:"",
    Password:"",
  });

  const [ err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value }));
  };

  const {login} = useContext(AuthContext);

  const handleLogin = async (e) =>{
    e.preventDefault()
    try
    {
      await login(inputs);
      navigate("/")
    }
    catch (err)
    {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>Welcome to our Social Media App called FriendBook</p>
          <span>Don't you have an Account? Click on Register Now</span>
          
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input type="text" name="UserName" onChange={handleChange} placeholder="UserName"/>
            <input type="password" name="Password" placeholder="Password" onChange={handleChange} />
            {err && err}
            {/* <Link to={"/forgot"}>
            <span>forgot password ?</span>
            </Link> */}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login