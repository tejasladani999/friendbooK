import "./profile.scss"
import Update from "../../components/update/Update";
// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import PinterestIcon from "@mui/icons-material/Pinterest";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts  from "../../components/posts/Posts"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

export const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const UserID = parseInt(useLocation().pathname.split("/")[2]); 
   //fetching user
  const { isLoading, error, data } = useQuery(['user'], () =>
  makeRequest.get("/users/find/" + UserID).then((res) => {
   return res.data;
  })   
);
 //fetching friends
const { isLoading:fIsLoading ,data:friendData } = useQuery(['friend'], () =>
makeRequest.get("friends?FollowedUserID=" + UserID).then((res) => {
 return res.data;
})   
);

const queryClient = useQueryClient();

const mutation = useMutation(
  (following) => {
    if(following) return makeRequest.delete("/friends?UserID="+ UserID);
    return makeRequest.post("/friends", { UserID })
  },
  {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["friend"]);
    },
  }
);

const handleFollow = () => {
  mutation.mutate(friendData.includes(currentUser.UserID));
};

  console.log(friendData);

  return (
    <div className="profile">
      {isLoading ? ("loading") : (<>
      <div className="images">
        <img src={"/upload/"+data.CoverPhoto} alt="" className="cover" />
        <img src={"/upload/"+data.ProfilePhoto} alt="" className="profile" />
      </div>
      <div className="profilecontainer">
        <div className="userinfo">
          <div className="left">
            {/* <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://instagram.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://linkedin.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://pinterest.com">
              <PinterestIcon fontSize="large" />
            </a> */}
          </div>
          <div className="center">
            <span>{data.UserName}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon/>
                <span>{data.City}</span>
              </div>
              <div className="item">
              <LanguageIcon/>
                <span>{data.Country}</span>
              </div>
            </div>
            {fIsLoading ? ("loading") : UserID === currentUser.UserID ? (<button onClick={() => setOpenUpdate(true)}> update</button>) : (<button onClick={handleFollow}>{friendData.includes((currentUser.UserID))? "Following" : "Follow"}</button>)}
          </div>
          <div className="right">
          <a href="mailto:" >
          <EmailOutlinedIcon/></a>
          <MoreVertIcon/> 
          </div>
        </div>
        <Posts UserID = {UserID} />
      </div>  </>)}
      {openUpdate && <Update setOpenUpdate = {setOpenUpdate} user={data} /> }
    </div>
  );
};

export default Profile
