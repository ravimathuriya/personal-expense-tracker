import React, { useContext,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import userContext from "../Contexts/UserContext/UserContext";

function Login(props) {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const {showAlert, notify} = props;

  const { logInUser } = useContext(userContext);

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const logginUser = async (e) => {
    e.preventDefault()
    notify()
    const registeredUserData = await logInUser(userDetails);
  

    if(registeredUserData.message === "all fields are required"){
      showAlert("All fields are required", "warning")
    }

    else if(registeredUserData.message === "user not registered"){
      showAlert("User not registered", "error")
    }

    else if(registeredUserData.message === "Please check the password"){
      showAlert("Please check the password", "warning")
    }

    else if (registeredUserData.message === "User loggedin successfully") {
      const accessToken = await registeredUserData.accessToken;
      const loggedUserDetails = await registeredUserData.loggedUser;
      
      
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", loggedUserDetails.fullName);
      showAlert(`Hi ${loggedUserDetails.fullName}, Welcome to the Expense Tracker` , "success")
      setTimeout(() => {
        
        navigate("/", {replace:"true"})
      }, 3000);
    }
  };

  

  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <div className="loginform">
          <label htmlFor="email">
            E-mail <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
          </label>
          <input type="email" name="email" onChange={onChange} />

          <label htmlFor="password">
            Password <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
          </label>
          <input type="password" name="password" onChange={onChange} />

          <button className="btn" onClick={logginUser}>
            Login
          </button>
          <div className="text">
            Don't have an account? <span>&nbsp;Click here to&nbsp;</span>{" "}
            <Link to="/signup">Signup </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
