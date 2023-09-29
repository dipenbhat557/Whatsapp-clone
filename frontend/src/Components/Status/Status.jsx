import { AiOutlineClose } from "react-icons/ai";
import StatusUserCard from "./StatusUserCard";
import { useNavigate } from "react-router-dom";

const Status = () => {
  const navigate = useNavigate();

  // Function to navigate back
  const handleNavigate = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="relative">
      <div className="flex items-center w-screen">
        {/* Left side part */}
        <div className="left h-screen bg-[#1e262c] lg:w-2/5 w-2/3 px-5">
          <div className="pt-5 h-[13%]">
            <StatusUserCard />
          </div>
          <hr />
          <div className="overflow-y-scroll h-[86%] pt-3">
            {[1, 1, 1, 1, 1].map((item, index) => (
              <StatusUserCard key={index} />
            ))}
          </div>
        </div>

        {/* Right side part with close button */}
        <div
          onClick={handleNavigate}
          className="right relative h-screen lg:w-3/5 w-1/3 bg-[#0b141a] "
        >
          <AiOutlineClose className="text-white cursor-pointer absolute top-5 right-10 text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Status;
