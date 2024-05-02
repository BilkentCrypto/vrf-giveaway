import mongoose, { Schema, model } from 'mongoose';

const participantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    emailHash: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
let Participant;
if(mongoose.models.Participant) Participant = mongoose.models.Participant;
else Participant = model('Participant', participantSchema);

export default Participant;
