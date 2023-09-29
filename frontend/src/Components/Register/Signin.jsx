import { Alert, Button, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../Redux/Auth/Action";

const Signin = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the login action with inputData
    dispatch(login(inputData));
    setOpenSnackbar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the inputData state with the new values
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    // Check if there is a token and fetch the current user data
    if (token) {
      dispatch(currentUser(token));
    }
  }, [token]);

  useEffect(() => {
    // If the current user data is available, navigate to the homepage
    if (auth.reqUser?.name) {
      navigate("/");
    }
  }, [auth.reqUser, navigate]);

  return (
    <div>
      <div className="flex justify-center h-screen w-[100vw] items-center">
        <div className="p-10 w-[30%] shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5 ">
            <div>
              <p className="mb-2">Email</p>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={inputData.email}
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
                Sign In
              </Button>
            </div>
          </form>

          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Create New Account</p>
            <Button variant="text" onClick={() => navigate("/signup")}>
              SignUp
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
            Login Successfully!!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
export default Signin;
