import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js"

dotenv.config({
  path: './env'
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Successfully started server on port ${process.env.PORT}.`);
    });
  })
  .catch((e) => {
    console.log("Database Connection Error: ", e);
  });
  