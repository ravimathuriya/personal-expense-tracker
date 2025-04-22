import mongoose, { Schema } from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be a positive number'],
      },
      category: {
        type: String,
        required: true,
        enum: ['Food', 'Transportation', 'Bills', 'Rent', 'Other'],
      },
      date: {
        type: Date,
        required: true,
        default: Date.now, // Defaults to the current date if not provided
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References a User model (to associate expense with a user)
        required: true,
      },
}, {timestamps:true})

export const Expense = mongoose.model("Expense", expenseSchema)