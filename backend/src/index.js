import { app } from "./app.js";
import connectDB from "./db/db.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`app is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });
