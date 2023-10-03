import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req,res) => {
  
  //check user exists or not
    const q = "SELECT * FROM users WHERE UserName = ?";
    
    db.query(q, [req.body.UserName], (err,data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("user already exists!!");
      
      //cretae new user
    
      //convert password to hashcode
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.Password, salt);
      
      const q = "INSERT INTO users (`UserName`,`Email`,`Password`,`Name`) VALUE (?)";

      const values = [req.body.UserName,req.body.Email,hashedPassword,req.body.Name];
      
      db.query(q, [values], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created");
      });
    });
};

export const login = (req, res) => {

  const q = "SELECT * FROM users WHERE UserName = ?";

  db.query(q, [req.body.UserName], (err, data) => {
    if (err) return res.status(500).json(err);

    if(data.length === 0) return res.status(404).json("user not found!");

    const checkPassword = bcrypt.compareSync(req.body.Password, data[0].Password);

    if(!checkPassword) return res.status(400).json("Invalid credential!");

    const token = jwt.sign({id:data[0].UserID }, "secretkey");

    const {Password, ...others} = data[0];

    res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).json(others);
  });
};

export const logout = (req,res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json(false);
  
};