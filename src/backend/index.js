const express = require('express');
const mongoose = require('mongoose');
const queryRoute = require('./routes/query.route');
const sessionRoute = require('./routes/session.route');
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();
const cors = require('cors'); 
const path = require("path");
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors())
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  app.use('/api', queryRoute);
  app.use('/api', sessionRoute);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
console.log(path.join(__dirname,"../frontend/build"));
app.use(express.static(path.join(__dirname,"../frontend/build")));

module.exports = app;