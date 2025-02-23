import mongoose, { Schema } from "mongoose";

const majorSchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
})

export const Major= mongoose.models.Major || mongoose.model("Major", majorSchema);