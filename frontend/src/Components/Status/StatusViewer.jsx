import { useEffect, useState } from "react";
import { stories } from "./DummyStorage";
import ProgressBar from "./ProgressBar";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const StatusViewer = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Function to navigate to the previous page
  const handleNavigate = () => {
    navigate(-1);
  };

  // Function to handle moving to the next story
  const handleNextStory = () => {
    if (currentStoryIndex < stories?.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else {
      // If at the end of stories, loop back to the beginning
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };

  // Use useEffect to auto-advance to the next story
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextStory();
    }, 3000);

    // Clean up the interval when the component unmounts or when the current story changes
    return () => clearInterval(intervalId);
  }, [currentStoryIndex]);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-900">
      <div className="relative">
        <img
          src={stories?.[currentStoryIndex].image}
          alt="story"
          className="max-h-[96vh] object-contain"
        />
        <div className="absolute top-0 flex w-full">
          {stories?.map((item, index) => (
            <ProgressBar
              key={index}
              duration={3000}
              index={index}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </div>
      <div>
        <BsArrowLeft
          onClick={handleNavigate}
          className="text-white text-4xl cursor-pointer absolute top-3 left-10"
        />
        <AiOutlineClose
          onClick={handleNavigate}
          className="text-white text-4xl cursor-pointer absolute top-3 right-10"
        />
      </div>
    </div>
  );
};

export default StatusViewer;
