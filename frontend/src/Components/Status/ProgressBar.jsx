import { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ index, activeIndex, duration }) => {
  // Check if this progress bar is currently active
  const isActive = index === activeIndex;

  // State to manage the progress of the bar
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(intervalId);
        return prev;
      });
    }, duration / 100);

    // Clean up the interval when the component unmounts or activeIndex changes
    return () => clearInterval(intervalId);
  }, [duration, activeIndex]);

  useEffect(() => {
    // Reset the progress when activeIndex changes
    setProgress(0);
  }, [activeIndex]);

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div
        className={` ${isActive ? "progress-bar" : ""}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
