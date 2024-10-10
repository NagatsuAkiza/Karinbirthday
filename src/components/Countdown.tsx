import useGroupButton from "@/hooks/groupButton";
import React, { useEffect, useState, useRef } from "react";

interface CountdownProps {
  onComplete: () => void; // Callback when countdown is complete
}

const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(15);
  const overRef = useRef<HTMLDivElement | null>(null);

  const over = overRef.current;

  useEffect(() => {
    if (countdown <= 0) {
      setTimeout(() => {
        over?.classList.add("fade-out");
        over?.classList.add("fade-out-active");
        setTimeout(() => {
          onComplete();
          over?.classList.add("fade-in-active");
          over?.classList.add("fade-in");
          over?.classList.add("hidden");
        }, 600);
      }, 1000);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onComplete]);

  return (
    <div className="flex justify-center items-center">
      {countdown >= 0 ? (
        <div
          ref={overRef}
          className="flex flex-col bg-black w-screen h-screen justify-center items-center font-bold text-2xl text-white text-center">
          <span>Landing In</span>
          <span>{countdown}</span>
        </div>
      ) : (
        <div className="fade-in fade-in-active flex font-bold text-2xl text-white text-center">
          Ship Landing
        </div>
      )}
    </div>
  );
};

export default Countdown;
