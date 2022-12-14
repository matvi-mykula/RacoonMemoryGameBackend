const express = require('express');
var cors = require('cors');

const app = express();
// const port = 3005; // this worked on my home computer
const port = 8080; //this should work on fly => vercel
app.use(cors());
app.use(express.json());

// Import the mongoose module
const mongoose = require('mongoose');
const Score = require('./models/score');

// Set up default mongoose connection
const mongoDB =
  'mongodb+srv://matvi_mykula:this1works@cluster0.o1l2bk9.mongodb.net/MemoryGame?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/api/highscores', (req, res) => {
  console.log(req.body);
  //   res.send('Hello World!');
  const score = new Score({
    score: req.body.aScore,
    name: req.body.aName,
    time: req.body.aTime,
    date: req.body.aDate,
    userIP: req.body.userIP,
  });
  score.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  //   getHighScores();
  res.json({ message: req.body });
  console.log('score saved');
});

app.get('/api/scorelist', async (req, res) => {
  console.log('top ten');
  return Score.find()
    .sort({ score: -1, time: 1 })
    .limit(10)
    .exec(function (err, entries) {
      console.log(entries);
      return res.end(JSON.stringify(entries));
    });
});

// get scores and date
app.get('/api/statistics', async (req, res) => {
  console.log('stats');
  return Score.find()
    .sort({ score: -1 })
    .exec(function (err, entries) {
      return res.end(JSON.stringify(entries));
    });
});

app.listen(port, () => {
  console.log(`Memory app listening on port ${port} i think`);
});
