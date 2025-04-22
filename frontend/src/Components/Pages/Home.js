import React, { useRef, useState, useEffect, useContext } from "react";
import "../CSS/Home.css";
import Expenses from "./Expenses";
import BasicModal from "../Modal/AddExpenseModal";
import expenseContext from "../Contexts/ExpensesContext/ExpenseContext";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const ref = useRef(null);
  const [expenseData, setExpenseData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);

  const { fetchExpense } = useContext(expenseContext);

  const { showAlert, notify } = props;

  const navigate = useNavigate();

  const fetchAllExpenses = async () => {
    const data = await fetchExpense();
    const allExpenses = await data.findAllExpenses;
    
    
    if (data.message === "Expenses data not found") {
      notify();
      showAlert("Expenses data not found", "error");
    } else if (data.message === "Expenses fetched successfully") {
      setExpenseData(allExpenses);
    }
  };

  const calculateAmount = () => {
    var amount = 0;

    for (let i = 0; i < expenseData.length; i++) {
      amount += expenseData[i].amount;
    }
    setTotalAmount(amount.toFixed(2));
  };

  const openModal = () => {
    ref.current.click();
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login", { replace: true });
    } else {
      fetchAllExpenses();
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (expenseData.length > 0) {
      calculateAmount();
    }
    // eslint-disable-next-line
  }, [expenseData]);

  return (
    <>
      <div className="container">
        {
          <h2>
            Your Expenses :{" "}
            <span style={{ color: "greenyellow" }}>{totalAmount}</span>{" "}
          </h2>
        }

        <button className="btn" onClick={openModal}>
          Add Expense
        </button>
        {/* <div className="datefilter">
        Date:
      </div> */}
      </div>
      <div className="expenseslist">
        <Expenses
          expenseData={expenseData}
          fetchAllExpenses={fetchAllExpenses}
          showAlert={showAlert}
          notify={notify}
        />
      </div>
      <BasicModal ref={ref} fetchAllExpenses={fetchAllExpenses} showAlert={showAlert}
          notify={notify} />
    </>
  );
}

export default Home;
