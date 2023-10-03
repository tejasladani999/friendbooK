// import {React,useContext} from 'react'
// import "./stories.scss"
import Updatestory from "../updatestory/Updatestory";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdatestory, setOpenUpdatestory] = useState(false);

//fetch story from database
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  //TODO Add story using react-query mutations and use upload function.

  return (
    <div className="stories">
      <div className="story">
        <img id="profile" src={"/upload/" + currentUser.ProfilePhoto} alt="" />
        <span>{currentUser.Name}</span>
        <button onClick={() => setOpenUpdatestory(true)} >+</button> 
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((story) => (
            <div className="story" key={story.id}>
              <img src={"/upload/"+ story.Image} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
      {openUpdatestory && <Updatestory setOpenUpdatestory = {setOpenUpdatestory}  /> }
    </div>
  );
};

export default Stories;
