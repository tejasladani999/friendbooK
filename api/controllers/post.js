import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts =(req,res) => {

    const UserID = req.query.UserID; //req are not able to featch query.UserID 

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");


    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");


    const q = UserID !== "undefined" 
    ? `SELECT p.*,u.UserID,Name,ProfilePhoto FROM posts AS p JOIN users AS u ON (u.UserID = p.UserID) WHERE p.UserID = ? ORDER BY p.CreatAT DESC` 
    : `SELECT p.*,u.UserID,Name,ProfilePhoto FROM posts AS p JOIN users AS u ON (u.UserID = p.UserID) LEFT JOIN friends AS f ON (p.UserID = f.FollowedUserID) WHERE f.FollowerUserID = ? OR p.UserID = ? ORDER BY p.CreatAT DESC`;

    const values = UserID !== "undefined" ? [UserID] : [ userInfo.id,userInfo.id];

    db.query(q, values, (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
  });
};

// adding new Post

export const addPost =(req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");

    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO posts(`PostDesc`,`Image`,`CreatAT`,`UserID`) Values (?)";

    const values = [
        req.body.PostDesc,
        req.body.Image,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
      ];

    db.query(q, [values],(err,data) =>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post has been Created.");
    });
    });
};

// delete post

export const deletePost =(req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");

    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "Delete FROM posts WHERE `UserID` = ? AND `PostID` = ?";


    db.query(q, [userInfo.id,req.params.PostID],(err,data) =>{
        if(err) return res.status(500).json(err);
        if(data.affectedRows > 0) return res.json("Post has been deleted!");
        return res.status(403).json("you Can delete only your Post");
    
    });
    });
};
