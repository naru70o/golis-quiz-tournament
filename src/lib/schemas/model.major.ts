import mongoose from "mongoose";

const majorSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
})

 const Major = mongoose.models.Major || mongoose.model("Major", majorSchema);

 export default Major;