// Ads.jsx
import React from 'react';
import { AdMobBanner } from '@react-native-firebase/admob';

const Ads = () => {
  return (
    <AdMobBanner
      adUnitID="ca-app-pub-6024571470980710/3829690171" // Replace with your Ad Unit ID
      servePersonalizedAds={true} // Set to false to disable personalized ads
      style={{ marginBottom: 10 }} // Adjust margin as needed
      onAdFailedToLoad={(error) => console.error('Ad failed to load:', error)}
    />
  );
};

export default Ads;
