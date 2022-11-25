const express = require('express');
var cors = require('cors');

const app = express();
// const port = 3005; // this worked on my home computer
const port = process.env.PORT || 8080; //this should work on fly => vercel
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
  });
  score.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log('score saved');
  //   getHighScores();
  res.json({ message: 'success' });
});

app.get('/api/scorelist', async (req, res) => {
  return Score.find()
    .sort({ score: -1 })
    .limit(10)
    .exec(function (err, entries) {
      console.log(entries);
      return res.end(JSON.stringify(entries));
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port} i hope`);
});
