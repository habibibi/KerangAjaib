// Define regular expressions for different categories
const dateRegex = /(Hari apa)?\b\d{1,2}\/\d{1,2}\/\d{4}\b/;
const calculatorRegex = /Hitung|Berapa|(\d+(\.\d+)?|[\+\-\*\/\^\(\)])/g;
const insertQuestionRegex = /^[Tt]ambah pertanyaan (.+) dengan jawaban (.+)$/i;
const deleteQuestionRegex = /^[Hh]apus pertanyaan (.+)$/i;

// Define a function to classify the input into different categories
function classifyInput(input) {
  if (dateRegex.test(input)) {
    return "date";
  } else if (calculatorRegex.test(input)) {
    return "calculator";    
  } else if (insertQuestionRegex.test(input)) {
    return "insert question";
  } else if (deleteQuestionRegex.test(input)) {
    return "delete question";
  } else {
    return "general question";
  }
}

module.exports = classifyInput
