import fs from "fs";

import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jokes from "../../public/jokes.json" assert { type: 'json' };

let jokesJson = fs.readFileSync("./public/jokes.json", "utf-8");
let jokeArray = JSON.parse(jokesJson);

const randomJoke = asyncHandler( async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                jokes[Math.floor(Math.random() * jokes.length)],
            )
        );
});

const jokeById = asyncHandler( async (req, res) => {
    const id = parseInt(req.params.id);
    let found = 0;
    jokes.forEach((joke) => {
        if (joke.id === id && found === 0) {
            found = 1;
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        joke,
                        "Joke Found !"
                    )
                );
        }
    });
    if (found === 0) {
        return res
            .status(404)
            .json(
                new ApiResponse(
                    404,
                    {},
                    `ID: ${id} Not Found.`
                )
            )
    }
});

const jokeFilter = asyncHandler( async (req, res) => {
    const type = req.query.type;
    let filteredJoke = [];
    let found = 0;
    jokes.forEach((joke) => {
        if (joke.jokeType === type) {
            found = 1;
            filteredJoke.push(joke)
        }
    });
    if (found === 0) {
        return res
            .status(404)
            .json(
                new ApiResponse(
                    404,
                    filteredJoke,
                    "Type Not Found."
                )
            )
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    filteredJoke,
                    "Type Found."
                )
            )
    }
});

const addJoke = asyncHandler ( async (req, res) => {
    const jokeType = req.body.jokeType;
    const jokeText = req.body.jokeText;
    if (jokeType != undefined && jokeText != undefined) {
        let newId = jokes.length + 1;
        const newJoke = {
            id: newId,
            jokeText: jokeText,
            jokeType: jokeType
        };
        jokeArray.push(newJoke);
        const jsonJoke = JSON.stringify(jokeArray);
        try {
            fs.writeFileSync("./public/jokes.json", jsonJoke, "utf-8");
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        201,
                        newJoke,
                        "Created."
                    )
                );
        } catch (e) {
            return res
                .status(500)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Unable To Post To The File."
                    )
                );
        }
    } else {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    "Fields - `jokeType` and `jokeText` - Not Found."
                )
            );
    }
});

const editJoke = asyncHandler ( async (req, res) => {
    const id = parseInt(req.params.id);
    const jokeType = req.body.jokeType;
    const jokeText = req.body.jokeText;
    if (id > jokes.length) {
        return res
            .status(404)
            .json(
                new ApiResponse(
                    404,
                    {},
                    `ID: ${id} Does Not Exist.`
                )
            );
    } else if (jokeText === undefined || jokeType === undefined) {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    "Fields - `jokeType` and `jokeText` - Not Found."
                )
            );
    } else {
        jokeArray.forEach((joke) => {
            if (joke.id === id) {
                jokeArray[id - 1].jokeType = jokeType;
                jokeArray[id - 1].jokeText = jokeText;
            }
        });
        try {
            const jsonJoke = JSON.stringify(jokeArray);
            fs.writeFileSync("./public/jokes.json", jsonJoke, "utf-8");
        } catch (e) {
            return res
                .status(500)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Unable To Put To The File."
                    )
                )
        }
        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    jokeArray[id - 1],
                    `ID: ${id} Updated.`
                )
            );
    }
});

const patchJoke = asyncHandler( async (req, res) => {
    const id = parseInt(req.params.id);
    const jokeType = req.body.jokeType;
    const jokeText = req.body.jokeText;
    if (id > jokes.length) {
        return res
            .status(404)
            .json(
                new ApiResponse(
                    404,
                    {},
                    `ID: ${id} Does Not Exist.`
                )
            );
    } else if (jokeType === undefined && jokeText === undefined) {
        return res
            .status(404)
            .json(
                new ApiResponse(
                    404,
                    {},
                    "Atleast Provide One - `jokeType` or `JokeText`"
                )
            );
    } else {
        jokeArray.forEach((joke) => {
            if (joke.id === id) {
                jokeArray[id - 1].jokeType = jokeType || jokeArray[id - 1].jokeType;
                jokeArray[id - 1].jokeText = jokeText || jokeArray[id - 1].jokeText;
            }
        });
        try {
            const jsonJoke = JSON.stringify(jokeArray);
            fs.writeFileSync("./public/jokes.json", jsonJoke, "utf-8");
        } catch (e) {
            return res
                .status(500)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Unable To Patch To The File."
                    )
                )
        }
        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    jokeArray[id - 1],
                    `ID: ${id} Updated.`
                )
            );
    }
});

export {
    randomJoke,
    jokeById,
    jokeFilter,
    addJoke,
    editJoke,
    patchJoke
};