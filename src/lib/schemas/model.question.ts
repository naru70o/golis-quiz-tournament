import mongoose, { Document, Schema, Model } from "mongoose";

// Define the shape of a single option
interface Option {
  text: string;
}

// Define the Question document interface
interface IQuestion extends Document {
  question: string;
  majorId: mongoose.Types.ObjectId;
  options: Option[];
  correctOptionIndex: number;
  totalPoints: number;
  createdAt: Date;
}

// Define the Mongoose schema
const QuestionSchema: Schema<IQuestion> = new Schema({
  question: {
    type: String,
    required: true,
  },
  majorId: {
    type: Schema.Types.ObjectId,
    ref: "Major",
    required: true,
  },
  options: [
    {
      text: { type: String, required: true },
    },
  ],
  correctOptionIndex: {
    type: Number,
    required: true,
    validate: {
      validator: function (this: IQuestion, index: number) {
        return this.options && index >= 0 && index < this.options.length;
      },
      message: "Invalid correct option index",
    },
  },
  totalPoints: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Mongoose model with TypeScript
const Question: Model<IQuestion> = mongoose.model<IQuestion>(
  "Question",
  QuestionSchema
);

export default Question;
