    import express from "express";
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: [
  'https://personal-expense-tracker-frontend-phi.vercel.app',
  'https://personal-expense-tracker-frontend-ddh2lb8xy.vercel.app'
],
    credentials:true
}))

app.use(cookieParser())

app.use(express.static("public"))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({limit:"16kb", extended:true}))

app.get("/", (req, res)=>{
    res.status(200).send("Welcome to the personal expense tracker.")
} )

//importing routers from routes folder for specific routes
import userRouter from "./routes/user.routes.js";
import expenseRouter from "./routes/expense.routes.js";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/expense", expenseRouter)

export {app}
