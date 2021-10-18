const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horseSchema = new Schema(
  {

  },
  { timestamps: true }
);

module.exports = mongoose.model('Horse', horseSchema);
