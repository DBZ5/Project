
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/Login';
import SignUp from './components/SignUp';
import ProductDetails from './components/ProductDetails';
import Wishlist from './components/Wishlist';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './components/AdminPage';
import Profile from './components/Profile';
import './App.css';
import Footer from "./components/Footer";

function App() {

  const { isAuthenticated } = useSelector((state) => state.auth);
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Make sure this matches your .env variable

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/about" element={<íAbout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
      <Footer />
    </GoogleOAuthProvider>
  );
}

export default App;
 