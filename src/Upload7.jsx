import { useState } from 'react';
import axios from 'axios';
import { db, storage } from './firebaseConfig'; // Import Firebase config
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import Result from './Result'; // Import the Result component
import './Upload6.css'; // Import the CSS styles

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
    const file = document.getElementById('file-input').files[0];
    formData.append('file', file);

    try {
      const response = await axios.post(`https://backend-test-kjto.onrender.com/predict/${selectedCrop}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${fileName}`);
      await uploadBytes(storageRef, file);

      // Save prediction details in Firestore
      const predictionDoc = await addDoc(collection(db, 'predictions'), {
        crop: selectedCrop,
        diseaseDetected: response.data.predicted_disease,
        confidence: response.data.confidence_score,
        imageUrl: `images/${fileName}`,
        date: new Date().toISOString(),
      });

      setPrediction({ ...response.data, id: predictionDoc.id });
    } catch (error) {
      console.error('Error uploading the file:', error);
      alert('Failed to upload the file. Please try again.');
    }
  };

  // If prediction exists, show the Result component instead of the Upload component
  if (prediction) {
    return (
      <Result
        selectedCrop={selectedCrop}
        uploadedImage={selectedFile}
        prediction={prediction}
      />
    );
  }

  // Render the Upload component
  return (
    <div className="upload-container">
      <div className="upload-card">
        <h1 className="upload-title">Upload Image for Disease Prediction</h1>

        {/* Crop Selection */}
        <div className="crop-select-container">
          {['tomato', 'potato', 'rice', 'wheat', 'apple'].map((crop) => (
            <div
              key={crop}
              className={`crop-circle ${selectedCrop === crop ? 'selected' : ''}`}
              onClick={() => handleCropChange(crop)}
            >
              {crop.charAt(0).toUpperCase() + crop.slice(1)}
            </div>
          ))}
        </div>

        {/* Image Upload Box */}
        <div
          className="upload-box"
          onClick={() => document.getElementById('file-input').click()}
        >
          {selectedFile ? (
            <img src={selectedFile} alt="Uploaded" className="image-preview" />
          ) : (
            <p className="upload-text">Click or Drop an Image Here</p>
          )}
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            className="hidden-file-input"
          />
        </div>

        <button onClick={handleUpload} className="upload-button">
          Upload and Predict
        </button>
      </div>
    </div>
  );
};

export default Upload;
