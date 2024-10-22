import React, { useEffect, useState } from 'react';
import { db, storage, auth } from './firebaseConfig'; // Import Firebase config and auth
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage'; // Import for fetching image URLs
import './History.css'; // Import your CSS file
// import Ads from './Ads'; // Import the Ads component

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser; // Get the current logged-in user

      if (!user) {
        console.log("No user is logged in");
        return;
      }

      const userId = user.uid; // Get the user's ID

      // Query to get predictions made by the current user
      const predictionsCollection = collection(db, 'predictions');
      const userPredictionsQuery = query(predictionsCollection, where('userId', '==', userId));
      const predictionsSnapshot = await getDocs(userPredictionsQuery);

      // Query to get feedback for this user's predictions
      const feedbackCollection = collection(db, 'feedbacks');
      const feedbackSnapshot = await getDocs(feedbackCollection);

      const predictionsData = predictionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const feedbackData = feedbackSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Combine predictions and feedback
      const combinedHistory = predictionsData.map(prediction => ({
        ...prediction,
        feedback: feedbackData.filter(fb => fb.predictionId === prediction.id),
      }));

      // Fetch download URLs for images
      const historyWithImages = await Promise.all(combinedHistory.map(async (item) => {
        const imageRef = ref(storage, item.imageUrl); // Use item.imageUrl directly
        const imageUrl = await getDownloadURL(imageRef); // Get the download URL
        return {
          ...item,
          imageUrl // Add the image URL to the item
        };
      }));

      setHistory(historyWithImages);
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h1>Prediction History</h1>
      {/* <Ads /> Place the Ads Component here */}
      <div className="history-cards">
        {history.map((item) => (
          <div className="history-card" key={item.id}>
            <img src={item.imageUrl} alt={`${item.crop} disease`} className="history-image" />
            <div className="history-details">
              <h4>{item.crop.charAt(0).toUpperCase() + item.crop.slice(1)} Crop</h4>
              <p style={{ margin: '0' }}><strong>Disease Detected:</strong> {item.diseaseDetected}</p>
              <p style={{ margin: '0' }}><strong>Confidence:</strong> {parseFloat(item.confidence).toFixed(2)}%</p>
              <p style={{ margin: '0', fontSize: 'smaller' }}><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
              <p style={{ margin: '0' }}><strong>Feedback:</strong>
                {item.feedback.length > 0 ? (
                  <span>
                    {item.feedback.map(fb => (
                      <span key={fb.id} style={{ marginRight: '5px' }}>
                        {fb.useful ? '👍 Useful' : '👎 Not Useful'}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span> Not given</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
