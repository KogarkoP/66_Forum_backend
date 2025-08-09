import express from "express";
import {
  DELETE_ANSWER_BY_ID,
  UPDATE_ANSWER_BY_ID,
} from "../controllers/answers.js";

const router = express.Router();

router.put("/answer/:id", UPDATE_ANSWER_BY_ID);
router.delete("/answer/:id", DELETE_ANSWER_BY_ID);

export default router;
