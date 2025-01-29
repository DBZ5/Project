import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  // Initial state to store days, hours, minutes, and seconds
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-02-28T00:00:00"); // Target countdown date

    const calculateTimeLeft = () => {
      const now = new Date(); // Current date and time
      const difference = targetDate - now; // Time difference in milliseconds

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
        clearInterval(timer); // Clear the interval when the countdown ends
      }
    };

    // Update the countdown every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Countdown to 2025-02-28</h1>
      <div className="flex space-x-4 text-xl font-semibold">
        <div>
          <span>{timeLeft.days}</span> days
        </div>
        <div>
          <span>{timeLeft.hours}</span> hours
        </div>
        <div>
          <span>{timeLeft.minutes}</span> minutes
        </div>
        <div>
          <span>{timeLeft.seconds}</span> seconds
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
