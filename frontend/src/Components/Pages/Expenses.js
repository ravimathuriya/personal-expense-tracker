import React, { useContext, useEffect, useRef, useState } from "react";
import "../CSS/Expenses.css";
import moment from "moment";
import expenseContext from "../Contexts/ExpensesContext/ExpenseContext";
import EditModal from "../Modal/EditExpenseModal";

function Expenses(props) {
  const { expenseData, fetchAllExpenses, showAlert, notify } = props;
  const { deleteExpense } = useContext(expenseContext);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [
    // eslint-disable-next-line
    isEditOpen,
    setIsEditOpen,
  ] = useState(false);
  const editRef = useRef(null);

  const handleDeleteExpense = async (id) => {
    notify();
    const deleteTheExpense = await deleteExpense(id);
    if (deleteTheExpense.message === "Expense not found") {
      showAlert("Expense not found", "error");
    } else if (
      deleteTheExpense.message === "Issue while deleting the expense"
    ) {
      showAlert("Issue while deleting the expense", "error");
    } else if (deleteTheExpense.message === "Expense deleted successfully") {
      showAlert("Expense deleted successfully", "success");
      fetchAllExpenses();
    }
  };

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setIsEditOpen(true);
  };

  const closeModal = () => {
    setSelectedExpense(null);
    setIsEditOpen(false);
  };

  useEffect(() => {
    if (selectedExpense && editRef.current) {
      editRef.current.click();
    }
  }, [selectedExpense]);

  return (
    <>
      <div className="expensetable">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expenseData) && expenseData.length > 0 ? (
              expenseData.map((expense) => {
                return (
                  <tr key={expense._id}>
                    {/* Use a unique key for each row */}
                    <td>{moment(expense.date).format("MMMM Do YYYY")}</td>
                    <td>{expense.category}</td>
                    <td>{expense.title}</td>
                    <td>
                      {expense.amount}
                      <span className="icon">
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => openEditModal(expense)}
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => handleDeleteExpense(expense._id)}
                        ></i>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h1>No expense found</h1>
            )}
          </tbody>
        </table>
      </div>
      {selectedExpense && (
        <EditModal
          editRef={editRef}
          closeModal={closeModal}
          id={selectedExpense._id}
          title={selectedExpense.title}
          amount={selectedExpense.amount}
          category={selectedExpense.category}
          fetchAllExpenses={fetchAllExpenses}
          showAlert={showAlert}
          notify={notify}
        />
      )}
    </>
  );
}

export default Expenses;
