import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req,res) => {

  const UserID =req.params.UserID;

  const q = "SELECT * FROM users WHERE UserID =(?)"

  db.query(q,[UserID],(err,data)=>{
    if(err) return res.status(500).json(err);
    const {Password,...info } = data[0];
    return res.json(info);
});
};

export const updateUser = (req,res) => {

  const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");


    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");



  const q = "UPDATE users SET `Name`=?,`City`=?,`Country`=?,`ProfilePhoto`=?,`CoverPhoto`=? WHERE UserID =(?)";

  // const values = [];
  
  db.query(q,[req.body.Name,req.body.City,req.body.Country,req.body.ProfilePhoto,req.body.CoverPhoto,userInfo.id],(err,data)=>{
    if(err) return res.status(500).json(err);
    if(data.affectedRows > 0) return res.json("Updated!");
    return res.status(403).json("you Can update only your Profile");
});
});
};