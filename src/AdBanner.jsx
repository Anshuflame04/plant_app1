// import React, { useEffect } from 'react';

// const AdBanner = () => {
//   useEffect(() => {
//     (window.adsbygoogle = window.adsbygoogle || []).push({});
//   }, []);

//   return (
//     <div style={{ textAlign: 'center', margin: '20px 0' }}>
//       <ins
//         className="adsbygoogle"
//         style={{ display: 'block' }}
//         data-ad-client="ca-pub-6024571470980710"  // Publisher ID
//         data-ad-slot="3829690171"  // Ad Unit ID for banner ad
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       ></ins>
//     </div>
//   );
// };

// export default AdBanner;

import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    // This pushes the ad request to the adsbygoogle queue
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log('AdBanner initialized and ad pushed to the adsbygoogle queue.');
    } catch (e) {
      console.error('Ad failed to load:', e);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6024571470980710"  // Your Publisher ID
        data-ad-slot="3829690171"  // Your Ad Unit ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
