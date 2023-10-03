import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext,useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

   const { toggle,darkMode } = useContext(DarkModeContext);
   const { currentUser,logout } = useContext(AuthContext);
   const [ err, setErr] = useState(null);
   const navigate = useNavigate();

   const handleLogout = async (e) =>{
    e.preventDefault()
    try
    {
      await logout();
      navigate("/login")
    }
    catch (err)
    {
      setErr(err.response.data);
    }
  };
 
  return (
    <div className="navbar">
        <div className="left">
        <a href="/" style={{textDecoration:"none" , backgroundcolor:"white"}}>
            <span class="friend">friend</span><span class="book">booK</span>
        </a>
        <Link to="/">
            <HomeOutlinedIcon/>
          </Link>
        {darkMode ? <DarkModeOutlinedIcon onClick={toggle}/> : <WbSunnyOutlinedIcon onClick={toggle} />}
        {/* <GridViewOutlinedIcon/> */}
        <div className="search">
            <SearchOutlinedIcon/>
            <input type="text" placeholder="search..." />
        </div>
        </div>
        <div className="right">
            {/* <PersonOutlinedIcon/> */}
            <EmailOutlinedIcon/>
            {/* <NotificationsOutlined/> */}
            <div className="user">
                <img src={"/upload/"+currentUser.ProfilePhoto} alt="" />
                <span>{currentUser.UserName}</span>
            </div>
          <LogoutIcon onClick={handleLogout} />
        </div>
    </div>
  );
};

export default Navbar

