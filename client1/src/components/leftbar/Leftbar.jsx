import "./leftbar.scss"
import Friends from '@mui/icons-material/Diversity1Sharp';
import Market from '@mui/icons-material/StorefrontSharp';
import Memories  from '@mui/icons-material/LibraryMusicRounded';
import Events from '@mui/icons-material/CalendarMonth';
import Gaming from '@mui/icons-material/SportsEsports';
import Gallary from '@mui/icons-material/WallpaperSharp';
import Videos from '@mui/icons-material/PlayCircleSharp';
import Messages from '@mui/icons-material/WhatsApp';
import YoutubeIcon from "@mui/icons-material/YouTube";
// import Tutorials from "../../imgs/11.png"
// import Courses from "../../imgs/12.png"
// import Fund from "../../imgs/13.png"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom"

export const Leftbar = () => {

   const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftbar">
      <div className="container">
        {/* first menubar */}
        <div className="menu">
          <div className="user">
            <Link to={"/profile/"+currentUser.UserID}>
                <img src={"/upload/"+currentUser.ProfilePhoto} alt="" />
                <span>{currentUser.UserName}</span>
            </Link>
          </div>
          <div className="item">
            <Friends fontSize="large" style={{color: "blue"}}/>
            <span>Friends</span>
          </div>
          <div className="item">
          <a href="https://www.flipkart.com/">
            <Market fontSize="large" style={{color: "green"}}/></a>
            <a href="https://www.amazon.in/">
            <span>Marketplace</span></a>
          </div>
          <div className="item">
            <a href="https://www.youtube.com/">
            <YoutubeIcon fontSize="large" style={{color: "red"}}/></a>
            <span>Watch</span>
          </div>
          
          <div className="item">
          <a href="https://open.spotify.com/">
          <Memories fontSize="large" style={{color: "purple"}}/></a>
          <span>Music</span>
          </div>
        </div>
        <hr/>
        {/* second menubar */}
        <div className="menu">
            <span>Your shortcuts</span>
            <div className="item">
              <a href="https://calendar.google.com/calendar/">
              <Events fontSize="large" style={{color: "skyblue"}}/></a>
              <span>Events</span>
            </div>
            <div className="item">
              <a href="https://www.crazygames.com/">
              <Gaming fontSize="large" style={{color: "black"}} /></a>
              <span>Gaming</span>
            </div>
            <div className="item">
            <a href="">
              <Gallary fontSize="large" style={{color: "pink"}} /></a>
              <span>Gallary</span>
            </div>
            <div className="item">
              <a href="https://www.jiocinema.com/">
              <Videos fontSize="large" style={{color: "blue"}} /></a>
              <span>Videos</span>
            </div>
            <div className="item">
            <a href="https://web.whatsapp.com/">
              <Messages fontSize="large" style={{color: "green"}} /></a>
              <span>Messages</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar

