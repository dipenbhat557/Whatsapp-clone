import { useNavigate } from "react-router-dom";

const StatusUserCard = () => {
  const navigate = useNavigate();

  // Function to navigate to a user's status
  const handleNavigate = () => {
    navigate(`/status/userId`); // You may want to replace 'userId' with the actual user ID.
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex items-center p-3 cursor-pointer"
    >
      <div>
        <img
          className="h-7 w-7 lg:w-10 lg:h-10 rounded-full"
          src="https://cdn.pixabay.com/photo/2023/09/11/14/19/weight-8246973_640.jpg"
          alt="User Avatar"
        />
      </div>
      <div className="ml-2 text-white">
        <p>Something Something</p>{" "}
        {/* You may want to replace with actual user information */}
      </div>
    </div>
  );
};

export default StatusUserCard;
