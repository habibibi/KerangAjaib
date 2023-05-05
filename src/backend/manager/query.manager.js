const axios = require('axios');

async function insertQuery(queryData) {
  try {
    const response = await axios.post('http://localhost:3000/api/query', queryData);
    console.log("Query data insert successful");
  } catch (error) {
    console.log("Query data insert failed");
  }
}
  
async function deleteAllQueries() {
  try {
    const response = await axios.delete('http://localhost:3000/api/query');
    console.log("All queries deleted");
  } catch (error) {
    console.error(error);
  }
}
  
async function fetchAllQuery() {
  try {
    const response = await axios.get('http://localhost:3000/api/query');
    console.log("Query data fetch successful");
    return response.data;
  } catch (error) {
    console.log("Query data fetch failed")
    return null;
  }
}
  
async function fetchQueryFromSession(sessionID) {
  const allQueries = await fetchAllQuery();
  const sessionQueries = allQueries.filter(query => query.sessionID === sessionID);
  return sessionQueries;
}
    
async function printAllQuery() {
  const queries = await fetchAllQuery();
  console.log(queries); // or do something else with the array
}
  
async function printQueryFromSession(sessionID) {
  const sessionQueries = await fetchQueryFromSession(sessionID);
  console.log(sessionQueries); // or do something else with the array
}

module.exports = {
  insertQuery,
  deleteAllQueries,
  fetchAllQuery,
  fetchQueryFromSession,
  printAllQuery,
  printQueryFromSession
};
