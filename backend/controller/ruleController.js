import ruleModel from "../models/ruleModel.js";
import { parseRuleToAST,combine_rules,evaluate_rule } from "../utils/astUtils.js";
import { v4 as uuidv4 } from 'uuid';
function generateId() {
  return uuidv4(); 
}

//createRule function
export async function createRule(req, res) {
  try {
    const { ruleString } = req.body;
    if (!ruleString) {
      return res.status(400).json({ success: false, message: 'Rule string is required' });
    }
    const ast = parseRuleToAST(ruleString);
    if (!ast) {
      return res.status(400).json({ success: false, message: 'Failed to parse rule string' });
    }
    const newRule = new ruleModel({ ruleId: generateId(), ruleString, ast });
    await newRule.save();
    res.json({ success: true,ast});
  } catch (err) {
    console.error('Error creating rule:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


//combineRules function
export async function combineRules(req, res) {
  try {
    const { rules } = req.body;

    if (!rules || !Array.isArray(rules) || rules.length === 0) {
      return res.status(400).json({ success: false, message: 'A list of rule strings is required' });
    }
    const combinedAST = combine_rules(rules);
    if (!combinedAST) {
      return res.status(400).json({ success: false, message: 'Failed to combine rules' });
    }
    const combinedRule = new ruleModel({ ruleId: generateId(), ruleString: rules.join(' '), ast: combinedAST });
    await combinedRule.save();
    res.json({ success: true, ast: combinedAST });
  } catch (err) {
    console.error('Error combining rules:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


//evaluateRule function
export async function evaluateRule(req, res) {
  try {
    const { ast, data } = req.body;
    if (!ast || !data) {
      return res.status(400).json({ success: false, message: 'AST or data is missing' });
    }
    const result = evaluate_rule(ast, data);
    res.json({ success: true, result });
  } catch (err) {
    console.error('Error evaluating rule:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

