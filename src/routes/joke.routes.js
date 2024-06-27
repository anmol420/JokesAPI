import { Router } from "express";
import { 
    addJoke,
    randomJoke,
    jokeById
} from "../controllers/jokes.controller.js";

const router = Router();

router.route("/addJoke").post(addJoke);

router.route("/random").get(randomJoke);

router.route("/random/:jokeID").get(jokeById);

export default router;