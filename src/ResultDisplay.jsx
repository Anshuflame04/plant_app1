import React from 'react';

const ResultDisplay = ({ result }) => {
  return (
    <div>
      <h3>Prediction Result:</h3>
      <p>Predicted Class: {result.predicted_class}</p>
      <p>Confidence: {result.confidence}</p>
      <p>Information: {result.info}</p> {/* New line for additional information */}
    </div>
  );
};

export default ResultDisplay;
