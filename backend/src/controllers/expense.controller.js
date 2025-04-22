import moment from "moment";
import { Expense } from "../models/expense.models.js";
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const addExpense = asyncHandler(async (req, res) => {
  //get the data from req.body
  const { title, amount, category, date } = req.body;

  if (!(title && amount && category)) {
    res.status(400).json({
      message: "all fields are required",
    });
    console.log(date)
  }

    // Parse and format date using moment (from DD/MM/YYYY to Date object)
    const addedDate = moment(date, 'DD-MM-YYYY', true); // 'true' enables strict parsing

  //get the user from authentication middleware
  const user = req.user;

  const existedUser = await User.findById(user._id);

  if (!existedUser) {
    res.status(400).json({
      message: "You are not authorized to add expenses",
    });
  }

  const addNewExpense = await Expense.create({
    title: title,
    amount: amount,
    category: category,
    date: addedDate.toDate() || Date.now() ,
    user: existedUser,
  });

  if (!addNewExpense) {
    res.status(400).json({
      message: "Issue while adding the expense",
    });
  }

  return res.status(200).json({
    message: "expense added successfully",
    addNewExpense,
  });
});

const fetchAllExpense = asyncHandler(async (req, res) => {
  //get user from authentication middleware
  const user = req.user;
  const userID = user._id;

  //fetch all added expenses data for specific logged In user
  const findAllExpenses = await Expense.find({ user: userID });

  if (!findAllExpenses) {
    res.status(400).json({
      message: "Expenses data not found",
    });
  }

  return res.status(200).json({
    message: "Expenses fetched successfully",
    findAllExpenses,
  });
});

const deleteExpense = asyncHandler(async (req, res) => {
  //get expense ID from params
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "Expense not found",
    });
  }

  //find the expense and delete from data by using query
  const deleteTheExpense = await Expense.findByIdAndDelete(id);

  if (!deleteTheExpense) {
    res.status(400).json({
      message: "Issue while deleting the expense",
    });
  }

  return res.status(200).json({
    message: "Expense deleted successfully",
  });
});

const updateExpense = asyncHandler(async (req, res) => {
  //get the expense id from params
  const { id } = req.params;

  //get the data from req.body
  const { title, amount, category } = req.body;

  if (!(title || amount || category)) {
    res.status(400).json({
      message: "All fields are required",
    });
  }

  //find the expense and update it by using mongo query
  const updateTheExpense = await Expense.findByIdAndUpdate(
    id,
    {
      $set: {
        title: title,
        amount: amount,
        category: category,
      },
    },
    { new: true }
  );

  //if something went while updating the expense
  if(!updateTheExpense){
    res.status(400).json({
        message:"Issue while updating the expense"
    })
  }

  // return response if expense updated successfully
  return res.status(200).json({
    message:"Expense updated successfully",
    updateTheExpense
  })

});

export { addExpense, fetchAllExpense, deleteExpense, updateExpense };
