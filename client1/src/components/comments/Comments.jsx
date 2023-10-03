import { useContext, useState } from "react";
import "./comments.scss"
import { AuthContext } from "../../context/authContext";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const Comments = ({PostID,CommentID}) => {
  
    const [menuOpen, setMenuOpen] = useState(false)
    const [CommentDesc,setDesc] = useState("")
    const {currentUser} = useContext(AuthContext);

    //featch comments data
    const { isLoading, error, data } = useQuery(['comments'], () =>
           makeRequest.get("/comments?PostID="+ PostID).then((res) => {
            return res.data;
           })   
    );

    const queryClient = useQueryClient();
    
    // add new comment data
    const mutation = useMutation(
        (newComment) => {
          return makeRequest.post("/comments", newComment);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["comments"]);
          },
        }
      );
    
      const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ CommentDesc,PostID });
        setDesc("");
      };

      //delete comment 
      const deletemutation = useMutation(
        (id) => {
          return makeRequest.delete("/comments/"+ id)
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["comments"]);
          },
        }
      );

      const handleDelete = () => {
        deletemutation.mutate(CommentID);
      };
    
    return (
        <div className="comments">
            <div className="write">
                <img src={"/upload/"+currentUser.ProfilePhoto} alt="" />
                <input type="text" placeholder="write a comment" value={CommentDesc} onChange={(e) => setDesc(e.target.value)} />
                <button onClick={handleClick}>send</button>
            </div>
            { isLoading ? "loading" :
            data.map((comment) => (
                <div className="comment">
                    <img src={"/upload/"+comment.ProfilePhoto} alt="" />
                    <div className="info">
                        <span>{comment.Name}</span>
                        <p>{comment.CommentDesc}</p>
                    </div>
                    <span className="date">{moment(comment.CreateAT).fromNow()}</span>
                    <MoreHorizIcon onClick={()=> setMenuOpen(!menuOpen)}/>
                    {(menuOpen && comment.UserID === currentUser.UserID) && <button onClick={handleDelete}>delete</button>}
                </div>
            ))
        }
        </div>
        );
};
export default Comments