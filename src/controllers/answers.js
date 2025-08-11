import answerModel from "../models/answers.js";
import questionModel from "../models/questions.js";
import { v4 as uuidv4 } from "uuid";

export const GET_ANSWERS_BY_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;

    const answers = await answerModel.find({ question_id: questionId });

    // if (answers.length === 0) {
    //   return res.status(404).json({
    //     message: `There are no answers matching question ID: ${questionId} `,
    //   });
    // }

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
    const questionId = req.body.question_id;

    const answer = {
      id: uuidv4(),
      answer_text: req.body.answer_text,
      question_id: questionId,
      user_id: userId,
    };

    const question = await questionModel.findOneAndUpdate(
      { id: questionId },
      { $inc: { answers_count: 1 } },
      { new: true }
    );

    const addAnswer = new answerModel(answer);
    const addedAnswer = await addAnswer.save();

    return res.status(201).json({
      message: "This answer was added to archive",
      answer: addedAnswer,
      updated_question: question,
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

    const questionId = answer.question_id;
    const question = await questionModel.findOneAndUpdate(
      { id: questionId },
      { $inc: { answers_count: -1 } },
      { new: true }
    );

    return res.status(200).json({
      message: "Answer was deleted",
      answer: answer,
      updated_question: question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
