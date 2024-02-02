import React, { useEffect, useRef } from "react";
import "../styles/confettiful.css";

interface ConfettifulProps {
  confettiFrequency: number;
  confettiColors: string[];
  confettiAnimations: string[];
}

const ConfettiComponent: React.FC<ConfettifulProps> = ({
  confettiColors = ["#EF2964", "#00C09D", "#2D87B0", "#48485E", "#EFFF1D"],
  confettiAnimations = ["slow", "medium", "fast"],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const elPosition = containerEl?.style.position;

    if (elPosition !== "relative" && elPosition !== "absolute") {
      containerEl!.style.position = "absolute";
    }

    const renderConfetti = () => {
      const confettiEl = document.createElement("div");
      const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
      const confettiBackground =
        confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const confettiLeft =
        Math.floor(Math.random() * containerEl!.offsetWidth) + "px";
      const confettiAnimation =
        confettiAnimations[
          Math.floor(Math.random() * confettiAnimations.length)
        ];

      confettiEl.classList.add(
        "confetti",
        "confetti--animation-" + confettiAnimation,
      );
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode?.removeChild(confettiEl);
      }, 3000);

      containerEl?.appendChild(confettiEl);
    };

    confettiIntervalRef.current = setInterval(renderConfetti, 25);

    return () => {
      if (confettiIntervalRef.current) {
        clearInterval(confettiIntervalRef.current);
      }
    };
  }, [confettiColors, confettiAnimations]);

  return <div ref={containerRef} className="confetti-container" />;
};

const Confettiful: React.FC = () => {
  return <ConfettiComponent />;
};

export default Confettiful;
