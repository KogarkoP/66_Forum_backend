import answerModel from "../models/answer.js";

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
        messgage: `Answer with ID: ${id} does not exist`,
      });
    }

    return res.status(200).json({
      messgage: "Answer was updated",
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
