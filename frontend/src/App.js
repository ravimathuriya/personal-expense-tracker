import "./App.css";
import Login from "./Components/Pages/Login";
import Navbar from "./Components/Pages/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Pages/Signup";
import Home from "./Components/Pages/Home";
import ExpenseState from "./Components/Contexts/ExpensesContext/ExpenseState";
import UserState from "./Components/Contexts/UserContext/UserState";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";

function App() {
  const toastId = useRef(null);

  const notify = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast("In progress. please wait...", {
        autoClose: false,
        type: "info",
        style: {
          fontFamily: "Winky Sans",
        },
      });
    }
  };

  const showAlert = (msg, type) => {
    toast.update(toastId.current, {
      render: msg,
      type: type,
      autoClose: 3000,
      style: {
        fontFamily: "Winky Sans",
      },
    });
  };

  

  return (
    <>
      <UserState>
        <ExpenseState>
          <BrowserRouter>
            <Navbar showAlert={showAlert} notify={notify} />
            <ToastContainer theme="colored" limit={1} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home
                    showAlert={showAlert}
                    notify={notify}
                    
                  />
                }
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} notify={notify} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} notify={notify} />}
              />
            </Routes>
          </BrowserRouter>
        </ExpenseState>
      </UserState>
    </>
  );
}

export default App;
