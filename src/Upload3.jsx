import { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the selected file to display the image
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
      setFileName(file.name); // Save the file name for later use
    }
  };

  const handleUpload = async () => {
    if (!fileName) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', document.getElementById('file-input').files[0]); // Append the actual file object

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
      alert('Failed to upload the file. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Upload Image for Disease Prediction</h1>

        {/* Square Upload Box */}
        <div 
          style={styles.uploadBox} 
          onClick={() => document.getElementById('file-input').click()} // Trigger file input on click
        >
          {selectedFile ? (
            <img src={selectedFile} alt="Uploaded" style={styles.imagePreview} />
          ) : (
            <p style={styles.uploadText}>Click or Drop an Image Here</p>
          )}
          <input 
            type="file" 
            id="file-input" 
            onChange={handleFileChange} 
            style={styles.hiddenFileInput} // Hide the default file input
          />
        </div>

        <button onClick={handleUpload} style={styles.button}>
          Upload and Predict
        </button>

        {prediction && (
          <div style={styles.result}>
            <h2>Prediction Result:</h2>
            <p><strong>Disease:</strong> {prediction.predicted_disease}</p>
            <p><strong>Confidence:</strong> {prediction.confidence_score.toFixed(2)}%</p>
            <p><strong>Cause:</strong> {prediction.cause}</p>
            <p><strong>Prevention:</strong> {prediction.prevention}</p>
            <p><strong>Medicines:</strong> {prediction.medicines}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f8ff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 20px',
    color: '#333',
  },
  uploadBox: {
    width: '100%',
    height: '200px',
    border: '2px dashed #4CAF50',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s',
    position: 'relative', // For absolute positioning of the image
    overflow: 'hidden', // To ensure the image doesn't overflow the box
  },
  uploadText: {
    color: '#4CAF50',
    fontSize: '16px',
  },
  hiddenFileInput: {
    display: 'none', // Hide the file input
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Maintain aspect ratio while filling the box
    position: 'absolute', // Position the image inside the box
    top: 0,
    left: 0,
    borderRadius: '8px', // Match the border radius of the upload box
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
  },
  result: {
    marginTop: '20px',
    textAlign: 'left',
    display: 'inline-block',
    color: '#555',
  },
};

export default Upload;
