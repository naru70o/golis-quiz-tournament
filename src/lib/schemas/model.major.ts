import mongoose from "mongoose";

const majorSchema = new mongoose.Schema({
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
});

 const Major = mongoose.models.Major || mongoose.model("Major", majorSchema);

 export default Major;