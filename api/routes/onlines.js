import express from "express";
import { getOnlines} from "../controllers/online.js";

const router = express.Router()

router.get("/",getOnlines)


export default router