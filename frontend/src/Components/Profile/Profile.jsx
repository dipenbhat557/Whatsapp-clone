import { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Redux/Auth/Action";

const Profile = ({ handleCloseOpenProfile }) => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);
  const [tempPicture, setTempPicture] = useState(null);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleFlag = () => {
    setFlag(true);
  };

  const handleCheckClick = (e) => {
    setFlag(false);
    const data = {
      id: auth.reqUser.id,
      token: localStorage.getItem("token"),
      data: { name: username },
    };
    dispatch(updateUser(data));
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const uploadToCloudinary = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "whatsapp");
    data.append("cloud_name", "dadlxgune");
    fetch("https://api.cloudinary.com/v1_1/dadlxgune/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setTempPicture(data.url.toString());
        const dataa = {
          id: auth.reqUser.id,
          token: localStorage.getItem("token"),
          data: { profile: data.url.toString() },
        };
        dispatch(updateUser(dataa));
      });
  };

  const handleUpdateName = (e) => {
    if (e.key === "Enter") {
      const data = {
        id: auth.reqUser.id,
        token: localStorage.getItem("token"),
        data: { name: username },
      };
      dispatch(updateUser(data));
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleCloseOpenProfile}
        />
        <p className="cursor-pointer font-semibold">Profile</p>
      </div>

      {/* update profile pic section */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
            src={
              auth.reqUser.profile ||
              tempPicture ||
              "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
            }
            alt=""
          />
        </label>

        <input
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
          type="file"
          id="imgInput"
          className="hidden"
        />
      </div>

      {/* name section */}
      <div className="bg-white px-3">
        <p className="py-3">Your name</p>

        {!flag && (
          <div className="w-full flex justify-between items-center">
            <p className="py-3 ">{auth.reqUser?.name || "Username"}</p>
            <BsPencil onClick={handleFlag} className="cursor-pointer" />
          </div>
        )}

        {flag && (
          <div className="w-full flex justify-between items-center py-2">
            <input
              onKeyPress={handleUpdateName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-[80%] outline-none border-b-2 border-blue-700 p-2 "
            />
            <BsCheck2
              onClick={handleCheckClick}
              className="cursor-pointer text-2xl"
            />
          </div>
        )}
      </div>

      <div className="px-3 my-5">
        <p className="py-10">
          This is not your username or pin. This name will be visible to others.
        </p>
      </div>
    </div>
  );
};

export default Profile;
