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

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { ref, fetchAllExpenses, showAlert, notify } = props;

   const {addNewExpense} =  React.useContext(expenseContext)

  const [data, setData] = React.useState({
    title:"",
    amount:"",
    category:"Food",
    date:""
  })

  const onChange = (e) =>{
    setData({...data, [e.target.name]:e.target.value})
  }

  const handleAddExpesne = async() =>{
    notify()
    const addedExpense = await addNewExpense(data)

    if(addedExpense.message === "all fields are required"){
      showAlert("All fields are required", "warning")
    }

    else if(addedExpense.message === "You are not authorized to add expenses"){
      showAlert("You are not authorized to add expenses", "error")
    }

    else if (addedExpense.message === "Issue while adding the expense"){
      showAlert("Issue while adding the expense", "error")
    }

    else if (addedExpense.message === "expense added successfully"){
      showAlert("Expense added successfully", "success")
      fetchAllExpenses()
    }
    console.log(addedExpense)
  }

  return (
    <div>
      <Button onClick={handleOpen} ref={ref} style={{ display: "none" }}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
            Add Expense
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontFamily: "Winky Sans" }}
          >
            <div className="modal-container">
              <label htmlFor="title">
                Title <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
              </label>
              <input type="text" name="title" onChange={onChange} />
              <label htmlFor="amount">
                Amount <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
              </label>
              <input type="number" name="amount" onChange={onChange} />
              <label htmlFor="category">
                Category{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
              </label>
              <select name="category" id="category" onChange={onChange} >
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Bills">Bills</option>
                <option value="Rent">Rent</option>
                <option value="Other">Other</option>
              </select>

              <label htmlFor="date">
                Date <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
              </label>
              <input type="date" name="date" id="date" onChange={onChange} />

              <button className="btn" onClick={handleAddExpesne}>Add Expense</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
