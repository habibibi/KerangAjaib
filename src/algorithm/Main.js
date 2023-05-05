
const classifyInput = require('./Regex');
const getDayOfWeek = require('./Date');
const evaluateExpression = require('./Calculator');
const bmMatch = require('./BMAlgorithm');
const kmpMatch = require('./KMPAlgorithm');
const getLevenDist = require('./LevenDist');
const qnaManager = require('../backend/manager/qna.manager');
const queryManager = require('../backend/manager/query.manager');
const sessionManager = require('../backend/manager/session.manager');

async function getOutput(input, type) {
    // load the database
    qnas = await qnaManager.fetchQnA();
    queries = await queryManager.fetchAllQuery();
    sessions = await sessionManager.fetchSession();

    // Classify the input
    category = classifyInput(input);
    // Process the input based on the category
    switch (category) {
        case "date":
            dateStr = input.match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0];
            output = getDayOfWeek(dateStr);
            return output;
        case "calculator":
            tokens = input.match(/\d+(\.\d+)?|[+\-*/^()]/g);
            output = evaluateExpression(tokens);
            return output;
        case "insert question":
            inpMatch = input.match(/^tambah pertanyaan (.+) dengan jawaban (.+)$/i);
            qnaData = {
                question: inpMatch[1],
                answer: inpMatch[2]
            };
            output = "";
            if (qnas.length == 0) {
                await qnaManager.insertQnA(qnaData);
                output = "Pertanyaan " + qnaData.question + " berhasil ditambahkan dengan jawaban " + qnaData.answer;
            } else {
                qnaString = '#' + qnas.map(qna => `${qna.question}`).join('#') + '#';
                if (type == "BM") {
                    index = bmMatch(qnaString, qnaData.question);
                } else {
                    index = kmpMatch(qnaString, qnaData.question);
                }
                if (index == -1) {
                    // await qnaManager.insertQnA(qnaData);
                    output = "Pertanyaan " + qnaData.question + " berhasil ditambahkan dengan jawaban " + qnaData.answer;
                } else {
                    await qnaManager.updateQnA(qnaData);
                    output = "Pertanyaan " + qnaData.question + " berhasil diupdate dengan jawaban " + qnaData.answer;
                }
            }
            return output;
        case "delete question":
            delMatch = input.match(/^hapus pertanyaan (.+)$/i);
            question = delMatch[1];
            output = "";
            if (qnas.length == 0) {
                output = "Tidak ada pertanyaan yang dapat dihapus";
            } else {
                qnaString = '#' + qnas.map(qna => `${qna.question}`).join('#') + '#';
                if (type == "BM") {
                    index = bmMatch(qnaString, question);
                } else {
                    index = kmpMatch(qnaString, question);
                }
                if (index >= 0) {
                    await qnaManager.deleteQnA(question);
                    output = "Pertanyaan " + question + " berhasil dihapus";
                } else {
                    output = "Pertanyaan " + question + " tidak ditemukan dalam database";
                }
            }
            return output;
        case "general question":
            inpQuestion = input;
            output = "";
            if (qnas.length == 0) {
                output = "Tidak ada pertanyaan pada database";
            } else {
                qnaString = '#' + qnas.map(qna => `${qna.question}`).join('#') + '#';
                if (type == "BM") {
                    index = bmMatch(qnaString, inpQuestion);
                } else {
                    index = kmpMatch(qnaString, inpQuestion);
                }
                if (index >= 0) {
                    endIndex = index + inpQuestion.length;
                    substring = qnaString.substring(1, endIndex);
                    parts = substring.split('#');
                    dbQuestion = parts[parts.length - 1];
                    qna = qnas.find(qna => qna.question == dbQuestion);
                    output = qna.answer;
                } else {
                    distances = qnas.map(qna => {
                        return {
                            question: qna.question,
                            distance: getLevenDist(qna.question, inpQuestion),
                            maxLen: Math.max(qna.question.length, inpQuestion.length),
                            percentage: (1 - (distance / maxLen)) * 100
                        };
                    });
                    distances.sort((a, b) => b.percentage - a.percentage);
                    top3 = distances.slice(0, 3);
                    if (top3[0].percentage >= 50) {
                        output = "Apakah maksud Anda " + top3[0].question + "?";
                    } else {
                        output = "Pertanyaan tidak ditemukan dalam database";
                    }
                }
            }
            return output;
        default:
            return "Tidak Ada ...";
    }
}

async function main(input, type) {
    console.log("input: " + input);
    output = await getOutput(input, type);
    console.log("output: " + output);
}

// main("Hari apa 12/12/2012", "BM");
// main("Hitung 1.5 - 2 ^ 3", "BM");
// main("1 ^ 2 + 3", "BM");
// main("tambah pertanyaan apa kabar dengan jawaban baik baik saja", "BM");
main("hapus pertanyaan apa kabar", "KMP");
// main("apa kabar", "BM");
