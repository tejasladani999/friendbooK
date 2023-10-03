import {db} from "../connect.js"
import jwt from "jsonwebtoken";

export const getFriends =(req,res) => {
    
    const q = `SELECT FollowerUserID FROM friends WHERE followedUserID = (?)`;
    
    db.query(q, [req.query.FollowedUserID], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(friend => friend.FollowerUserID));
    });
}

// add friend

export const addFriend =(req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");

    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO friends (`FollowerUserID`,`FollowedUserID`) VALUES (?)";

    const values = [
        userInfo.id,
        req.body.UserID
      ];

    db.query(q, [values],(err,data) =>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Following.");
    });
    });
};

//delete like
export const deleteFriend =(req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged In!");

    jwt.verify(token, "secretkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

    const q = "Delete FROM friends WHERE `FollowerUserID` = ? AND `FollowedUserID` = ?";

    db.query(q, [userInfo.id, req.query.UserID],(err,data) =>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Unfollow.");
    });
    });
};

