import { useRef } from "react";

const useHoverSound = () => {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  if (!hoverSoundRef.current || !clickSoundRef.current) {
    hoverSoundRef.current = new Audio("/assets/hoverSound.wav");
    clickSoundRef.current = new Audio("/assets/kliksfx.wav");
  }

  const hoverS = hoverSoundRef.current;
  const clickS = clickSoundRef.current;
  clickS.volume = 0.2;
  hoverS.volume = 0.2;

  const clikMouse = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play().catch((error) => {
        console.error("Error playing click sound:", error);
      });
    }
  };

  const handleMouseEnter = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch((error) => {
        console.error("Error playing hover sound:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.pause();
      hoverSoundRef.current.currentTime = 0;
    }
  };

  return { handleMouseEnter, handleMouseLeave, clikMouse };
};

export default useHoverSound;
