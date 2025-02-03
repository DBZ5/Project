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
            src="https://imgs.search.brave.com/gv0JkcyuwZbUWLo6KUbtjB8jsU8jYxeQEAXCMdihkwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8x/LzE4L0FtYXpvbi5k/ZV8xMjA0Xy1fcGFu/b3JhbWlvLmpwZw"
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
      <div className="info-section">
        <div className="info-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M7.5 19q-1.038 0-1.77-.73T5 16.5H2.77l.218-1h2.268q.271-.667.875-1.084Q6.735 14 7.5 14t1.37.416q.603.417.874 1.084h4.618L16.558 6H5.608l.023-.098q.073-.392.38-.647T6.735 5h11.073l-.81 3.5h2.079l2.712 3.616l-.866 4.384h-1.154q0 1.039-.73 1.77t-1.77.73t-1.769-.73t-.73-1.77H10q0 1.039-.73 1.77T7.5 19m8.387-5.75h4.651l.177-.89l-2.138-2.86h-1.818zm.428-6.248L16.559 6l-2.197 9.5l.243-1.002l.792-3.496zM1.674 12.998l.25-1h4.48l-.25 1zm2-3.496l.25-1h5.48l-.25 1zM7.5 18q.617 0 1.059-.441Q9 17.117 9 16.5t-.441-1.059T7.5 15t-1.059.441Q6 15.883 6 16.5t.441 1.059Q6.883 18 7.5 18m9.77 0q.617 0 1.058-.441q.441-.442.441-1.059t-.441-1.059T17.269 15t-1.058.441q-.442.442-.442 1.059t.441 1.059q.442.441 1.06.441"
            />
          </svg>
          <h4>FREE AND FAST DELIVERY</h4>
          <p>Free delivery for all orders over $140</p>
        </div>

        <div className="info-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M8.077 20H4v-7.997q0-1.666.626-3.121T6.34 6.34t2.54-1.714T12 4t3.12.626t2.54 1.714t1.713 2.542t.626 3.121V20h-4.077v-6.154H19V12q0-2.925-2.037-4.962T12 5T7.038 7.038T5 12v1.846h3.077zm-1-5.154H5V19h2.077zm9.846 0V19H19v-4.154zm-9.846 0H5zm9.846 0H19z"
            />
          </svg>
          <h4>24/7 CUSTOMER SERVICE</h4>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className="info-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <g
              fill="white"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color="#000000"
            >
              <path d="M20.943 16.835a15.76 15.76 0 0 0-4.476-8.616c-.517-.503-.775-.754-1.346-.986C14.55 7 14.059 7 13.078 7h-2.156c-.981 0-1.472 0-2.043.233c-.57.232-.83.483-1.346.986a15.76 15.76 0 0 0-4.476 8.616C2.57 19.773 5.28 22 8.308 22h7.384c3.029 0 5.74-2.227 5.25-5.165" />
              <path d="M7.257 4.443c-.207-.3-.506-.708.112-.8c.635-.096 1.294.338 1.94.33c.583-.009.88-.268 1.2-.638C10.845 2.946 11.365 2 12 2s1.155.946 1.491 1.335c.32.37.617.63 1.2.637c.646.01 1.305-.425 1.94-.33c.618.093.319.5.112.8l-.932 1.359c-.4.58-.599.87-1.017 1.035S13.837 7 12.758 7h-1.516c-1.08 0-1.619 0-2.036-.164S8.589 6.38 8.189 5.8zm6.37 8.476c-.216-.799-1.317-1.519-2.638-.98s-1.53 2.272.467 2.457c.904.083 1.492-.097 2.031.412c.54.508.64 1.923-.739 2.304c-1.377.381-2.742-.214-2.89-1.06m1.984-5.06v.761m0 5.476v.764" />
            </g>
          </svg>
          <h4>MONEY BACK GUARANTEE</h4>
          <p>We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default About;
