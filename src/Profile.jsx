// src/Profile.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig'; // Import Firebase auth and Firestore
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // For Firestore
import './Profile.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    number: '',
    email: '',
    age: '',
    gender: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // Toggle edit mode

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser; // Get the current logged-in user

      if (user) {
        const userDocRef = doc(db, 'users', user.uid); // Reference to the user's Firestore document
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          setUserDetails(userSnapshot.data()); // Populate the form with data from Firestore
        }
      }
      setLoading(false); // Stop the loading indicator
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid); // Reference to Firestore document

      try {
        await updateDoc(userDocRef, {
          name: userDetails.name,
          number: userDetails.number,
          age: userDetails.age,
          gender: userDetails.gender,
          location: userDetails.location,
        });
        setEditing(false); // Exit edit mode after saving
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile: ', error);
        alert('Error updating profile');
      }
    }
  };

  if (loading) {
    return <p>Loading profile...</p>; // Show a loading message while fetching data
  }

  return (
    <div className="user-profile">
      <h2>Profile</h2>
      <div className="profile-image-container">
        {/* Placeholder for Profile Picture */}
        <div className="placeholder-image">Profile Picture</div>
      </div>

      {/* Form fields for the user's details */}
      <div className="profile-details">
        {[
          { label: 'Name', name: 'name' },
          { label: 'Phone Number', name: 'number' },
          { label: 'Email', name: 'email', disabled: true },
          { label: 'Age', name: 'age' },
          { label: 'Gender', name: 'gender' },
          { label: 'Location', name: 'location' },
        ].map((detail) => (
          <div className="profile-detail" key={detail.name}>
            <label>{detail.label}:</label>
            <input
              type={detail.disabled ? 'text' : 'text'}
              name={detail.name}
              value={userDetails[detail.name]}
              onChange={handleChange}
              disabled={detail.disabled || !editing} // Disable if not editable
            />
          </div>
        ))}
      </div>

      {/* Buttons to toggle edit mode and save changes */}
      {!editing ? (
        <button onClick={() => setEditing(true)} className="edit-button">Edit</button>
      ) : (
        <button onClick={handleSave} className="save-button">Save</button>
      )}
    </div>
  );
};

export default Profile;
