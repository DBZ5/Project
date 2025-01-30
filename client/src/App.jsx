
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './components/AdminPage';
import './App.css';


import Footer from "./components/Footer";

function App() {

  const { isAuthenticated } = useSelector((state) => state.auth);
  const GOOGLE_CLIENT_ID =
    "181292479338-qu3s0buf3v2rqn891qcg9ca3pjdadkoc.apps.googleusercontent.com"; // Replace with your Google Client ID

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<MainPage />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/contact" element={<Contact />} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/signup" element={<SignUp />} />
    //     <Route path="/cart" element={<Cart />} />
    //     <Route path="/payment" element={<Payment />} />
    //   </Routes>
    // </Router>
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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
      <Footer />
    </GoogleOAuthProvider>
  );
}

export default App;
 