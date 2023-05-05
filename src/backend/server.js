const express = require('express');
const app = express();
const mongoose = require('mongoose');
const qnaRoute = require('./routes/qna.route');
const queryRoute = require('./routes/query.route');
const sessionRoute = require('./routes/session.route');
const qnaManager = require('./manager/qna.manager');
const queryManager = require('./manager/query.manager');
const sessionManager = require('./manager/session.manager');
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://13521118:tubes3_stima@cluster.xmrhgcp.mongodb.net/tubes3_stima?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');

  app.use(express.json());
  app.use('/api', qnaRoute);
  app.use('/api', queryRoute);
  app.use('/api', sessionRoute);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    qnaManager.deleteAllQnA();
  });
});

const qnaData = {
  question: "What is the capital of France Now",
  answer: "Paris Ala"
};

const queryData = {
  input: "Apa aja deh?2",
  output: "Woke2",
  sessionID: 2
};

const sessionData = {
  id: 1,
  name: "Session 1"
};