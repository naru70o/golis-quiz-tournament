import mongoose, {Schema} from 'mongoose';

export const ChallengeSchema= new Schema({
    challenge:{
        type: String,
        required: true,
   },
   number:{
       type: Number,
       required: true,
   }
})


const Challenge =
  mongoose.models.challenge || mongoose.model("Challenge", ChallengeSchema);
export default Challenge;