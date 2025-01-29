import Darkmode from "darkmode-js";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const options = {
    bottom: "64px", // default: '32px'
    right: "unset", // default: '32px'
    left: "32px", // default: 'unset'
    time: "0.5s", // default: '0.3s'
    mixColor: "#fff", // default: '#fff'
    backgroundColor: "#fff", // default: '#fff'
    buttonColorDark: "#100f2c", // default: '#100f2c'
    buttonColorLight: "#fff", // default: '#fff'
    saveInCookies: false, // default: true,
    label: "🌒", // default: ''
    autoMatchOsTheme: true, // default: true
  };

  new Darkmode(options).showWidget();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google Client ID

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
