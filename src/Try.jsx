import React from 'react';
import AdBanner from './AdBanner'; // Import your AdBanner component

const Try = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test Ad Display</h1>
      <p>Below is a test ad to check if AdMob/AdSense is displaying correctly:</p>
      {/* Display the AdBanner component */}
      <AdBanner />
      <p>Scroll down to test placement of the ad:</p>
      {/* Another ad, if you want to test multiple placements */}
      <AdBanner />
    </div>
  );
};

export default Try;
