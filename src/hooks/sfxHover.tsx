import { useRef, useEffect } from "react";

const useHoverSound = () => {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This ensures that Audio is only created on the client-side
      hoverSoundRef.current = new Audio("/assets/hoverSound.wav");
      clickSoundRef.current = new Audio("/assets/kliksfx.wav");

      hoverSoundRef.current.volume = 0.2;
      clickSoundRef.current.volume = 0.5;
    }
  }, []);

  const handleMouseEnter = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.pause();
      hoverSoundRef.current.currentTime = 0;
    }
  };

  const clikMouse = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play();
    }
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    clikMouse
  };
};

export default useHoverSound;
