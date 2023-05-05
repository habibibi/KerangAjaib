
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
            inpQuestion = "#" + qnaData.question + "#";
            output = "";
            if (qnas.length == 0) {
                await qnaManager.insertQnA(qnaData);
                output = "Pertanyaan " + qnaData.question + " berhasil ditambahkan dengan jawaban " + qnaData.answer;
            } else {
                qnaString = '#' + qnas.map(qna => `${qna.question}`).join('#') + '#';
                if (type == "BM") {
                    index = bmMatch(qnaString, inpQuestion);
                } else {
                    index = kmpMatch(qnaString, inpQuestion);
                }
                if (index == -1) {
                    await qnaManager.insertQnA(qnaData);
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
            inpQuestion = "#" + question + "#";
            output = "";
            if (qnas.length == 0) {
                output = "Tidak ada pertanyaan yang dapat dihapus";
            } else {
                qnaString = '#' + qnas.map(qna => `${qna.question}`).join('#') + '#';
                if (type == "BM") {
                    index = bmMatch(qnaString, inpQuestion);
                } else {
                    index = kmpMatch(qnaString, inpQuestion);
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
            inpQuestion = "#" + input + "#";
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
                            percentage: (1 - (getLevenDist(qna.question, inpQuestion) / Math.max(qna.question.length, inpQuestion.length))) * 100
                        };
                    });
                    distances.sort((a, b) => b.percentage - a.percentage);
                    let top3Above50 = distances.filter(item => item.percentage > 50);
                    if (top3Above50.length > 0) {
                        output += "Apakah maksud Anda\n"
                        top3Above50.forEach((item, index) => {
                            output += `${index + 1}. ${item.question} (${item.percentage.toFixed(2)}%)`;
                            if (index !== top3Above50.length - 1) {
                                output += "\n";
                            }
                        });
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

async function test(input, type) {
    console.log("\n" + "input: " + input);
    output = await getOutput(input, type);
    console.log("output: " + output);
}

async function main() {
    // await test("Hari apa 12/12/2012", "BM");
    // await test("Hitung 1.5 - 2 ^ 3", "BM");
    // await test("11.1 ^ 2 + 3", "BM");
    // await test("tambah pertanyaan siapa presiden pertama di dunia dengan jawaban george washington", "BM");
    // await test("hapus pertanyaan apa kabar", "KMP");
    await test("apa nama ibukota", "BM");
}

main();
