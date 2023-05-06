const axios = require('axios');

async function fetchSession() {
  try {
    const response = await axios.get('http://localhost:3000/api/db/session');
    console.log("Session data fetch successful")
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("Session data fetch failed")
    return null;
  }
}

async function getLastInsertSessionID(){
  try {
    const response = await axios.get('http://localhost:3000/api/db/session/lastinsert');
    console.log(response.data[0]._id);
    return response.data[0]._id;
  } catch (error) {
    console.log("Session data fetch failed")
    return null;
  }
}

async function insertSession(sessionData) {
  try {
    const response = await axios.post('http://localhost:3000/api/db/session', sessionData);
    console.log("Session data insert successful");
  } catch (error) {
    console.log("Session data insert failed");
  }
}

async function updateSessionName(sessionID, sessionName) {
  try {
    const response = await axios.put(`http://localhost:3000/api/db/session/${sessionID}`, { name: sessionName });
    console.log("Session data update successful");
  } catch (error) {
    console.log("Session data update failed");
  }
}

async function deleteAllSession() {
  try {
    const response = await axios.delete(`http://localhost:3000/api/db/session`);
    console.log("Session data delete successful");
  } catch (error) {
    console.log("Session data delete failed")
  }
}
    
async function printSession() {
  const sessions = await fetchSession();
  console.log(sessions); // or do something else with the array
}

module.exports = {
  fetchSession,
  getLastInsertSessionID,
  deleteAllSession,
  updateSessionName,
  insertSession,
  printSession
};