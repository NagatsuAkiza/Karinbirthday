"use client";

import React from "react";
import useGroupButton from "@/hooks/groupButton";
import useHoverSound from "@/hooks/sfxHover";
import Countdown from "@/components/Countdown";
import SecondSec from "@/components/sections/SecondSec";

const FirstSec: React.FC = () => {
  const [showCountdown, setShowCountdown] = React.useState(false);
  const [showSecondSec, setShowSecondSec] = React.useState(false);

  const startCountdown = () => {
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setShowSecondSec(true);
  };

  const { btn1Ref, btn2Ref, sec1Ref, musMRef, backBRef, playRef, bg1Ref } =
    useGroupButton(startCountdown);
  const { handleMouseEnter, handleMouseLeave, clikMouse } = useHoverSound();

  return (
    <>
      <div className="bg1" ref={bg1Ref}></div>
      {!showSecondSec ? (
        <div className="justify-center items-center flex min-h-screen">
          <div className="flex flex-col gap-4 mr-6" ref={sec1Ref}>
            <button
              className="button-85 font-bold"
              ref={btn1Ref}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={clikMouse}>
              Start
            </button>
            <button
              className="button-85 font-bold"
              ref={btn2Ref}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={clikMouse}>
              Select Music
            </button>
          </div>

          <div className="flex-col gap-4 hidden mr-6" ref={musMRef}>
            <h2>Music Menu</h2>
            <button
              className="button-85 font-bold"
              ref={playRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={clikMouse}>
              Undertale
            </button>
            <button
              className="button-85 font-bold"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={clikMouse}>
              Missing...
            </button>
            <button
              className="button-85 font-bold"
              ref={backBRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={clikMouse}>
              Back
            </button>
          </div>

          {/* Countdown Section */}
          <div className="font-bold text-2xl text-center">
            {/* Countdown Section */}
            {showCountdown && <Countdown onComplete={handleCountdownComplete} />}
          </div>
        </div>
      ) : (
        <SecondSec />
      )}
    </>
  );
};

export default FirstSec;
