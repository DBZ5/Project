import { useEffect,useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'

function App() {

  return  <Router>
  <Routes>
         <Route path="/login" element={<LoginPage  />} />
        <Route path="/main" element={<MainPage  />} />
         <Route path="/Signup" element={<SignUp  />} />
     </Routes>
     </Router>
}

export default App
