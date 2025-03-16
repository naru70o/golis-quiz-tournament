import mongoose from "mongoose";
import Question from "./model.question";

const majorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["soon", "active", "finished"],
      default: "soon",
    },
    result: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { minimize: false }
);

majorSchema.pre("findOneAndDelete", async function (next) {
  try {
    const _id = this.getQuery()._id;
    await Question.deleteMany({ majorId: _id });
    next();
  } catch (err: unknown) {
    next(); 
  }
});

 const Major = mongoose.models.Major || mongoose.model("Major", majorSchema);

 export default Major;