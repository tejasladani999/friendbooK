import "./posts.scss"
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios";

export const Posts = ({UserID}) => {

        const { isLoading, error, data } = useQuery(["posts"], () =>
           makeRequest.get("/posts?UserID="+UserID).then((res) => {
            return res.data;
           })   
    );

    // console.log("hello world!!!");
    // console.log(data);
    
  return (
        <div className="posts">
            {error ? "Somthing went wrong!" : isLoading ? "loading" : data.map((post) => 
                <Post post={post} key={post.PostID}/>
            )}
        </div>
    );
};

export default Posts