class Node {  
  constructor(type, value, left = null, right = null) {  
      this.type = type; // 'operator' or 'operand'  
      this.value = value; // The operator or condition string
      this.left = left; // Left child node  
      this.right = right; // Right child node
  }  
}  
export function parseRuleToAST(ruleString) {  
  const tokens = ruleString.split(/\s+/);  
  const stack = [];  
  let currentExpression = [];  
  let operators = [];  
  tokens.forEach(token => {  
      //console.log("Processing token:", token); 
      if (token === 'AND' || token === 'OR') {  
          if (currentExpression.length > 0) {  
              //console.log("Processing expression:", currentExpression.join(' ')); 
              const operand = new Node('operand', currentExpression.join(' '));   
              stack.push(operand);  
              currentExpression = [];  
          }  
          operators.push(token);  
      } else {  
          currentExpression.push(token);  
      }  
  });  
  if (currentExpression.length > 0) {  
      //console.log("Processing expression:", currentExpression.join(' ')); 
      const operand = new Node('operand', currentExpression.join(' ')); // Process expression inline  
      stack.push(operand);  
  }   
  while (operators.length > 0) {  
      const operator = operators.shift(); // Get the first operator  
      const right = stack.pop(); // Right operand  
      const left = stack.pop(); // Left operand  
      const operatorNode = new Node('operator', operator, left, right);  
      stack.push(operatorNode); // Push the new operator node back to the stack  
  }   
  if (stack.length !== 1) {  
      throw new Error('Invalid expression: incomplete AST');  
  }        
  return stack.pop();  
} 


export function combine_rules(rules) {
  if (rules.length === 0) return null;
  if (rules.length === 1) return parseRuleToAST(rules[0]);

  // Parse each rule string into an AST
  const asts = rules.map(ruleString => parseRuleToAST(ruleString));

  // Count AND/OR operators in the parsed ASTs
  const operatorCounts = { AND: 0, OR: 0 };
  
  function countOperators(ast) {
    if (ast.type === 'operator') {
      operatorCounts[ast.value] = (operatorCounts[ast.value] || 0) + 1;
      if (ast.left) countOperators(ast.left);
      if (ast.right) countOperators(ast.right);
    }
  }

  asts.forEach(ast => countOperators(ast));

  // Choose the dominant operator based on frequency
  const dominantOperator = operatorCounts.AND >= operatorCounts.OR ? 'AND' : 'OR';

  // Combine ASTs into a single tree using the dominant operator
  let combinedAST = asts[0];
  for (let i = 1; i < asts.length; i++) {
    combinedAST = new Node('operator', dominantOperator, combinedAST, asts[i]);
  }

  return combinedAST;
}


export function evaluate_rule(ast, data) {
  // Base case: if the node is an operand, evaluate the condition
  if (ast.type === 'operand') {
    return evaluateCondition(ast.value, data);
  }

  // If it's an operator, recursively evaluate the left and right operands
  const leftResult = evaluate_rule(ast.left, data);
  const rightResult = evaluate_rule(ast.right, data);

  // Apply the operator (AND/OR)
  if (ast.value === 'AND') {
    return leftResult && rightResult;
  } else if (ast.value === 'OR') {
    return leftResult || rightResult;
  }

  throw new Error('Invalid operator in AST');
}

// Helper function to evaluate individual conditions
function evaluateCondition(condition, data) {
  // Example condition string: "age > 30" or "department == 'IT'"
  const [attribute, operator, value] = parseCondition(condition);

  // Perform comparison based on the operator
  if (operator === '==') {
    return data[attribute] == value;
  } else if (operator === '!=') {
    return data[attribute] != value;
  } else if (operator === '>') {
    return data[attribute] > Number(value);
  } else if (operator === '>=') {
    return data[attribute] >= Number(value);
  } else if (operator === '<') {
    return data[attribute] < Number(value);
  } else if (operator === '<=') {
    return data[attribute] <= Number(value);
  } else {
    throw new Error(`Unsupported operator: ${operator}`);
  }
}

// Helper function to parse conditions (e.g., "age > 30")
function parseCondition(condition) {
  const regex = /(\w+)\s*(==|!=|>|>=|<|<=)\s*(.+)/;
  const match = condition.match(regex);

  if (!match) {
    throw new Error(`Invalid condition: ${condition}`);
  }

  const [, attribute, operator, value] = match;

  // Remove quotes from string values (e.g., "'IT'" => "IT")
  const cleanedValue = value.replace(/^['"](.+)['"]$/, '$1');

  return [attribute, operator, cleanedValue];
}

