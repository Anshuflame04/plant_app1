import React from 'react';

const OptionSelector = ({ setShowOptions }) => {
  const handleOptionOne = () => {
    // Implement functionality for Option One
    console.log("Option One selected");
    setShowOptions(false); // Close the options after selection
  };

  const handleOptionTwo = () => {
    // Implement functionality for Option Two
    console.log("Option Two selected");
    setShowOptions(false); // Close the options after selection
  };

  return (
    <div className="option-selector">
      <button onClick={handleOptionOne} className="option-button">Option One</button>
      <button onClick={handleOptionTwo} className="option-button">Option Two</button>
    </div>
  );
};

export default OptionSelector;
