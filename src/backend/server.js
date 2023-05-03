const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const sessionRoute = require('./routes/session.route');
const queryRoute = require('./routes/query.route');
const qnaRoute = require('./routes/qna.route');

// Define the app
const app = express();

// Use body parser to parse JSON requests
app.use(bodyParser.json());

// Add routes
app.use(sessionRoute);
app.use(queryRoute);
app.use(qnaRoute);

// Sync the models to the database
sequelize.sync().then(() => {
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to sync models to the database:', err);
});
