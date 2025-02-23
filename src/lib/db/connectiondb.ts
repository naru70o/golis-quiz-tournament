import mongoose from "mongoose";

const connectiondb= async ()=>{
    const MONGO_URI = process.env.MONGO_URI;
    try {
        await mongoose.connect(MONGO_URI!);
        console.log("connected to db");
    } catch (error) {
        console.log(error);
        console.log("error connecting to db")
    }
}

export default connectiondb;