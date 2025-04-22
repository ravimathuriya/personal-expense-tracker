import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  fetchAllExpense,
  updateExpense,
} from "../controllers/expense.controller.js";
import userAuthentication from "../middlewares/auth.middleware.js";

const expenseRouter = Router();

expenseRouter.route("/addexpense").post(userAuthentication, addExpense);

expenseRouter.route("/allexpense").get(userAuthentication, fetchAllExpense);

expenseRouter
  .route("/deleteexpense/:id")
  .delete(userAuthentication, deleteExpense);

expenseRouter
  .route("/updateexpense/:id")
  .patch(userAuthentication, updateExpense);

export default expenseRouter;
