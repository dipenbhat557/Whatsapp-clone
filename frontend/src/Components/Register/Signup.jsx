import { Alert, Button, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, register } from "../../Redux/Auth/Action";

const Signup = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(inputData)); // Dispatch the register action with inputData
    setOpenSnackbar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token]);

  useEffect(() => {
    if (auth.reqUser?.name) {
      navigate("/");
    }
  }, [auth.reqUser, navigate]);

  return (
    <div>
      <div className="flex flex-col justify-center min-h-screen w-[100vw] items-center">
        <div className="p-10 w-[30%] shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5 ">
            <div>
              <p className="mb-2">Full name</p>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                onChange={handleChange}
                value={inputData.name}
                className="py-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
              <p className="mb-2">Email</p>
              <input
                type="text"
                placeholder="Enter your email"
                onChange={handleChange}
                value={inputData.email}
                name="email"
                className="py-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                type="password" // Change to type="password" for security
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={inputData.password}
                className="py-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
              <Button
                type="submit"
                sx={{ bgcolor: green[700], padding: ".5rem 0rem" }}
                className="w-full"
                variant="contained"
              >
                Sign Up
              </Button>
            </div>
          </form>

          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Already Have an Account?</p>
            <Button variant="text" onClick={() => navigate("/signin")}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your account has been successfully created!!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
export default Signup;
