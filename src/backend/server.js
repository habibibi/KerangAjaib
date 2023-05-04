const express = require('express');
const app = express();
const mongoose = require('mongoose');
const qnaRoute = require('./routes/qna.route');
const queryRoute = require('./routes/query.route');
const sessionRoute = require('./routes/session.route');
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://13521118:tubes3_stima@cluster.xmrhgcp.mongodb.net/tubes3_stima?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to MongoDB Atlas'));

app.use(express.json());
app.use('/api', qnaRoute);
app.use('/api', queryRoute);
app.use('/api', sessionRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const qnaData = {
  question: "What is the capital of France?",
  answer: "Paris"
};

axios.post('http://localhost:3000/api/qna', qnaData)
  .then(response => {
    console.log("QnA data inserted");
  })
  .catch(error => {
    console.error(error);
  });

const queryData = {
  input: "What is the capital of France?",
  output: "Paris",
  sessionID: 1
};

axios.post('http://localhost:3000/api/query', queryData)
  .then(response => {
    console.log("Query data inserted");
  })
  .catch(error => {
    console.error(error);
  });

const sessionData = {
  id: 1,
  name: "Session 1"
};

axios.post('http://localhost:3000/api/session', sessionData)
  .then(response => {
    console.log("Session data inserted");
  })
  .catch(error => {
    console.error(error);
  });
