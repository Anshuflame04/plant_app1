import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './ThemeContext'; // Import your ThemeProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* Wrap your app with ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);