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
import BestSelling from "./components/bestSelling";
import AllProducts from "./components/allProducts";
import Footer from "./components/Footer";
import AdminRoute from './components/AdminRoute';
import UpdatePassword from './components/UpdatePassword';
import SellerPage from "./components/sellerpage";
import SellerRoute from './components/SellerRoute';

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
          <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        } 
      />
      <Route 
        path="/seller" 
        element={
          <SellerRoute>
            <SellerPage />
          </SellerRoute>
        } 
      />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/seller" element={<SellerPage />} />
        </Routes>
      </Router>
      <Footer />
    </GoogleOAuthProvider>
  );
}

export default App;
