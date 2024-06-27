import dotenv from "dotenv";
import app from "./app.js"

dotenv.config({
  path: './env'
});

app.listen(process.env.PORT, () => {
  console.log(`Successfully started server on port ${process.env.PORT}.`);
});
