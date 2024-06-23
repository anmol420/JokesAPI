import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config({
  path: './env'
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Successfully started server on port ${process.env.PORT}.`);
});
