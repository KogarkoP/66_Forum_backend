import express from "express";
import {
  GET_ALL_QUESTIONS,
  INSERT_QUESTION,
  DELETE_QUESTION_BY_ID,
} from "../controllers/questions.js";
// import auth from "../middlewares/auth.js";
import validate from "../middlewares/validation.js";
import questionSchema from "../schemas/question.js";

const router = express.Router();

router.get("/", GET_ALL_QUESTIONS);
router.post("/", validate(questionSchema), INSERT_QUESTION);
router.delete("/:id", DELETE_QUESTION_BY_ID);

export default router;
