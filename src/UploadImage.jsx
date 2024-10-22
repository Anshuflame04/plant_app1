import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ crop }) => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Validate file type
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please upload a valid image file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please upload a file');
      return;
    }

    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append('file', file);
    formData.append('crop', crop);

    try {
      const response = await axios.post('/api/upload', formData);
      setPrediction(response.data);
      setError(null);
      setFile(null); // Reset file input after successful upload
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while uploading');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h1>Upload Image for {crop}</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {prediction && (
        <div>
          <h2>Prediction: {prediction.prediction}</h2>
          <p>Confidence: {prediction.confidence.toFixed(2)}%</p>
          <p>Disease Name: {prediction.disease_info.name}</p>
          <p>Cause: {prediction.disease_info.cause}</p>
          <p>Prevention: {prediction.disease_info.prevention}</p>
          <p>Medicines: {prediction.disease_info.medicines}</p>
          <img src={`/uploads/${prediction.image_file}`} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
