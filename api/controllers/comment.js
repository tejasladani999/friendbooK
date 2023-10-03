import { db } from "../connect.js"
// import { jwt }from "jsonwebtoken";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req,res) => {

    const q = `SELECT c.*,u.UserID,Name,ProfilePhoto FROM comments AS c JOIN users AS u ON (u.UserID = c.UserID) WHERE c.PostID = ? ORDER BY c.CreateAT DESC`;

    db.query(q, [req.query.PostID], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

// add new comment

export const addComment =(req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");

    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments (`CommentDesc`,`CreateAT`,`UserID`,`PostID`) Values (?)";

    const values = [
        req.body.CommentDesc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.PostID
      ];

    db.query(q, [values],(err,data) =>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Comment has been Created.");
    });
    });
};

// delete post

export const deleteComment =(req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");

    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "Delete FROM comments WHERE `UserID` = ? AND `CommentID` = ?";


    db.query(q, [userInfo.id,req.params.CommentID],(err,data) =>{
        if(err) return res.status(500).json(err);
        if(data.affectedRows > 0) return res.json("Post has been deleted!");
        return res.status(403).json("you Can delete only your Post");
    
    });
    });
};

