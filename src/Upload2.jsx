import { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Send the POST request to FastAPI
      const response = await axios.post('http://127.0.0.1:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set the prediction result to display on the UI
      setPrediction(response.data);

    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Upload Image for Disease Prediction</h1>

      <input 
        type="file" 
        onChange={handleFileChange} 
        style={{ margin: '20px 0' }} 
      />

      <button onClick={handleUpload} style={{ padding: '10px 20px' }}>
        Upload and Predict
      </button>

      {prediction && (
        <div style={{ marginTop: '20px', textAlign: 'left', display: 'inline-block' }}>
          <h2>Prediction Result:</h2>
          <p><strong>Disease:</strong> {prediction.predicted_disease}</p>
          <p><strong>Confidence:</strong> {prediction.confidence_score.toFixed(2)}%</p>
          <p><strong>Cause:</strong> {prediction.cause}</p>
          <p><strong>Prevention:</strong> {prediction.prevention}</p>
          <p><strong>Medicines:</strong> {prediction.medicines}</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
