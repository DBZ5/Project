// client/src/components/About.jsx
import React from "react";
import "../index.css"; // Create this CSS file for styling
import Navbar from "./Navbar";

const About = () => {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-content">
        <div className="about-text">
          <h2 className="about-text-h2">Our Story</h2>
          <p className="about-text-p">
            Launched in 1939, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
            <br className="about-text-br" />
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="about-image">
          <img
            className="about-image-img"
            src="https://i.postimg.cc/RVnnjjVD/Capture-d-cran-2025-01-28-163446.png"
            alt="Shopping"
          />
        </div>
      </div>
      <div className="team-section">
        <div className="team-member">
          <img
            className="team-member-img"
            src="https://i.postimg.cc/6qpF8rT8/Capture-d-cran-2025-01-28-164800.png"
            alt="Team Member 1"
          />
          <h3>Tom Cruise</h3>
          <p>Founder & Chairman</p>
          <div className="social-links">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="team-member">
          <img
            className="team-member-img"
            src="https://i.postimg.cc/G3XZZ5SG/Capture-d-cran-2025-01-28-164815.png"
            alt="Team Member 2"
          />
          <h3>Emma Watson</h3>
          <p>Managing Director</p>
          <div className="social-links">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="team-member">
          <img
            className="team-member-img"
            src="https://i.postimg.cc/Z58jh9K2/Capture-d-cran-2025-01-28-164829.png"
            alt="Team Member 3"
          />
          <h3>Will Smith</h3>
          <p>Product Designer</p>
          <div className="social-links">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="delivery-info">
        <div className="info-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffffff"
              d="M7 20q-1.25 0-2.125-.875T4 17H1.5l.45-2h2.825q.425-.475 1-.737T7 14t1.225.263t1 .737H13.4l2.1-9H4.55l.1-.425q.15-.7.687-1.137T6.6 4H18l-.925 4H20l3 4l-1 5h-2q0 1.25-.875 2.125T17 20t-2.125-.875T14 17h-4q0 1.25-.875 2.125T7 20m8.925-7h4.825l.1-.525L19 10h-2.375zm-.475-6.825L15.5 6l-2.1 9l.05-.175l.85-3.65zM.5 13.325l.5-2h5.5l-.5 2zm2-3.65l.5-2h6.5l-.5 2zM7 18q.425 0 .713-.288T8 17t-.288-.712T7 16t-.712.288T6 17t.288.713T7 18m10 0q.425 0 .713-.288T18 17t-.288-.712T17 16t-.712.288T16 17t.288.713T17 18"
            />
          </svg>
          <h4>FREE AND FAST DELIVERY</h4>
          <p>Free delivery for all orders over $140</p>
        </div>
      </div>
      <div className="info-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M4 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm11 0a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2z" />
            <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
          </g>
        </svg>
        <h4>24/7 CUSTOMER SERVICE</h4>
        <p>Friendly 24/7 customer support</p>
      </div>
      <div className="info-item">
        <img src="" alt="Money Back Icon" />
        <h4>MONEY BACK GUARANTEE</h4>
        <p>We return money within 30 days</p>
      </div>
    </div>
  );
};

export default About;
