"use client";

import React, { useState, useRef, useEffect } from "react";
import useHoverSound from "@/hooks/sfxHover";
import { TbLockFilled } from "react-icons/tb";
import { BsUnlockFill } from "react-icons/bs";
import Image from "next/image";

// Password Modal component
const PasswordModal: React.FC<{ isOpen: boolean; onClose: () => void; onUnlock: () => void }> = ({
  isOpen,
  onClose,
  onUnlock
}) => {
  const [password, setPassword] = useState<string>("");
  const correctPassword = "hbdkarin"; // Set your correct password here

  const { clikMouse } = useHoverSound();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === correctPassword) {
      onUnlock(); // Unlocks the button
      onClose(); // Close the modal
    } else {
      alert("Incorrect password, please try again.");
      setPassword(""); // Reset the input field
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Enter Password (tanya kija)</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter password"
            required
          />
          <button
            type="submit"
            onClick={clikMouse}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
            Submit
          </button>
        </form>
        <button className="mt-2 text-red-600 w-full hover:underline" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

interface StoryCardProps {
  title: string;
  imgSrc: string;
  text: string;
  onNext: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, imgSrc, text, onNext }) => {
  const { handleMouseEnter, handleMouseLeave, clikMouse } = useHoverSound();

  const handleClick = () => {
    onNext(); // Call the onNext function to go to the next card
    clikMouse(); // Play the click sound
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="container bg-white rounded-lg shadow-lg p-4 max-w-md">
        <div className="flex justify-between items-center mx-3">
          <h5 className="font-bold text-lg">{title}</h5>
          <button
            className="button-85 font-semibold"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}>
            Next
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <Image
            src={imgSrc}
            alt={title}
            width={"250"}
            height={"250"}
            quality={90}
            className="w-48 h-48 object-cover"
          />
          <p className="mt-2 text-gray-700 font-semibold">{text}</p>
        </div>
      </div>
    </div>
  );
};

const StoryComponent: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<number>(-1);
  const [storyFinished, setStoryFinished] = useState<boolean>(false);
  const [showClips, setShowClips] = useState<boolean>(false);
  const [showVoicePack, setShowVoicePack] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showGift, setShowGift] = useState<boolean>(false);
  const [showGiftMessage, setShowGiftMessage] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const storyData = [
    { title: "Karin Nathania", imgSrc: "/assets/B3.png", text: "Ehh dimana ini?" },
    { title: "???", imgSrc: "/assets/ic.svg", text: "Halo selamat datang di planet TDR5000" },
    { title: "Karin Nathania", imgSrc: "/assets/B3.png", text: "Haa!!? Planet TDR5000?" },
    {
      title: "???",
      imgSrc: "/assets/ic.svg",
      text: "Iya, ini adalah planet yang kamu landasi ketika terjadinya disorientasi waktu yang terjadi di galaxy"
    },
    {
      title: "???",
      imgSrc: "/assets/ic.svg",
      text: "Jadi mungkin kamu dapat melihat apa yang sudah terjadi selama kamu melakukan perjalanan sampai sejauh ini 💫"
    }
  ];

  const nextCard = () => {
    if (currentCard < storyData.length - 1) {
      setCurrentCard((prev) => prev + 1);
    } else {
      setCurrentCard(-1); // Close the card if at the end
      setStoryFinished(true); // Mark story as finished
    }
  };

  const { handleMouseEnter, handleMouseLeave, clikMouse } = useHoverSound();

  const startRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setCurrentCard(0); // Start the story
    clikMouse(); // Play the click sound
  };

  useEffect(() => {
    const start = startRef.current;
    if (start) {
      start.addEventListener("click", function () {
        start?.classList.add("hidden");
      });
    }

    return () => {
      if (start) {
        start.removeEventListener("click", () => {});
      }
    };
  }, []);

  const toggleClipsMenu = () => {
    setShowClips((prev) => !prev);
    clikMouse(); // Play the click sound
  };

  const toggleVoicePackMenu = () => {
    setShowVoicePack((prev) => !prev);
    clikMouse(); // Play the click sound
  };

  // Function to handle unlocking
  const unlockContent = () => {
    setIsLocked(false); // Unlock the locked button
    setShowGift(true); // Show the birthday gift content
  };

  const playMusic = () => {
    clikMouse(); // Play hover sound

    // Initialize the audio reference if it hasn't been set
    if (!audioRef.current) {
      audioRef.current = new Audio("assets/hbd.wav");
      audioRef.current.volume = 0.3; // Adjust the volume
    }

    const audio = audioRef.current; // Use the audio reference

    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Error playing music:", error);
        audio.currentTime = 0; // Reset to start on error
      });
    } else {
      audio.pause(); // Pause if it's already playing
    }
  };

  return (
    <>
      <div className="bg2"></div>
      <div className="flex justify-center items-center text-center min-h-screen">
        <button
          ref={startRef}
          className="button-85 font-semibold"
          type="button"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          Start Story
        </button>

        {/* Render the current story card or the menu */}
        {currentCard >= 0 ? (
          <StoryCard
            title={storyData[currentCard].title}
            imgSrc={storyData[currentCard].imgSrc}
            text={storyData[currentCard].text}
            onNext={nextCard}
          />
        ) : (
          storyFinished && (
            <div className="flex flex-col gap-5 w-[16rem]">
              <button
                onClick={toggleClipsMenu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="button-85 font-bold">
                Karin Clips 📸
              </button>
              <button
                onClick={toggleVoicePackMenu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="button-85 font-bold">
                Karin Voice 🎤
              </button>

              {/* Locked Button */}
              {isLocked ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="button-85 font-bold flex items-center justify-center gap-2">
                  Locked <TbLockFilled size={20} />
                </button>
              ) : (
                <button
                  onClick={clikMouse}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="button-85 font-bold flex items-center justify-center gap-2">
                  Unlocked <BsUnlockFill size={20} />
                </button>
              )}

              {/* Show Akiza Gift */}
              {showGift && (
                <button
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    setShowGiftMessage(true);
                    clikMouse(); // Show the gift message instead
                  }}
                  className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-xl transform transition-transform hover:scale-105">
                  Akiza Gift 🎁
                </button>
              )}
            </div>
          )
        )}
      </div>

      {/* Akiza Gift Message */}
      {showGiftMessage && (
        <div
          id="akizaGift"
          className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full text-center">
            <div className="card-body">
              <h3 className="text-2xl font-extrabold text-purple-600 mb-4">
                Happy Birthday, Karin Nathania! 🎉
              </h3>
              <p className="text-lg font-medium text-gray-700 mb-4">Dear Karin,</p>
              <p className="text-base text-gray-600 mb-4">
                Wishing you a day filled with love, joy, and endless happiness. May all your dreams
                and wishes come true, and may this year bring you even closer to your goals and
                aspirations. You are such an incredible person, and I hope this special day is as
                amazing as you are!
              </p>
              <p className="text-base text-gray-600 mb-4">
                Keep shining brightly, keep spreading joy, and always remember how much you{"'"}re
                appreciated by those around you. I{"'"}m grateful for all the wonderful memories,
                and I can{"'"}t wait to create more with you in the future. Have a fantastic
                birthday!
              </p>
              <p className="font-semibold text-gray-800">
                Best wishes,
                <br />
                Akiza ❄️
              </p>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <button
                onClick={playMusic}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                My Gift
              </button>
              <button
                onClick={() => {
                  setShowGiftMessage(false);
                  clikMouse();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clips menu */}
      {showClips && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-gray-200 px-4">
          <div className="container bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full">
            <h5 className="font-bold text-xl text-center mb-6 text-white">Karin Clips</h5>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div className="w-full lg:w-1/2">
                <h2 className="mb-4 text-center font-semibold text-white">Gak Usah</h2>
                <video controls loop className="w-full rounded-lg">
                  <source src="assets/clp1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-center mt-2 text-gray-300">Aduhh iyaa karinn😝</p>
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="mb-4 text-center font-semibold text-white">Suamiku</h2>
                <video controls loop className="w-full rounded-lg">
                  <source src="assets/clp2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-center mt-2 text-gray-300">Iyaa Istrikuuu 🤍</p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={toggleClipsMenu}
                className="button-85 font-bold text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice pack menu */}
      {showVoicePack && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-gray-200 px-4">
          <div className="container bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full">
            <h5 className="font-bold text-xl text-center mb-6 text-white">Karin Voice Pack</h5>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div className="w-full lg:w-1/2">
                <h2 className="mb-4 text-center font-semibold text-white">Voice Clip 1</h2>
                <audio controls className="w-full rounded-lg">
                  <source src="assets/vk1.mp3" type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <p className="text-center mt-2 text-gray-300">"Letsgoo."</p>
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="mb-4 text-center font-semibold text-white">Voice Clip 2</h2>
                <audio controls className="w-full rounded-lg">
                  <source src="assets/vk2.mp3" type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <p className="text-center mt-2 text-gray-300">"AAAAA"</p>
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="mb-4 text-center font-semibold text-white">Voice Clip 3</h2>
                <audio controls className="w-full rounded-lg">
                  <source src="assets/vk3.mp3" type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <p className="text-center mt-2 text-gray-300">"Gomennasaiii 😫"</p>
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="mb-4 text-center font-semibold text-white">Voice Clip 4</h2>
                <audio controls className="w-full rounded-lg">
                  <source src="assets/muaaa.mp3" type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <p className="text-center mt-2 text-gray-300">"🥰🥰🥰."</p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  setShowVoicePack(false);
                  clikMouse();
                }}
                className="button-85 font-bold text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password modal */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUnlock={unlockContent}
      />
    </>
  );
};

export default StoryComponent;
