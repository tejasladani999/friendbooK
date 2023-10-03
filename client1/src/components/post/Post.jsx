import React, { useContext, useState } from 'react'
import "./post.scss"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

export const Post = ({post}) => {
    const [commentOpen, setCommentOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const {currentUser} = useContext(AuthContext);
    
    // fetch likes
    const { isLoading, error, data } = useQuery(['likes',post.PostID], () =>
    makeRequest.get("/likes?PostID="+ post.PostID).then((res) => {
     return res.data;
    })   
);

    //feaching comment data
    const { data:cdata } = useQuery(['comments',post.PostID], () =>
    makeRequest.get("/comments?PostID="+ post.PostID).then((res) => {
      return res.data;
    })   
);

const queryClient = useQueryClient();

const mutation = useMutation(
    (liked) => {
      if(liked) return makeRequest.delete("/likes?PostID="+ post.PostID);
      return makeRequest.post("/likes", { PostID:post.PostID})
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.UserID));
  };

  const deletemutation = useMutation(
    (PostID) => {
      return makeRequest.delete("/posts/"+ PostID)
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = () => {
    deletemutation.mutate(post.PostID);
  };

    return (
        <div className="post">
            <div className="container">
            <div className="user">
                <div className="userInfo">
                    <img src={"/upload/"+post.ProfilePhoto} alt="" />
                    <div className="details">
                        <Link to={`/profile/${post.UserID}`} style={{textDecoration:"none",color:"inherit"}}>
                            <span className='name'>{post.Name}</span>
                        </Link>
                        <br/><span className='date'>{moment(post.CreatAT).fromNow()}</span>
                    </div>
                </div>
                <MoreHorizIcon onClick={()=> setMenuOpen(!menuOpen)}/>
                {(menuOpen && post.UserID === currentUser.UserID) && <button onClick={handleDelete}>delete</button>}
            </div>
            <div className="content">
                <p>{post.PostDesc}</p>
                <img src={"/upload/"+post.Image} alt="" />
            </div>
            <div className="info">
                <div className="item">
                   {isLoading ? ("loading") : data.includes((currentUser.UserID)) ? (<FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike} />) : (<FavoriteBorderOutlinedIcon onClick={handleLike} />)}
                   {data?.length}  Likes 
                </div> 
                <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                    <TextsmsOutlinedIcon/>
                    {cdata?.length} Comments 
                </div>
                <div className="item">
                    <ShareOutlinedIcon/>
                    Share  
                </div> 
            </div>
            {commentOpen && <Comments PostID ={post.PostID}/>}
            </div>
        </div>
    );
};
export default Post;
