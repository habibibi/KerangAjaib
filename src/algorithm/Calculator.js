// Define a function to evaluate arithmetic expressions
function evaluateExpression(expression) {
    // Split the expression into individual tokens (numbers, operators, parentheses)
    const tokens = expression.split(/\s+/);
  
    // Define stacks for operators and operands
    const operatorStack = [];
    const operandStack = [];
  
    // Define a function to apply an operator to two operands
    function applyOperator(operator) {
        const operand2 = operandStack.pop();
        const operand1 = operandStack.pop();
  
        switch (operator) {
            case "+":
                operandStack.push(operand1 + operand2);
                break;
            case "-":
                operandStack.push(operand1 - operand2);
                break;
            case "*":
                operandStack.push(operand1 * operand2);
                break;
            case "/":
                operandStack.push(operand1 / operand2);
                break;
            case "^":
                operandStack.push(Math.pow(operand1, operand2));
                break;
        }
    }
  
    // Process each token in the expression
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
    
        if (/^\d+(\.\d+)?$/.test(token)) {
            // If the token is a number, push it onto the operand stack
            operandStack.push(parseFloat(token));
        } else if (/^[\+\-\*\/\^]$/.test(token)) {
            // If the token is an operator, apply operators on the operator stack until
            // the top of the operator stack has lower precedence than the current token
            while (operatorStack.length > 0 && /^[\+\-\*\/\^]$/.test(operatorStack[operatorStack.length - 1]) &&
                   ((token === "^" && operatorStack[operatorStack.length - 1] === "^") ||
                    (token !== "^" && precedence(token) <= precedence(operatorStack[operatorStack.length - 1])))) {
                applyOperator(operatorStack.pop());
            }
    
            // Push the current token onto the operator stack
            operatorStack.push(token);
        } else if (token === "(") {
            // If the token is a left parenthesis, push it onto the operator stack
            operatorStack.push(token);
        } else if (token === ")") {
            // If the token is a right parenthesis, apply operators on the operator stack until
            // the corresponding left parenthesis is found
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
                applyOperator(operatorStack.pop());
            }
    
            if (operatorStack.length === 0 || operatorStack[operatorStack.length - 1] !== "(") {
                throw new Error("Mismatched parentheses");
            }
    
            // Pop the left parenthesis from the operator stack
            operatorStack.pop();
        } else {
            // If the token is not a number, operator, or parenthesis, throw an error
            throw new Error("Invalid token: " + token);
        }
    }
  
    // Apply any remaining operators on the operator stack
    while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
    
        if (operator === "(") {
            throw new Error("Mismatched parentheses");
        }
    
        applyOperator(operator);
    }
  
    // The result is the top of the operand stack
    if (operandStack.length !== 1) {
        throw new Error("Invalid expression");
    }
  
    return operandStack[0];
}
  
// Define a function to determine the precedence of an operator
function precedence(operator) {
    switch (operator) {
    case "+":
    case "-":
        return 1;
    case "*":
    case "/":
        return 2;
    case "^":
        return 3;
    default:
        throw new Error("Invalid operator: " + operator);
    }
}

// Test the evaluateExpression function
console.log(evaluateExpression("1 + 2 * 3"));
console.log(evaluateExpression("1 + 2 * 3 - 4"));
console.log(evaluateExpression("1 + 2 * 3 - 4 / 5"));
console.log(evaluateExpression("1 + 2 * 3 - 4 / 5 ^ 6"));
