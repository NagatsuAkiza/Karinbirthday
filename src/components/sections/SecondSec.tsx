"use client";

import React, { useState, useRef, useEffect } from "react";
import useHoverSound from "@/hooks/sfxHover";
import { TbLockFilled } from "react-icons/tb";

interface StoryCardProps {
  title: string;
  imgSrc: string;
  text: string;
  onNext: () => void; // Callback function for the Next button
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
          <img src={imgSrc} alt={title} className="w-48 h-48 object-cover" />
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

  const storyData = [
    {
      title: "Karin Nathania",
      imgSrc: "assets/B3.png",
      text: "Ehh dimana ini?"
    },
    {
      title: "???",
      imgSrc: "assets/ic.svg",
      text: "Halo selamat datang di planet TDR5000"
    },
    {
      title: "Karin Nathania",
      imgSrc: "assets/B3.png",
      text: "Haa!!? Planet TDR5000?"
    },
    {
      title: "???",
      imgSrc: "assets/ic.svg",
      text: "Iya, ini adalah planet yang kamu landasi ketika terjadinya disorientasi waktu yang terjadi di galaxy"
    },
    {
      title: "???",
      imgSrc: "assets/ic.svg",
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

  // Function to toggle the clips menu
  const toggleClipsMenu = () => {
    setShowClips((prev) => !prev);
    clikMouse(); // Play the click sound
  };

  const toggleVoicePackMenu = () => {
    setShowVoicePack((prev) => !prev);
    clikMouse(); // Play the click sound
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
          storyFinished && ( // Only show menu options if the story is finished
            <div className="flex flex-col gap-5 w-[16rem] text-nowrap">
              <button
                onClick={toggleClipsMenu} // Toggle the clips menu
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="button-85 font-bold">
                Karin Clips 📸
              </button>
              <button
                onClick={toggleVoicePackMenu} // Toggle the voice pack menu
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="button-85 font-bold">
                Karin Voice 🎤
              </button>
              <button
                onClick={clikMouse}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="button-85 font-bold flex items-center justify-center flex-row gap-2">
                Locked <TbLockFilled size={20} />
              </button>
            </div>
          )
        )}
      </div>

      {/* Render the clips menu if showClips is true */}
      {showClips && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-gray-200 px-4">
          <div className="container bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full">
            <h5 className="font-bold text-xl text-center mb-6 text-white">Karin Clips</h5>

            {/* Apply flex-col for small screens, flex-row for larger screens */}
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
                Close Clips
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render the voice pack menu if showVoicePack is true */}
      {showVoicePack && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-gray-200 px-4">
          <div className="container bg-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full">
            <h5 className="font-bold text-xl text-center mb-6 text-white">Karin Voice Pack</h5>

            {/* Apply flex-col for small screens, flex-row for larger screens */}
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
                  🥰🥰🥰.
                </audio>
                <p className="text-center mt-2 text-gray-300">"AAAAA"</p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={toggleVoicePackMenu}
                className="button-85 font-bold text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryComponent;
