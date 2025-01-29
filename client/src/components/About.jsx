   // client/src/components/About.jsx
   import React from "react";
   import "../index.css" // Create this CSS file for styling
   import Navbar from "./Navbar";

   const About = () => {
     return (
        
       <div className="about-container">
        <Navbar />
         <div className="about-content">
           <h2>Our Story</h2>
           <p>
             Launched in 2015, Exclusive is South Asia's premier online shopping
             marketplace with an active presence in Bangladesh. Supported by a
             wide range of tailored marketing, data and service solutions,
             Exclusive has 10,500 sellers and 300 brands and serves 3 million
             customers across the region.
           </p>
           <p>
             Exclusive has more than 1 Million products to offer, growing at a
             very fast. Exclusive offers a diverse assortment in categories
             ranging from consumer.
           </p>
         </div>
         <div className="about-image">
           <img src="https://i.postimg.cc/RVnnjjVD/Capture-d-cran-2025-01-28-163446.png" alt="Shopping" />
         </div>
         <div className="team-section">
           <div className="team-member">
             <img src="https://i.postimg.cc/6qpF8rT8/Capture-d-cran-2025-01-28-164800.png" alt="Team Member 1" />
             <h3>Tom Cruise</h3>
             <p>Founder & Chairman</p>
             <div className="social-links">
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
             </div>
           </div>
           <div className="team-member">
             <img src="https://i.postimg.cc/G3XZZ5SG/Capture-d-cran-2025-01-28-164815.png" alt="Team Member 2" />
             <h3>Emma Watson</h3>
             <p>Managing Director</p>
             <div className="social-links">
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
             </div>
           </div>
           <div className="team-member">
             <img src="https://i.postimg.cc/Z58jh9K2/Capture-d-cran-2025-01-28-164829.png" alt="Team Member 3" />
             <h3>Will Smith</h3>
             <p>Product Designer</p>
             <div className="social-links">
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
             </div>
           </div>
         </div>
         <div className="delivery-info">
           <div className="info-item">
             <img src="" alt="Delivery Icon" />
             <h4>FREE AND FAST DELIVERY</h4>
             <p>Free delivery for all orders over $140</p>
           </div>
           <div className="info-item">
             <img src="" alt="Customer Service Icon" />
             <h4>24/7 CUSTOMER SERVICE</h4>
             <p>Friendly 24/7 customer support</p>
           </div>
           <div className="info-item">
             <img src="" alt="Money Back Icon" />
             <h4>MONEY BACK GUARANTEE</h4>
             <p>We return money within 30 days</p>
           </div>
         </div>
       </div>
     );
   };

   export default About;