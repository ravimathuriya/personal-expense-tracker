import moment from "moment";
import expenseContext from "./ExpenseContext";

const tokenData = localStorage.getItem("accessToken")

const ExpenseState = (props) => {
  const fetchExpense = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/expense/allexpense`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      
      console.log("issue while fetching the data");
    }
  };

  const addNewExpense = async ({ title, amount, category, date }) => {
    try {
      const formattedDate = moment(date).format("DD-MM-YYYY");

      const response = await fetch(
        `${process.env.REACT_APP_URL}/expense/addexpense`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${tokenData}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            amount: amount,
            category: category,
            date: formattedDate,
          }),
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("issue while adding the expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/expense/deleteexpense/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Issue while deleting the existing expense");
    }
  };

  const updateExpense = async ({ newTitle, newAmount, newCategory }, id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/expense/updateexpense/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${tokenData}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
            amount: newAmount,
            category: newCategory,
          }),
        }
      );

      const data = await response.json();
      return data;
    } 
    catch (error) {
      console.log("issue while updating the expense");
    }
  };

  return (
    <expenseContext.Provider
      value={{ fetchExpense, addNewExpense, deleteExpense, updateExpense }}
    >
      {props.children}
    </expenseContext.Provider>
  );
};

export default ExpenseState;
