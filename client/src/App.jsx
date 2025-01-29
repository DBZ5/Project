import Darkmode from "darkmode-js";
<<<<<<< HEAD
import SignUp from "./components/SignUp";
import About from "./components/About";
import Contact from "./components/Contact";
import { NavLink } from "react-router-dom";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
=======
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Navbar from './components/Navbar';
>>>>>>> 201badb22eb9018d9567e3537f3bf1c45c1224d3

function App() {
  const options = {
    bottom: "64px", // default: '32px'
    right: "52px", // default: '32px'
    left: "unset", // default: 'unset'
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
  const GOOGLE_CLIENT_ID = "181292479338-qu3s0buf3v2rqn891qcg9ca3pjdadkoc.apps.googleusercontent.com"; // Replace with your Google Client ID

  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
=======
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
>>>>>>> 201badb22eb9018d9567e3537f3bf1c45c1224d3
  );
}

export default App;
