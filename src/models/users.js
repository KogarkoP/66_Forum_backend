import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    terms_privacy: { type: Boolean, required: true },
    liked_answers_id: { type: [String], default: [] },
    disliked_answers_id: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
