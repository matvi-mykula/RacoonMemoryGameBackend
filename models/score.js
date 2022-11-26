const mongoose = require('mongoose');
// const { DateTime } = require('luxon');

const Schema = mongoose.Schema;
const HighScoreSchema = new Schema({
  name: { type: String, maxLength: 100 },
  //   date: { type: Date },
  score: { type: Number },
  time: { type: Number },
});

//can create a virtual for date_formatted and for url

module.exports = mongoose.model('HighScore', HighScoreSchema);
