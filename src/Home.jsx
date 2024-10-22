import React, { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig'; // Import Firebase auth and Firestore
import './Home.css'; // Import the CSS file for styles
import NewImage from './assets/HomePlant.jpg'; // Adjust the path to your new image
import { doc, getDoc } from 'firebase/firestore'; // Firestore for user details

const Home = () => {
  const [userName, setUserName] = useState(''); // State to store user's name

  // Fetch the user's details from Firebase Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser; // Get current authenticated user

      if (user) {
        const userDocRef = doc(db, 'users', user.uid); // Reference to the Firestore document
        const userSnapshot = await getDoc(userDocRef); // Fetch user details

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserName(userData.name); // Set the user's name
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="home-container">
      <h3>by @AnshuFlame</h3>
      <div className="image-container">
        <img src={NewImage} alt="Plant Disease Detection" className="centered-image" /> {/* Use new image */}
      </div>
      <p className="welcome-text">Welcome, {userName.split(' ')[0]}!</p> {/* Display first name */}
      <p className="benefits-paragraph">
        This application helps farmers and gardeners identify plant diseases accurately and quickly. By utilizing machine learning algorithms, users can receive real-time insights about their crops, enabling them to take timely actions for prevention and treatment. The benefits include increased crop yield, reduced pesticide use, and sustainable farming practices.
      </p>
    </div>
  );
};

export default Home;
