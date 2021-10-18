const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jockeySchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  reservation: [
    {
      horseId: {
          type: Schema.Types.ObjectId,
          ref: 'Horse'
        },
      date: { type: Date, required: true }
    }
  ]
});

module.exports = mongoose.model('Jockey', jockeySchema);
