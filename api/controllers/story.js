// import {db} from "../connect.js"
// import jwt from "jsonwebtoken";
// import moment from "moment";

// export const getStorys =(req,res) => {

//     const UserID = req.query.UserID; //req are not able to featch query.UserID 

//     const token = req.cookies.accessToken;
//     if(!token) return res.status(401).json("Not logged In!");


//     jwt.verify(token, "secretkey", (err,userInfo) => {
//         if(err) return res.status(403).json("Token is not valid!");

//         console.log(req.query.UserID)

//     const q = UserID !== "undefined" 
//     ? `SELECT p.*,u.UserID,Name,ProfilePhoto FROM story AS p JOIN users AS u ON (u.UserID = p.UserID) WHERE p.UserID = ? ORDER BY p.CreatAT DESC` 
//     : `SELECT p.*,u.UserID,Name,ProfilePhoto FROM story AS p JOIN users AS u ON (u.UserID = p.UserID) LEFT JOIN friends AS f ON (p.UserID = f.FollowedUserID) WHERE f.FollowerUserID = ? OR p.UserID = ? ORDER BY p.CreatAT DESC`;

//     const values = UserID !== "undefined" ? [UserID] : [ userInfo.id,userInfo.id];

//     db.query(q, values, (err,data) => {
//         if(err) return res.status(500).json(err);
//         return res.status(200).json(data);
//     });
//   });
// };

// // adding new Post

// export const addStory =(req,res) => {

//     const token = req.cookies.accessToken;
//     if(!token) return res.status(401).json("Not logged In!");

//     jwt.verify(token, "secretkey", (err,userInfo) => {
//         if(err) return res.status(403).json("Token is not valid!");

//     const q = "INSERT INTO story(`Image`,`CreatAT`,`UserID`) Values (?)";

//     const values = [
//         req.body.Image,
//         moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//         userInfo.id,
//       ];

//     db.query(q, [values],(err,data) =>{
//         if(err) return res.status(500).json(err);
//         return res.status(200).json("Post has been Created.");
//     });
//     });
// };

// // delete story

// export const deleteStory =(req,res) => {

//     const token = req.cookies.accessToken;
//     if(!token) return res.status(401).json("Not logged In!");

//     jwt.verify(token, "secretkey", (err,userInfo) => {
//         if(err) return res.status(403).json("Token is not valid!");

//     const q = "Delete FROM story WHERE `UserID` = ? AND `StoryID` = ?";


//     db.query(q, [userInfo.id,req.params.PostID],(err,data) =>{
//         if(err) return res.status(500).json(err);
//         if(data.affectedRows > 0) return res.json("Post has been deleted!");
//         return res.status(403).json("you Can delete only your Post");
    
//     });
//     });
// };

import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getStorys = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //console.log(userId);

    const q = `SELECT s.*, name FROM story AS s JOIN users AS u ON (u.UserID = s.UserID)
    LEFT JOIN  friends AS r ON (s.UserID = r.followedUserID AND r.followerUserID= ?)order by  CreateAT desc LIMIT 4 `;

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO story(`Image`, `CreateAT`, `UserID`) VALUES (?)";
    const values = [
      req.body.Image,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story has been created.");
    });
  });
};

export const deleteStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM stories WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Story has been deleted.");
      return res.status(403).json("You can delete only your story!");
    });
  });
};
