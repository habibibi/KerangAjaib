
const classifyInput = require('./Regex');
const getDayOfWeek = require('./Date');
const evaluateExpression = require('./Calculator');
const bmMatch = require('./BMAlgorithm');
const kmpMatch = require('./KMPAlgorithm');
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
            match = input.match(/^tambah pertanyaan (.+) dengan jawaban (.+)$/i);
            qnaData = {
                question: match[1],
                answer: match[2]
            };
            output = "";
            if (qnas.length == 0) {
                await qnaManager.insertQnA(qnaData);
                output = "Pertanyaan " + qnaData.question + " berhasil ditambahkan dengan jawaban " + qnaData.answer;
            } else {
                for (let i = 0; i < qnas.length; i++) {
                    question = qnas[i].question;
                    answer = qnas[i].answer;
                    if (type === "BM") {
                        result = bmMatch(question, qnaData.question);
                    } else if (type === "KMP") {
                        result = kmpMatch(question, qnaData.question);
                    }

                    
                    console.log(`Question: ${question}\nResult: ${result}`);
                }
            }
            return output;
        case "delete question":
            match = input.match(/^hapus pertanyaan (.+)$/i);
            question = match[1];
            output = "";
            return output;
        case "general question":
            output = "";
            return;
        default:
            return "Tidak Ada ...";
    }
}

async function main(input, type) {
    output = await getOutput(input, type);
    console.log(output);
}

// main("Hari apa 12/12/2012");
// main("Hitung 1.5 - 2 ^ 3");
// main("Hitung 1 ^ 2 + 3")
main("tambah pertanyaan apa kabar dengan jawaban baik", "BM");
// main("hapus pertanyaan apa kabar", "KMP");
// main("apa kabar");
