import React, { useState } from 'react';
import axios from 'axios';

const TestFlask = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleTestRequest = async () => {
    try {
      const res = await axios.get('/api/test'); // Adjust the endpoint as needed
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while contacting Flask');
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Test Flask API</h1>
      <button onClick={handleTestRequest}>Send Test Request</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Response from Flask:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestFlask;
