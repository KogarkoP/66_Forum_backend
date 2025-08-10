import express from "express";
import {
  INSERT_ANSWER,
  DELETE_ANSWER_BY_ID,
  UPDATE_ANSWER_BY_ID,
  GET_ANSWERS_BY_QUESTION,
} from "../controllers/answers.js";
import validate from "../middlewares/validation.js";
import auth from "../middlewares/auth.js";
import answerSchema from "../schemas/answer.js";

const router = express.Router();

router.get("/question/:id", GET_ANSWERS_BY_QUESTION);
router.post("/", validate(answerSchema), auth, INSERT_ANSWER);
router.put("/:id", UPDATE_ANSWER_BY_ID);
router.delete("/:id", auth, DELETE_ANSWER_BY_ID);

export default router;
