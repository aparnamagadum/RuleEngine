class Node {
  constructor(type, value, left = null, right = null) {
    this.type = type; // 'operator' or 'operand'
    this.value = value; // The operator (e.g., 'AND') or condition string (e.g., 'age > 30')
    this.left = left; // Left child node (if any)
    this.right = right; // Right child node (if any)
  }
}

export function parseRuleToAST(ruleString) {
  const tokens = ruleString.split(/\s+/); // Split by spaces
  const stack = [];
  let currentExpression = [];

  tokens.forEach(token => {
    console.log("Processing token:", token); // Debugging info

    if (token === 'AND' || token === 'OR') {
      // If there's a valid expression to process, push it as an operand
      if (currentExpression.length > 0) {
        console.log("Processing expression:", currentExpression.join(' ')); // Debugging info
        const operand = new Node('operand', currentExpression.join(' ')); // Process expression inline
        stack.push(operand);
        currentExpression = [];
      }

      // Check for at least two operands in the stack
      if (stack.length < 2) {
        throw new Error('Invalid expression: not enough operands for operator');
      }

      // Pop the top two operands and create an operator node
      const right = stack.pop();
      const left = stack.pop();
      console.log("Combining:", left, token, right); // Debugging info
      const operatorNode = new Node('operator', token, left, right);

      // Push the new operator node back to the stack
      stack.push(operatorNode);
    } else {
      // Collect condition tokens (e.g., "age", ">", "30")
      currentExpression.push(token);
    }
  });

  // If a final operand remains, process it
  if (currentExpression.length > 0) {
    console.log("Processing expression:", currentExpression.join(' ')); // Debugging info
    const operand = new Node('operand', currentExpression.join(' ')); // Process expression inline
    stack.push(operand);
  }

  // Final AST should only have one node
  if (stack.length !== 1) {
    throw new Error('Invalid expression: incomplete AST');
  }

  const ast = stack.pop(); // Root of the AST

  return {
    success: true,
    ast: ast,
  };
}