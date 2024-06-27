import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(bodyParser.urlencoded({ extended: true }));

import userRouter from "./routes/joke.routes.js";

app.use("/api/v1/jokes", userRouter);

export default app;