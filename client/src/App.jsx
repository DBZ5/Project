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
import About from "./components/About";
import Contact from "./components/Contact";
import { NavLink } from "react-router-dom";
import Cart from "./components/Cart";
import Payment from "./components/Payment";

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
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
