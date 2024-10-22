# Rule Engine with AST

## Hosted Link

You can access the live application at: [RuleEngine](https://ruleengine-1.onrender.com/)

## Objective

The purpose of this project is to develop a simple 3-tier rule engine application with a frontend UI, an API backend, and a data storage layer. The engine dynamically determines user eligibility based on attributes like age, department, income, spend, etc. The rules are represented using an Abstract Syntax Tree (AST) that allows for the creation, combination, modification, and evaluation of rules.

## Features

- **Dynamic Rule Creation**: Represent business rules using an AST.
- **Rule Combination**: Combine multiple rules into a single AST.
- **Rule Evaluation**: Evaluate user eligibility based on defined rules and provided user data.
- **Error Handling**: Handles invalid rules, missing operators, or incorrect data formats.

## Data Structure

The AST uses the following structure to represent rules:

- **Type**: String indicating node type (`"operator"` for AND/OR, `"operand"` for conditions).
- **Left/Right Nodes**: Left and right child nodes for operators.
- **Value**: The condition's value (e.g., comparisons like `age > 30`).

## Technologies Used

- **Frontend:** React
- **CSS:** Custom styles for layout and design
- **Backend:** Node.js , Express , MongoDB
- **Data Parsing:** AST for rule representation and manipulation

## API Endpoints

- **Backend API:** (https://ruleengine-psgh.onrender.com)
- **POST** `/api/create_Rule`
- **POST** `/api/combine_rules`
- **POST** `/api/evaluate_rule`

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aparnamagadum/RuleEngine.git

