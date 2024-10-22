import './About.css'; // Import the CSS file for the About page

const About = () => {
  return (
    <div className="about-container">
      <h1>About Our App</h1>
      <p className="app-description">
        Welcome to our AI-powered plant disease detection app! This application helps farmers and gardeners
        easily identify diseases in plants by uploading photos. Using state-of-the-art AI and Machine Learning models,
        we provide accurate results to assist in taking corrective measures quickly. Our app also offers advice on
        disease prevention and possible treatments.
      </p>
      <h2>Features:</h2>
      <ul className="features-list">
        <li>Upload plant images to detect diseases</li>
        <li>Receive suggestions for treatments and preventive measures</li>
        <li>Join a community of plant lovers to share tips and knowledge</li>
      </ul>
    </div>
  );
};

export default About;
