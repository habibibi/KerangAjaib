const express = require('express');
const mongoose = require('mongoose');
const qnaRoute = require('./routes/qna.route');
const messageRoute = require('./routes/message.route');
const sessionRoute = require('./routes/session.route');
const { insertSession, getLastInsertSessionID, updateSessionName } = require('./manager/session.manager');
const { insertMessage } = require('./manager/message.manager');
const queryHandler = require('../algorithm/Main')
const bodyParser = require('body-parser')
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://13521118:tubes3_stima@cluster.xmrhgcp.mongodb.net/tubes3_stima?retryWrites=true&w=majority";

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
  app.use('/api/db', qnaRoute);
  app.use('/api/db', messageRoute);
  app.use('/api/db', sessionRoute);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

app.post('/session', async (req, res) => {
  const name = req.body.name;
  console.log("going to insert session");
  await insertSession({ name : name });
  console.log("insert session success");
  let id = await getLastInsertSessionID();
  console.log(id);
  return res.send({ sessionID : id });
});

app.get('/session', async (req, res) => {
  let aa = await db.collection('session').aggregate([
    { $lookup:
        {
          from: 'message',
          localField: '_id',
          foreignField: 'sessionID',
          as: 'message'
        }
      }
    ]).toArray();
  return res.send(JSON.stringify(aa));
});

app.get('/test', async (req, res) => {
  insertMessage({ sessionID: "64551e4e1ea454a3a188e107", text : "test", sender : "user" });
  return res.send("success");
});

app.put('/session/:sessionID', async (req, res) => {
  const newName = req.body.newName;
  console.log(req.body.newName, req.params.sessionID);
  await updateSessionName(req.params.sessionID, newName);
  return res.send("success");
});

app.post('/query', async (req, res) => {
  const query = req.body.query;
  const sessionID = req.body.sessionID;
  const algo = req.body.algo;
  console.log(req.body);
  const result = await queryHandler(sessionID, query , algo);
  return res.send({answer : result});
});