import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = ({ onCountdownEnd }) => {
  // Initial state to store days, hours, minutes, and seconds
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountdownOver, setIsCountdownOver] = useState(false);
  const timerRef = useRef(null); // Add a ref to store the timer

  useEffect(() => {
    const targetDate = new Date("2025-02-20T09:25:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        // Calculate remaining time
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        // Update state
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If the countdown is over, set all values to 0
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsCountdownOver(true);
        if (onCountdownEnd) onCountdownEnd();
        clearInterval(timerRef.current); // Use the ref to clear the interval
      }
    };

    calculateTimeLeft();
    // Update the countdown every second
    timerRef.current = setInterval(calculateTimeLeft, 1000); // Store the timer in the ref

    // Cleanup interval on component unmount
    return () => clearInterval(timerRef.current); // Use the ref to clear the interval
  }, [onCountdownEnd]);

  return (
    <div className="countdown-container">
      <div className="countdown-item">
        <p>Days</p>
        <h2 className="countdown-number">{timeLeft.days}</h2>
      </div>{" "}
      <p className="countdown-separator">:</p>
      <div className="countdown-item">
        <p>Hours</p>
        <h2 className="countdown-number">{timeLeft.hours}</h2>
      </div>{" "}
      <p className="countdown-separator">:</p>
      <div className="countdown-item">
        <p>Minutes</p>
        <h2 className="countdown-number">{timeLeft.minutes}</h2>
      </div>{" "}
      <p className="countdown-separator">:</p>
      <div className="countdown-item">
        <p>Seconds</p>
        <h2 className="countdown-number">{timeLeft.seconds}</h2>
      </div>
    </div>
  );
};

export default CountdownTimer;
