import Joi from "joi";

const answerSchema = Joi.object({
  answer_text: Joi.string().required(),
  question_id: Joi.string().required(),
});

export default answerSchema;
