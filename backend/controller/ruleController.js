import ruleModel from "../models/ruleModel.js";
import { parseRuleToAST } from "../utils/astUtils.js";
import { v4 as uuidv4 } from 'uuid';
function generateId() {
  return uuidv4(); // Generates a unique ID (e.g., 'f47ac10b-58cc-4372-a567-0e02b2c3d479')
}
export async function createRule(req, res) {
  try {
    const { ruleString } = req.body;
    
    if (!ruleString) {
      return res.status(400).json({ success: false, message: 'Rule string is required' });
    }

    // Parse the rule string into AST
    const ast = parseRuleToAST(ruleString);

    if (!ast) {
      return res.status(400).json({ success: false, message: 'Failed to parse rule string' });
    }

    //Generate a new rule with ruleId, ruleString, and ast
    const newRule = new ruleModel({ ruleId: generateId(), ruleString, ast });

    // Save the new rule in the database
    await newRule.save();

    // Return success response with the AST
    res.json({ success: true,ast});
  } catch (err) {
    console.error('Error creating rule:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
