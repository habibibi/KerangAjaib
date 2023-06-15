const {insertMessage} = require('../services/messageDB.service');
const {getAllQNA, insertQNA, updateQNA, deleteQNA} = require('../services/qnaDB.service');
const classifyInput = require('../algorithm/Regex');
const getDayOfWeek = require('../algorithm/Date');
const evaluateExpression = require('../algorithm/Calculator');
const bmMatch = require('../algorithm/BMAlgorithm');
const kmpMatch = require('../algorithm/KMPAlgorithm');
const getLevenDist = require('../algorithm/LevenDist');

async function queryHandlerAPI(req, res) {
    try {
        const query = req.body.query;
        const sessionID = req.body.sessionID;
        const algo = req.body.algo;
        await insertMessage(query, 'user', sessionID);
        let response;
        let qnas = await getAllQNA();
        category = classifyInput(query);
        console.log(category);
        switch (category) {
            case "date":
                dateStr = query.match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0];
                response = getDayOfWeek(dateStr);
                break;
            case "calculator":
                tokens = query.match(/\d+(\.\d+)?|[+\-*/^()]/g);
                response = evaluateExpression(tokens);
                break;
            case "insert question":
                inpMatch = query.match(/^tambah pertanyaan (.+) dengan jawaban (.+)$/i);
                qnaData = {
                    question: inpMatch[1],
                    answer: inpMatch[2]
                };
                inpQuestion = "#" + qnaData.question + "#";
                response = "";
                if (qnas.length == 0) {
                    await insertQNA(qnaData);
                    response = "Pertanyaan " + qnaData.question + " berhasil ditambahkan dengan jawaban " + qnaData.answer;
                } else {
                    qnaString = '#' + qnas.map(qna => `${qna.question}`).join('#') + '#';
                    if (algo == "BM") {
                        index = bmMatch(qnaString, inpQuestion);
                    } else {
                        index = kmpMatch(qnaString, inpQuestion);
                    }
                    if (index == -1){
                        await insertQNA(qnaData.question, qnaData.answer);
                        response = "Pertanyaan " + qnaData.question + " berhasil ditambahkan dengan jawaban " + qnaData.answer;
                    } else {
                        await updateQNA(qnaData.question, qnaData.answer);
                        response = "Pertanyaan " + qnaData.question + " berhasil diupdate dengan jawaban " + qnaData.answer;
                    }
                }
                break;
            case "delete question":
                delMatch = query.match(/^hapus pertanyaan (.+)$/i);
                question = delMatch[1];
                inpQuestion = "#" + question + "#";
                response = "";
                if (qnas.length == 0) {
                    response = "Tidak ada pertanyaan yang dapat dihapus";
                } else {
                    qnaString = '#' + qnas.map(qna => `${qna.question}`).join('#') + '#';
                    if (algo == "BM") {
                        index = bmMatch(qnaString, inpQuestion);
                    } else {
                        index = kmpMatch(qnaString, inpQuestion);
                    }
                    if (index >= 0){
                        await deleteQNA(question);
                        response = "Pertanyaan " + question + " berhasil dihapus";
                    } else {
                        response = "Pertanyaan " + question + " tidak ditemukan dalam database";
                    }
                }
                break;
            case "general question":
                inpQuestion = "#" + query + "#";
                response = "";
                if (qnas.length == 0) {
                    response = "Tidak ada pertanyaan pada database";
                } else {
                    qnaString = '#' + qnas.map(qna => `${qna.question}`).join('#') + '#';
                    if (algo == "BM") {
                        index = bmMatch(qnaString, inpQuestion);
                    } else {
                        index = kmpMatch(qnaString, inpQuestion);
                    }
                    if (index >= 0) {
                        endIndex = index + inpQuestion.length;
                        substring = qnaString.substring(1, endIndex);
                        parts = substring.split('#');
                        dbQuestion = parts[parts.length - 2];
                        qna = qnas.find(qna => qna.question == dbQuestion);
                        response = qna.answer;
                    } else {
                        distances = qnas.map(qna => {
                            return {
                                question: qna.question,
                                percentage: (1 - (getLevenDist(qna.question, inpQuestion) / Math.max(qna.question.length, inpQuestion.length))) * 100
                            };
                        });
                        distances.sort((a, b) => b.percentage - a.percentage);
                        let top3Above50 = distances.filter(item => item.percentage > 50);
                        if (top3Above50.length > 0) {
                            response += "Apakah maksud Anda\n"
                            top3Above50.forEach((item, index) => {
                                response += `${index + 1}. ${item.question} (${item.percentage.toFixed(2)}%)`;
                                if (index !== top3Above50.length - 1) {
                                    response += "\n";
                                }
                            });
                        } else {
                            response = "Pertanyaan tidak ditemukan dalam database";
                        }
                    }
                }
                break;
            default:
                response = "Tidak Ada ...";
                break;
        }
        await insertMessage(response, 'bot', sessionID);
        return res.send({answer : response});
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    queryHandlerAPI
};

