// src/ImageUpload.jsx
import React, { useState } from 'react';
import { storage } from './firebaseConfig'; // Adjust this import based on your Firebase setup
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ImageUpload = ({ userId }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    // Create a storage reference
    const imageRef = ref(storage, `profileImages/${userId}`);

    // Upload the image
    await uploadBytes(imageRef, image);

    // Get the download URL
    const downloadURL = await getDownloadURL(imageRef);

    // Store in local storage
    localStorage.setItem('userPhotoURL', downloadURL);

    // Reset the image state
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Image Preview" />}
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
