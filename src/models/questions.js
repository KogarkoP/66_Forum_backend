import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    question_text: { type: String, required: true },
    user_id: { type: String, required: true },
    answers_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("questions", questionSchema);
