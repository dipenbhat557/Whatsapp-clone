import { AiOutlineClose } from "react-icons/ai";
import StatusUserCard from "./StatusUserCard";
import { useNavigate } from "react-router-dom";

const Status = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <div className="relative">
      <div className="flex items-center w-[100vw]">
        {/* left side part */}
        <div className="left h-[100vh] bg-[#1e262c] lg:w-[29%] w-[40%] px-5">
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

        {/* right side part */}
        <div
          onClick={handleNavigate}
          className="right relative h-[100vh] lg:w-[71%] w-[60%] bg-[#0b141a] "
        >
          <AiOutlineClose className="text-white cursor-pointer absolute top-5 right-10 text-xl" />
        </div>
      </div>
    </div>
  );
};
export default Status;
