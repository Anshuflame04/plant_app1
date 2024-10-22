import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login'; // Import the login component
import MainContent from './MainContent'; // Import the new main content component
import { ThemeContext } from './ThemeContext'; // Import the ThemeContext
import { auth } from './firebaseConfig'; // Import Firebase auth config
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth state check

function App() {
  const { toggleTheme, isDarkMode } = useContext(ThemeContext); // Use context to access theme state
  const [user, setUser] = useState(null); // State to store user
  const [loading, setLoading] = useState(true); // Loading state while checking auth

  // Check if user is logged in on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
      setLoading(false); // Stop loading once auth check is complete
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner while checking auth state
  }

  return (
    <Router>
      <div>
        <Routes>
          {/* Redirect to MainContent if user is logged in, otherwise show Login */}
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/*" element={user ? <MainContent /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
