import mongoose from "mongoose";

const connectiondb = async () => {
  try {
    const mongoUri = process.env.TEST_DB;
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectiondb;