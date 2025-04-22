import React, { useContext, useState } from "react";
import "../CSS/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../Contexts/UserContext/UserContext";

function Signup(props) {
  const { signUser } = useContext(userContext);

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { showAlert, notify } = props;

  const [userPic, setUserPic] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.type === "file") {
      setUserPic(e.target.files[0]);
    }

    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const signUpUser = async () => {
    notify();
    const userData = await signUser(userDetails, userPic);

    switch (userData.message) {
      case "All fields are required.":
        showAlert("All fields are required", "warning");
        break;

      case "User already registered":
        showAlert("User already registered", "error");
        break;

      case "Profile pic required to upload":
        showAlert("Profile pic required to upload", "error");
        break;

      case "Issue while uploading the image on cloudinary":
        showAlert("Issue while uploading the image on cloudinary", "error");
        break;

      case "Something went wrong while user creation":
        showAlert("Something went wrong while user creation", "error");
        break;

      case "User registered successfully":
        showAlert("User registered successfully", "success");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
        break;

      default:
        console.log("");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Registration</h1>
        <div className="form">
          <label htmlFor="fullName">
            Full Name <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
          </label>

          <input type="text" name="fullName" onChange={onChange} />

          <label htmlFor="email">
            E-mail <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
          </label>
          <input type="email" name="email" onChange={onChange} />

          <label htmlFor="password">
            Password <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
          </label>
          <input type="password" name="password" onChange={onChange} />

          <label htmlFor="profilePic">
            Profile Pic{" "}
            <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
          </label>

          <input
            type="file"
            name="profilePic"
            id="profilePic"
            onChange={onChange}
          />
          <button className="btn" onClick={signUpUser}>
            Submit
          </button>
          <div className="text">
            Already have an account? <span>&nbsp;Click here to&nbsp;</span>{" "}
            <Link to="/login">Login </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
