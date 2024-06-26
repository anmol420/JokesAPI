import { Router } from "express";
import { 
    addJoke,
    randomJoke,
    jokeById,
    jokeFilter,
    editJoke,
    patchJoke,
    deleteJoke
} from "../controllers/jokes.controller.js";

const router = Router();

router.route("/addJoke").post(addJoke);

router.route("/random").get(randomJoke);

router.route("/random/:jokeID").get(jokeById);

router.route("/filter").get(jokeFilter);

router.route("/editJoke/:jokeID").put(editJoke);

router.route("/patchJoke/:jokeID").patch(patchJoke);

router.route("/deleteJoke/:jokeID").delete(deleteJoke);

export default router;