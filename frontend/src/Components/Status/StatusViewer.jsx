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

  const handleNextStory = () => {
    if (currentStoryIndex < stories?.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextStory();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentStoryIndex]);

  const handleNavigte = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className=" flex justify-center items-center h-[100vh] w-[100vw] bg-slate-900">
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
            onClick={handleNavigte}
            className="text-white text-4xl cursor-pointer absolute top-3 left-10"
          />
          <AiOutlineClose
            onClick={handleNavigte}
            className="text-white text-4xl cursor-pointer absolute top-3 right-10"
          />
        </div>
      </div>
    </div>
  );
};
export default StatusViewer;
