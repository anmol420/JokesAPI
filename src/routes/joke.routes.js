import { Router } from "express";
import { randomJoke } from "../controllers/jokes.controller.js";

const router = Router();

router.route("/random").get(randomJoke);

export default router;