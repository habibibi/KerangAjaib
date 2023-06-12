const mongoose = require('mongoose');
const { insertSession, updateSession, getAllSessions } = require('../services/sessionDB.service');
const { getMessagesBySessionID } = require('../services/messageDB.service');

async function newSessionAPI(req, res) {
  const name = req.body.name;
  try{
    const newSession = await insertSession(name);
    return res.send({ sessionID : newSession._id.toString() });
  } catch(err) {
    console.log(err.message);
    return res.status(500).send("Error creating new session");
  }
}

async function fetchSessionMsgAPI(req, res) {
  try{
    const sessions = await getAllSessions();
    aggregatedData = [];
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i].toObject();
      const sessionID = session._id.toString();
      messages = await getMessagesBySessionID(sessionID);
      const sessionData = {
        ...session,
        messages: messages
      };
      aggregatedData.push(sessionData);
    }
    return res.send(JSON.stringify(aggregatedData));
  }catch(err){
    console.log(err.message);
    return res.status(500).send("Error fetching session messages");
  }
}

async function updateSessionNameAPI(req, res) {
  const newName = req.body.newName;
  try{
    await updateSession(req.params.sessionID, newName);
    return res.send("success");
  }catch(err){
    console.log(err.message);
    return res.status(500).send("Error updating session name");
  }
}

module.exports = {
  newSessionAPI,
  fetchSessionMsgAPI,
  updateSessionNameAPI
};