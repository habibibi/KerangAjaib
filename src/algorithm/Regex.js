// Define regular expressions for different categories
const calculatorRegex = /^[\d+\-*/^()%\s]+$/;
const dateQuestionRegex = /^what is the (date|day|month|year) (today|tomorrow|yesterday|\d{1,2} days from now)($|\?)/i;
const insertQuestionRegex = /^add question (.+) with answer (.+)$/i;
const generalQuestionRegex = /\?/;

// Define a function to classify the input into different categories
function classifyInput(input) {
    if (calculatorRegex.test(input)) {
        return "calculator";
    } else if (dateQuestionRegex.test(input)) {
        return "date question";
    } else if (insertQuestionRegex.test(input)) {
        return "insert question";
    } else if (generalQuestionRegex.test(input)) {
        return "general question";
    } else {
        return "invalid";
    }
}

// Test the function
console.log(classifyInput("1 + 2"));
console.log(classifyInput("what is the date today?"));
console.log(classifyInput("add question what is 1 + 1 with answer 2"));
console.log(classifyInput("what is the weather today?"));
