import express from "express";
import { getStorys,addStory,deleteStory } from "../controllers/story.js";

const router = express.Router()

router.get("/", getStorys)
router.post("/",addStory)
router.delete("/:StoryID",deleteStory)


export default router