import {db} from "../connect.js"
import jwt from "jsonwebtoken";

export const getLikes =(req,res) => {
    
    const q = `SELECT UserID FROM Likes WHERE PostID = (?)`;
    
    db.query(q, [req.query.PostID], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.UserID));
    });
}

// add like

export const addLike =(req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");

    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO likes (`UserID`,`PostID`) VALUES (?)";

    const values = [
        userInfo.id,
        req.body.PostID
      ];

    db.query(q, [values],(err,data) =>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post has been liked.");
    });
    });
};

//delete like
export const deleteLike =(req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");

    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "Delete FROM likes WHERE `UserID` = ? AND `PostID` = ?";

    db.query(q, [userInfo.id, req.query.PostID],(err,data) =>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post liked deleted.");
    });
    });
};

