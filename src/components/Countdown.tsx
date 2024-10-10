import React, { useEffect, useState, useRef } from "react";

interface CountdownProps {
  onComplete: () => void; // Callback when countdown is complete
}

const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(5); // Starting at 3
  const landShipRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const ls = (landShipRef.current = new Audio("/assets/sl.mp3"));
    ls.volume = 0.4;
    ls.play();

    if (countdown <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Clear the interval when the component unmounts
  }, [countdown, onComplete]);

  return (
    <div className="font-bold text-2xl text-center">
      {countdown > 0 ? <span>{countdown}</span> : <span>Landing!</span>}
    </div>
  );
};

export default Countdown;
