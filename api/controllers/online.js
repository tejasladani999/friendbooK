import {db} from "../connect.js"
import jwt from "jsonwebtoken";

export const getOnlines =(req,res) => {
    
    const q = `SELECT * FROM users order by RAND() limit 10`;
    
    db.query(q, (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}