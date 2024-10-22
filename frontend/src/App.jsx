import axios from 'axios';
import './App.css'
import { useState } from 'react';
function App() {
  const [ruleString, setRuleString] = useState('');
  const [rules, setRules] = useState([]);
  const [data, setData] = useState(''); // Store data as JSON
  const [ast, setAst] = useState(''); // Store AST as JSON
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Create Rule Handler
  const handleCreateRule = async () => {
    try {
      const response = await axios.post('https://ruleengine-psgh.onrender.com/api/create_rule', { ruleString });
      console.log('AST:', response.data.ast);
      setAst(JSON.stringify(response.data.ast, null, 2)); // Set AST JSON
      alert('Rule created successfully');
    } catch (error) {
      console.error('Error creating rule:', error);
      alert('Failed to create rule');
    }
  };

  // Combine Rules Handler
  const handleCombineRules = async () => {
    try {
      const response = await axios.post('https://ruleengine-psgh.onrender.com/api/combine_rules', { rules });
      console.log('Combined AST:', response.data.ast);
      setAst(JSON.stringify(response.data.ast, null, 2)); // Set combined AST
      alert('Rules combined successfully');
    } catch (error) {
      console.error('Error combining rules:', error);
      alert('Failed to combine rules');
    }
  };

  // Evaluate Rule Handler
  const handleEvaluateRule = async () => {
    try {
        if (!ast || !data) {
            alert('Please provide both valid AST and data for evaluation');
            return;
        }
        const parsedAst = JSON.parse(ast); // Parse AST from the textarea
        const parsedData = JSON.parse(data); // Parse data from the textarea
        
        console.log('Parsed AST:', parsedAst);
        console.log('Parsed Data:', parsedData);

        const response = await axios.post('https://ruleengine-psgh.onrender.com/api/evaluate_rule', { ast: parsedAst, data: parsedData });
        setEvaluationResult(response.data.result);
    } catch (error) {
        console.error('Error evaluating rule:', error);
        alert('Failed to evaluate rule');
    }
};


  return (
    <div>
      <h1>Rule Engine</h1>

      {/* Create Rule */}
      <div>
        <h2>Create Rule</h2>
        <input
          type="text"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Enter rule (e.g., 'age > 30')"
        />
        <button onClick={handleCreateRule}>Create Rule</button>
      </div>

      {/* Combine Rules */}
      <div>
        <h2>Combine Rules</h2>
        <textarea
          value={rules.join('\n')}
          onChange={(e) => setRules(e.target.value.split('\n'))}
          placeholder="Enter rules (one per line)"
        />
        <button onClick={handleCombineRules}>Combine Rules</button>
      </div>
      <div>
        <h2>Evaluate Rule</h2>
        
        {/* AST Input */}
        <textarea
          value={ast}
          onChange={(e) => setAst(e.target.value)}
          placeholder="Enter AST as JSON"
          rows={5}
        />
        
        {/* Data Input */}
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter data as JSON"
          rows={5}
        />
        
        {/* Evaluate Button */}
        <button onClick={handleEvaluateRule}>Evaluate Rule</button>
        
        {/* Evaluation Result */}
        {evaluationResult !== null && (
          <div>
            <h3>Evaluation Result: {evaluationResult ? 'True' : 'False'}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
