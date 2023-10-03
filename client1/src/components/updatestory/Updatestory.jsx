import React from 'react'
import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Updatestory = ({setOpenUpdatestory}) => {
  const [file, setFile] = useState(null);

  // add image for new story
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // adding new Story
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({Image: imgUrl });
    setOpenUpdatestory(false);
  };

  return (
    <div className="update">
          <div className="card">
          <button className="button" onClick={()=>setOpenUpdatestory(false)}>Close</button><br/>
            <h1> Upload story</h1>
            <form>
            Update StoryPhoto :    <input type="file" onChange={e=>setFile(e.target.files[0])} /> <br/>
            <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
  )
}
export default Updatestory