import { v4 as uuidv4 } from "uuid";
import questionModel from "../models/questions.js";
import answerModel from "../models/answers.js";

export const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await questionModel.find();

    res.status(200).json({
      message: "Here are your questions",
      questions: questions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const question = await questionModel.findOne({ id: id });

    if (!question) {
      return res.status(404).json({
        message: "Question does not exist",
      });
    }

    return res.status(200).json({
      message: "Here is your question",
      question: question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const INSERT_QUESTION = async (req, res) => {
  try {
    const userId = req.user.userId;

    const question = {
      id: uuidv4(),
      title: req.body.title,
      question_text: req.body.question_text,
      user_id: userId,
    };

    const addQuestion = new questionModel(question);
    const addedQuestion = await addQuestion.save();

    return res.status(201).json({
      message: "This question was added to archive",
      question: addedQuestion,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await questionModel.findOneAndDelete({ id: id });

    if (!question) {
      return res.status(404).json({
        message: `Question with ID: ${id} does not exist`,
      });
    }

    const answers = await answerModel.deleteMany({ question_id: id });

    return res.status(200).json({
      message: "Question and its answers were deleted.",
      question: question,
      answers: answers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
