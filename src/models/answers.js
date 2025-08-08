import mongoose from "mongoose";

const answerSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    answer_text: { type: String, required: true },
    likes_count: { type: Number, required: true },
    question_id: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("answers", answerSchema);
