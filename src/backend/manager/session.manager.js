const axios = require('axios');

async function fetchSession() {
  try {
    const response = await axios.get('http://localhost:3000/api/session');
    console.log("Session data fetch successful")
    return response.data;
  } catch (error) {
    console.log("Session data fetch failed")
    return null;
  }
}

async function deleteAllSession() {
  try {
    const response = await axios.delete(`http://localhost:3000/api/session`);
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
  deleteAllSession,
  printSession
};