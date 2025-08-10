import answerModel from "../models/answers.js";
import { v4 as uuidv4 } from "uuid";

export const GET_ANSWERS_BY_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;

    const answers = await answerModel.find({ question_id: questionId });

    if (answers.length === 0) {
      return res.status(404).json({
        message: `There are no answers matching question ID: ${questionId} `,
      });
    }

    res.status(200).json({
      message: "Here are your answers",
      answers: answers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const INSERT_ANSWER = async (req, res) => {
  try {
    const userId = req.user.userId;

    const answer = {
      id: uuidv4(),
      answer_text: req.body.answer_text,
      question_id: req.body.question_id,
      user_id: userId,
    };

    const addAnswer = new answerModel(answer);
    const addedAnswer = await addAnswer.save();

    return res.status(201).json({
      message: "This answer was added to archive",
      answer: addedAnswer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const UPDATE_ANSWER_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const answer = await answerModel.findOneAndUpdate(
      { id: id },
      { ...req.body },
      { new: true }
    );

    if (!answer) {
      return res.status(404).json({
        message: `Answer with ID: ${id} does not exist`,
      });
    }

    return res.status(200).json({
      message: "Answer was updated",
      answer: answer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const DELETE_ANSWER_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const answer = await answerModel.findOneAndDelete({ id: id });

    if (!answer) {
      return res.status(404).json({
        message: `Answer with ID: ${id} does not exist`,
      });
    }

    return res.status(200).json({
      message: "Answer was deleted",
      answer: answer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
