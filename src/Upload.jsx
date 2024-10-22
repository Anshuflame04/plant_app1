import { useState } from 'react';

function Upload() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [results, setResults] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
    
    try {
      const response = await fetch('http://<your-ip-address>:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        setResults(data.results); // Store results in state
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="upload-container">
      <h1>Plant Disease Detection</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageUpload" className="upload-box">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="image-preview" />
          ) : (
            <div className="upload-placeholder">
              Click to upload an image
            </div>
          )}
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {results && (
        <div className="results">
          <h2>Results:</h2>
          <ul>
            <li>Plant: {results.plant}</li>
            <li>Disease: {results.disease}</li>
            <li>Severity: {results.severity}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Upload;
