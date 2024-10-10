import { useEffect, useRef } from "react";

const useGroupButton = (startCountdown: () => void) => {
  const btn1Ref = useRef<HTMLButtonElement | null>(null);
  const btn2Ref = useRef<HTMLButtonElement | null>(null);
  const sec1Ref = useRef<HTMLDivElement | null>(null);
  const musMRef = useRef<HTMLDivElement | null>(null);
  const backBRef = useRef<HTMLButtonElement | null>(null);
  const playRef = useRef<HTMLButtonElement | null>(null);
  const bg1Ref = useRef<HTMLDivElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const landShipRef = useRef<HTMLAudioElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const btn1 = btn1Ref.current;
    const btn2 = btn2Ref.current;
    const sec1 = sec1Ref.current;
    const musM = musMRef.current;
    const backB = backBRef.current;
    const playU = playRef.current;
    const bg1 = bg1Ref.current;
    const ls = (landShipRef.current = new Audio("/assets/sl.mp3"));

    // overlay?.classList.add("bg-black");

    // Handle Start Button Click: Trigger fade out and start countdown
    if (btn1) {
      btn1.addEventListener("click", () => {
        sec1?.classList.add("hidden");
        bg1?.classList.add("fade-out");
        bg1?.classList.add("fade-out-active");
        ls.volume = 0.4;
        ls.play();
        startCountdown();
      });
    }

    // Handle Music Selection Button Click
    if (btn2) {
      btn2.addEventListener("click", () => {
        sec1?.classList.add("hidden");
        musM?.classList.remove("hidden");
        musM?.classList.add("flex");
      });
    }

    // Music playback logic
    const music = (musicRef.current = new Audio("/assets/music.mp3"));
    let isPlaying = false;

    if (playU) {
      playU.addEventListener("click", () => {
        if (isPlaying) {
          music.pause();
          isPlaying = false;
        } else {
          music
            .play()
            .then(() => {
              isPlaying = true;
            })
            .catch((error) => {
              console.error("Error playing music:", error);
            });
        }
      });
    }

    if (backB) {
      backB.addEventListener("click", () => {
        sec1?.classList.remove("hidden");
        musM?.classList.add("hidden");
      });
    }

    return () => {
      btn1?.removeEventListener("click", () => {});
      btn2?.removeEventListener("click", () => {});
      playU?.removeEventListener("click", () => {});
      backB?.removeEventListener("click", () => {});
      musicRef.current = null;
    };
  }, [startCountdown]);

  return { btn1Ref, btn2Ref, sec1Ref, musMRef, backBRef, playRef, bg1Ref, musicRef, overlayRef };
};

export default useGroupButton;
