import { useState } from "react";

const useFade = (duration: number) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeClass, setFadeClass] = useState<string>("");

  const fadeIn = () => {
    setFadeClass("fade-in");
    setIsVisible(true);
    setTimeout(() => {
      setFadeClass("fade-in-active");
    }, 0); // Trigger CSS transition
  };

  const fadeOut = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setFadeClass("fade-out-active");
    }, 0); // Trigger CSS transition

    setTimeout(() => {
      setIsVisible(false); // Hide after the fade-out duration
    }, duration);
  };

  const toggleFade = () => {
    if (isVisible) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  return { isVisible, fadeClass, toggleFade, fadeIn, fadeOut };
};

export default useFade;
