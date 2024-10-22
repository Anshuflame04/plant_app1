import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { ThemeContext } from './ThemeContext';
import './MainContent.css';
import Home from './Home';
import Upload from './Upload8';
import Community from './Community';
import ChatExpert from './ChatExpert';
import { FaSearch, FaEllipsisV, FaHome, FaUpload, FaUsers, FaComments } from 'react-icons/fa';
import OptionsMenu from './OptionsMenu';
import Login from './Login';
import Settings from './Settings';
import Profile from './Profile';
import History from './History';
import About from './About'; // Import the About component
import Dashboard from './Dashboard'; // Import the Dashboard component
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const MainContent = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // State to hold user details

  // Toggle the options menu when the three dots are clicked
  const toggleOptions = () => {
    setShowOptions((prev) => !prev); // Toggle the options menu
  };

  // Fetch user details from Firebase when user is authenticated
  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`); // Adjust path according to your Firebase structure
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            setUserDetails(snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error("Error fetching user data:", error);
        });
      } else {
        setUserDetails(null); // Reset user details on logout
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Determine if swipe should be enabled
  const swipeEnabled =
    !showOptions &&
    !['/login', '/settings', '/profile', '/history', '/about'].includes(location.pathname); // Disable swipe on OptionsMenu items

  // Swipeable settings with reduced sensitivity
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (swipeEnabled) navigateNext();
    },
    onSwipedRight: () => {
      if (swipeEnabled) navigatePrev();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 50, // Adjust this value to change swipe sensitivity
  });

  const navigateNext = () => {
    switch (location.pathname) {
      case '/home':
        navigate('/upload');
        break;
      case '/upload':
        navigate('/community');
        break;
      case '/community':
        navigate('/chatexpert');
        break;
      case '/chatexpert':
      default:
        navigate('/home');
    }
  };

  const navigatePrev = () => {
    switch (location.pathname) {
      case '/upload':
        navigate('/home');
        break;
      case '/community':
        navigate('/upload');
        break;
      case '/chatexpert':
        navigate('/community');
        break;
      case '/home':
      default:
        navigate('/chatexpert');
    }
  };

  return (
    <div className={`container ${isDarkMode ? 'dark' : 'light'}`} {...(swipeEnabled ? handlers : {})}>
      <div className={`header ${isDarkMode ? 'dark' : 'light'}`}>
        <h1 className="app-name">FLamingICE</h1>
        <div className="header-icons">
          <FaSearch className="icon search-icon" />
          <FaEllipsisV className="icon menu-icon" onClick={toggleOptions} style={{ marginRight: '15px' }} />
        </div>
      </div>

      {showOptions && <OptionsMenu toggleOptions={toggleOptions} />}

      <div className={`content ${isDarkMode ? 'dark' : 'light'}`}>
        {userDetails && (
          <div className="user-details">
            <img src={userDetails.photo} alt="User" className="user-photo" />
            <p>Name: {userDetails.name}</p>
            <p>Phone: {userDetails.phone}</p>
            <p>Email: {userDetails.email}</p>
            <p>Age: {userDetails.age}</p>
            <p>Gender: {userDetails.gender}</p>
          </div>
        )}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/community" element={<Community />} />
          <Route path="/chatexpert" element={<ChatExpert />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
        <Link to="/home" className={`footerButton ${location.pathname === '/home' ? 'active' : ''}`}>
          <FaHome className="footer-icon" />
          Home
        </Link>
        <Link to="/upload" className={`footerButton ${location.pathname === '/upload' ? 'active' : ''}`}>
          <FaUpload className={`footer-icon`} />
          Upload
        </Link>
        <Link to="/community" className={`footerButton ${location.pathname === '/community' ? 'active' : ''}`}>
          <FaUsers className={`footer-icon`} />
          Community
        </Link>
        <Link to="/chatexpert" className={`footerButton ${location.pathname === '/chatexpert' ? 'active' : ''}`}>
          <FaComments className={`footer-icon`} />
          ChatExpert
        </Link>
      </footer>
    </div>
  );
};

export default MainContent;