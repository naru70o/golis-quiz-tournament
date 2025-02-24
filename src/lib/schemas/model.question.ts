import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Number, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
