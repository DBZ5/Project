import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
// import LoginPage from './components/LoginPage';
import MainPage from "./components/MainPage";
import Darkmode from "darkmode-js";
import ProductPage from "./components/ProductPage";
// import SignUp from './components/SignUp';

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
        {/* <Route path="/login" element={<LoginPage  />} /> */}
        <Route path="/main" element={<MainPage />} />
        <Route path="/product" element={<ProductPage />} />
        {/* <Route path="/Signup" element={<SignUp  />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
