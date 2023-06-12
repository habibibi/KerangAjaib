const QNA = require('../models/qna.model');

async function insertQNA(question, answer) {
  const newQNA = new QNA({ question, answer });
  try {
    qna = await newQNA.save();
    return qna;
  } catch (err) {
    throw err;
  }
}

async function updateQNA(question, answer) {
    try{
        let qna = await QNA.findOneAndUpdate(
            { question }, // search for the document with the given question
            { answer }, // update the answer with the given value
            { new: true, upsert: true } // options to return the updated document or create a new one if it doesn't exist
        );
        return qna;
    } catch (err) {
        throw err;
    }
}

async function deleteQNA(question) {
    try{
        await QNA.deleteOne({ question });
        console.log(`QnA with question "${question}" has been deleted.`);
    } catch (err) {
        throw err;
    }
}

async function deleteAllQNA() {
    try{
        const result = await QNA.deleteMany({});
        console.log(`${result.deletedCount} documents deleted.`);
    } catch (err) {
        throw err;
    }
}

async function getAllQNA() {
    try{
        const qnas = await QNA.find().select({ _id: 0, __v: 0 });
        return qnas;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    insertQNA,
    updateQNA,
    deleteQNA,
    deleteAllQNA,
    getAllQNA
}

