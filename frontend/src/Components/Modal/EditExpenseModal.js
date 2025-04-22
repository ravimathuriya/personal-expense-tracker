import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../CSS/AddExpenseModal.css";
import expenseContext from "../Contexts/ExpensesContext/ExpenseContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { editRef, fetchAllExpenses, title, amount, category, id, closeModal, notify, showAlert } =
    props;

    const {updateExpense} = React.useContext(expenseContext)

  const [newTitle, setNewTitle] = React.useState("");
  const [newAmount, setNewAmount] = React.useState("");
  const [newCategory, setNewCategory] = React.useState("");
  

  React.useEffect(() => {
    setNewTitle(title);
    setNewAmount(amount);
    setNewCategory(category);
  }, [title, amount, category]);

  const updateTheExpense = async() =>{
    notify()
    const updationExpense = await updateExpense( {newTitle, newAmount, newCategory}, id )
    if(updationExpense.message === "All fields are required"){
      showAlert("All fields are required", "warning")
    }

    else if (updationExpense.message === "Issue while updating the expense"){
      showAlert("Issue while updating the expense", "error")
    }

    else if(updationExpense.message === "Expense updated successfully"){
      showAlert("Expense updated successfully", "success")
      fetchAllExpenses()
    }
    console.log(updationExpense)
  }

  return (
    <div>
      <Button onClick={handleOpen} ref={editRef} style={{ display: "none" }}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ backgroundColor: "rgb(16, 14, 52)" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontFamily: "Winky Sans" }}
          >
            Edit Expense
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontFamily: "Winky Sans" }}
          >
            <div className="modal-container">
              <label htmlFor="newTitle">
                Title <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
              </label>
              <input
                type="text"
                name="newTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <label htmlFor="newAmount">
                Amount <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
              </label>
              <input
                type="number"
                name="newAmount"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
              <label htmlFor="newCategory">
                Category{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
              </label>
              <select
                name="newCategory"
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Bills">Bills</option>
                <option value="Rent">Rent</option>
                <option value="Other">Other</option>
              </select>

              <button className="btn" onClick={updateTheExpense} >Update</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
