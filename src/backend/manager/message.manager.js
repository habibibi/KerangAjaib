const axios = require('axios');

async function insertMessage(queryData) {
  try {
    const response = await axios.post('http://localhost:3000/api/db/message', queryData);
    console.log("Message data insert successful");
  } catch (error) {
    console.log("Message data insert failed");
  }
}
  
async function deleteAllMessages() {
  try {
    const response = await axios.delete('http://localhost:3000/api/db/message');
    console.log("All queries deleted");
  } catch (error) {
    console.error(error);
  }
}
  
async function fetchAllMessage() {
  try {
    const response = await axios.get('http://localhost:3000/api/db/message');
    console.log("Message data fetch successful");
    return response.data;
  } catch (error) {
    console.log("Message data fetch failed")
    return null;
  }
}
  
async function fetchMessageFromSession(sessionID) {
  const allMessages = await fetchAllMessage();
  const sessionMessages = allMessages.filter(query => query.sessionID === sessionID);
  return sessionMessages;
}
    
async function printAllMessage() {
  const queries = await fetchAllMessage();
  console.log(queries); // or do something else with the array
}
  
async function printMessageFromSession(sessionID) {
  const sessionMessages = await fetchMessageFromSession(sessionID);
  console.log(sessionMessages); // or do something else with the array
}

module.exports = {
  insertMessage,
  deleteAllMessages,
  fetchAllMessage,
  fetchMessageFromSession,
  printAllMessage,
  printMessageFromSession
};
