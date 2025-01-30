import React from "react";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-info-top">
            <div className="contact-info-icon-container">
              <svg
                className="contact-info-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3M6.025 9l1.65-1.65L7.25 5H5.025q.125 1.025.35 2.025T6.025 9m8.95 8.95q.975.425 1.988.675T19 18.95v-2.2l-2.35-.475zm0 0"
                />
              </svg>
              <h2>Call To Us</h2>
            </div>
            <div className="contact-info-text-container">
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
            </div>
          </div>
          <hr />
          <div className="contact-info-bottom">
            <div className="contact-info-icon-container">
              <svg
                className="contact-info-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zM20 8l-7.475 4.675q-.125.075-.262.113t-.263.037t-.262-.037t-.263-.113L4 8v10h16zm-8 3l8-5H4zM4 8v.25v-1.475v.025V6v.8v-.012V8.25zv10z"
                />
              </svg>
              <h2>Write To Us</h2>
            </div>
            <div className="contact-info-text-container">
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>
        <form className="contact-form">
          <input
            className="contact-input"
            type="text"
            placeholder="Your Name"
          />
          <input
            className="contact-input"
            type="email"
            placeholder="Your Email"
          />
          <textarea
            className="contact-description"
            placeholder="Your Message"
          ></textarea>
          <div className="contact-button-container">
            <button className="contact-button" type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
