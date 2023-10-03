import express from "express";
import { getFriends,addFriend,deleteFriend } from "../controllers/friend.js";

const router = express.Router()

router.get("/",getFriends)
router.post("/",addFriend)
router.delete("/",deleteFriend)


export default router