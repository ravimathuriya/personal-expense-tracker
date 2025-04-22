import React, { useContext, useState } from "react";
import Logo from "../Assets/Logo.png";
import "../CSS/Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import userContext from "../Contexts/UserContext/UserContext";

function Navbar(props) {

  const userName = localStorage.getItem("userName")
  const [isOpen, setIsOpen] = useState(false)

  const {logOutUser} = useContext(userContext)

  const navigate = useNavigate()

  const {showAlert, notify} = props;

  const toggleClick = () =>{
    setIsOpen(!isOpen)
  }

  const logginOut = async() =>{
    notify()
    const userData = await logOutUser()

    if(userData.message === "You are not authorized"){
      showAlert("You are not authorized", "error")
    }

    else if(userData.message === "User logged out successfully"){
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userName")
      showAlert("User logged out successfully", "success")
      setTimeout(() => {
        navigate("/login", {replace:true} )
      }, 1000);

    }

    
  }

  return (
    <>
      <div className="navbar">
        <div className="img">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        </div>
        <div className="title">Expense Tracker</div>
        { !localStorage.getItem("accessToken") ? <div className="button">
          <Link to="/login">
          <button className="btn">Log In</button>
          </Link>
          <Link to="/signup">
          <button className="btn">Sign Up</button>
          </Link>
        </div> 
        :
        <div className="profile-wrapper">
        <div className="profileIcon" onClick={toggleClick} >{userName} 
          <span style={{transition: "background 0.2s ease-in-out"}} >

            {!isOpen ? <i className="fa-solid fa-angle-down"></i>
            :<i className="fa-solid fa-angle-up"></i>}
            </span> 
          </div>
        <div className="dropdown" style={{display: isOpen ? "block" : "none" }} >
        <button className="logout-btn" onClick={logginOut} >Logout</button>
      </div>
        </div>
        }
      </div>
    </>
  );
}

export default Navbar;
