import express from "express";

const app = express();

import authRoutes from "./routes/auth.js"
import onlinesRoutes from "./routes/onlines.js"
import userRoutes from "./routes/users.js"
import friendRoutes from "./routes/friends.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import storyRoutes from "./routes/stories.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
    

//middle wares
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json());
app.use(cors({ origin:"http://localhost:3000",}));
app.use(cookieParser());

// creating multer naming convention
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client1/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
 
  app.post("/api/upload",upload.single("file"), (req,res)=> {
    const file = req.file;
    res.status(200).json(file.filename);
  })

app.use("/api/auth",authRoutes)
app.use("/api/onlines",onlinesRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/likes",likeRoutes)
app.use("/api/Stories",storyRoutes)
app.use("/api/friends",friendRoutes);


app.listen(8800,() => {
        console.log("Api working !!!!");
        
    });
