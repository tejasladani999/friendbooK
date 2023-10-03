import { useState } from "react";
import "./update.scss"
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Update = ({setOpenUpdate, user}) => {
    
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState ({
        
        Name:user.Name,
        City:user.City,
        Country:user.Country,
    });

    const upload = async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };
    

    const handleChange = (e) => {
        setTexts((prev) => ({...prev, [e.target.name]:[e.target.value]}));
    };  

    const queryClient = useQueryClient();

    const mutation = useMutation(
      (user) => {
        return makeRequest.put("/users",user );
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["user"]);
        },
      }
    );
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let coverUrl;
      let profileUrl;
        
      coverUrl = cover ? await upload(cover) : user.CoverPhoto;
      profileUrl = profile ? await upload(profile) : user.ProfilePhoto;

      mutation.mutate({ ...texts, CoverPhoto:coverUrl, ProfilePhoto:profileUrl});
      setOpenUpdate(false);
      setCover(null);
      setProfile(null);
    };
  
    
    return (
        <div className="update">
          <div className="card">
          <button className="button" onClick={()=>setOpenUpdate(false)}>Close</button><br/>
            <h1>Profile Update</h1>
            <form>
            Update CoverPhoto :    <input type="file" onChange={e=>setCover(e.target.files[0])} /> <br/>
            Update ProfilePhoto :    <input type="file" onChange={e=>setProfile(e.target.files[0])}/> <br/>
            Name :    <input type="text" name="Name" onChange={handleChange} /> <br/>
            City :    <input type="text" name="City" onChange={handleChange} /> <br/>
            Country :    <input type="text" name="Country" onChange={handleChange} /> <br/>
                <button onClick={handleSubmit}>Update</button>
            </form>
          </div>
        </div>
    )
}

export default Update;
