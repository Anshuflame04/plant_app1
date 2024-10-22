import { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('tomato'); // Default crop selection

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
      setFileName(file.name);
    }
  };

  const handleCropChange = (crop) => {
    setSelectedCrop(crop);
  };

  const handleUpload = async () => {
    if (!fileName) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', document.getElementById('file-input').files[0]);

    try {
      // Send the POST request to FastAPI with the selected crop
      const response = await axios.post(`http://127.0.0.1:8000/predict/${selectedCrop}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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

        {/* Crop Selection */}
        <div style={styles.cropSelectContainer}>
          <button
            onClick={() => handleCropChange('tomato')}
            style={{
              ...styles.cropButton,
              backgroundColor: selectedCrop === 'tomato' ? '#4CAF50' : '#fff',
              color: selectedCrop === 'tomato' ? '#fff' : '#4CAF50',
            }}
          >
            Tomato
          </button>
          <button
            onClick={() => handleCropChange('potato')}
            style={{
              ...styles.cropButton,
              backgroundColor: selectedCrop === 'potato' ? '#4CAF50' : '#fff',
              color: selectedCrop === 'potato' ? '#fff' : '#4CAF50',
            }}
          >
            Potato
          </button>
        </div>

        {/* Square Upload Box */}
        <div
          style={styles.uploadBox}
          onClick={() => document.getElementById('file-input').click()}
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
            style={styles.hiddenFileInput}
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
  cropSelectContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  cropButton: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #4CAF50',
    cursor: 'pointer',
    flex: '1',
    margin: '0 5px',
    transition: 'background-color 0.3s',
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
    position: 'relative',
    overflow: 'hidden',
  },
  uploadText: {
    color: '#4CAF50',
    fontSize: '16px',
  },
  hiddenFileInput: {
    display: 'none',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: '8px',
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
    color: '#333',
  },
};

export default Upload;
