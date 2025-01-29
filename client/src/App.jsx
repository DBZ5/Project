import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import LoginPage from "./components/Login";
import MainPage from "./components/MainPage";
import Darkmode from "darkmode-js";
import SignUp from "./components/SignUp";
import AdminPage from "./components/AdminPage";

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
 