const axios = require('axios');

// insert new qna document
async function insertQnA(qnaData) {
  try {
    const response = await axios.post('http://localhost:3000/api/db/qna', qnaData);
    console.log("QnA data insert successful");
  } catch (error) {
    console.log("QnA data insert failed");
  }
}

// update existing qna document
async function updateQnA(qnaData) {
  try {
    const response = await axios.put(`http://localhost:3000/api/db/qna/${qnaData.question}`, { answer: qnaData.answer });
    console.log("QnA data update successful");
  } catch (error) {
    console.log("QnA data update failed")
  }
}

// delete existing qna document
async function deleteQnA(question) {
  try {
    const response = await axios.delete(`http://localhost:3000/api/db/qna/${question}`);
    console.log("QnA data delete successful");
  } catch (error) {
    console.log("QnA data delete failed")
  }
}

// delete all qna document
async function deleteAllQnA() {
  try {
    const response = await axios.delete(`http://localhost:3000/api/db/qna`);
    console.log("QnA data delete successful");
  } catch (error) {
    console.log("QnA data delete failed")
  }
}

// fetch all qna document
async function fetchQnA() {
  try {
    const response = await axios.get('http://localhost:3000/api/db/qna');
    console.log("QnA data fetch successful");
    return response.data;
  } catch (error) {
    console.log("QnA data fetch failed");
    return null;
  }
}

// print qna document
async function printQnA() {
  const qnas = await fetchQnA();
  console.log(); // or do something else with the array
}

module.exports = {
  insertQnA,
  updateQnA,
  fetchQnA,
  deleteQnA,
  deleteAllQnA,
  printQnA,
};