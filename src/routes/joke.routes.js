import { Router } from "express";
import { 
    randomJoke,
    jokeById,
    jokeFilter,
    addJoke,
    editJoke,
    patchJoke
} from "../controllers/jokes.controller.js";

const router = Router();

router.route("/random").get(randomJoke);

router.route("/random/:id").get(jokeById);

router.route("/filter").get(jokeFilter);

router.route("/addJoke").post(addJoke);

router.route("/editJoke/:id").put(editJoke);

router.route("/patchJoke/:id").patch(patchJoke);

export default router;