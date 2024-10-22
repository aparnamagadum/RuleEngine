import axios from 'axios';
import './App.css'
import { useState } from 'react';
function App() {
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = async () => {
    const response = await axios.post('/api/create_rule', { ruleString });
    console.log(response.data);
  };
  return (
      <div>
      <input
        type="text"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule string"
      />
      <button onClick={handleSubmit}>Create Rule</button>
    </div>
  )
}

export default App
