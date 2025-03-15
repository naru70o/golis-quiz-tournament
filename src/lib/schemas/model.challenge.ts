import mongoose, {Schema} from 'mongoose';

export const ChallengeSchema = new Schema({
  challenge: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Challenge =
  mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema);
export default Challenge;