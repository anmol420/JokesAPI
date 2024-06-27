import { Joke } from "../models/joke.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const addJoke = asyncHandler( async (req, res) => {
    const jokeType = req.body.jokeType;
    const jokeText = req.body.jokeText;
    if (jokeType != undefined && jokeText != undefined) {
        const newJoke = new Joke({
            jokeText: jokeText,
            jokeType: jokeType
        });
        try {
            const savedJoke = await newJoke.save();
            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        savedJoke,
                        "Created New Joke !"
                    )
                );
        } catch (err) {
            return res
                .status(500) 
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Unable To Save To Database."
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

const randomJoke = asyncHandler ( async (req, res) => {
    try {
        const count = await Joke.countDocuments();
        const randomIndex = Math.floor(Math.random()*count);
        const randomJoke = await Joke.findOne().skip(randomIndex);
        
        if (!randomJoke) {
            return res
                .status(404)
                .json(
                    new ApiResponse(
                        404,
                        {},
                        "Joke Not Found !"
                    )
                );
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    randomJoke,
                    "Random Joke Fetched !"
                )
            );
    } catch (err) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    "Unable To Fetch From Database."
                )
            );
    }
});

const jokeById = asyncHandler ( async (req, res) => {
    const jokeID = parseInt(req.params.jokeID);
    try {
        const joke = await Joke.findOne({ jokeID });
        if (!joke) {
            return res
                .status(404)
                .json(
                    new ApiResponse(
                        404,
                        {},
                        `ID: ${jokeID} Not Found.`
                    )
                )
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    joke,
                    "Joke Found !"
                )
            );
    } catch (err) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    "Unable To Fetch From Database."
                )
            );
    }
});

const jokeFilter = asyncHandler( async (req, res) => {
    const jokeType = req.query.type;
    try {
        const joke = await Joke.find({ jokeType });
        if (!joke) {
            return res
                .status(404)
                .json(
                    new ApiResponse(
                        404,
                        [],
                        `JokeType - ${jokeType} Not Exist.`
                    )
                );
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    joke,
                    `JokeType - ${jokeType} Found.`
                )
            );
    } catch (err) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    "Unable To Fetch From Database."
                )
            );
    }
});

const editJoke = asyncHandler( async (req, res) => {
    const jokeID = parseInt(req.params.jokeID);
    const jokeType = req.body.jokeType;
    const jokeText = req.body.jokeText;

    if (jokeText === undefined && jokeType === undefined) {
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

    try {
        const joke = await Joke.findOne({ jokeID });
        if (!joke) {
            return res
                .status(404)
                .json(
                    new ApiResponse(
                        404,
                        {},
                        `ID: ${jokeID} Does Not Exist.`
                    )
                );
        }
        joke.jokeType = jokeType;
        joke.jokeText = jokeText;
        await joke.save();

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    joke,
                    "Joke Edited."
                )
            );
    } catch (err) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    "Unable To Access The Database."
                )
            );
    }
});

const patchJoke = asyncHandler ( async (req, res) => {
    const jokeID = parseInt(req.params.jokeID);
    const jokeType = req.body.jokeType;
    const jokeText = req.body.jokeText;

    if (jokeText == undefined && jokeType === undefined) {
        return res
            .status(404)
            .json(
                new ApiResponse(
                    404,
                    {},
                    "Atleast Provide One - `jokeType` or `JokeText`"
                )
            );
    }

    try {
        const joke = await Joke.findOne({ jokeID });
        if (!joke) {
            return res
                .status(404)
                .json(
                    new ApiResponse(
                        404,
                        {},
                        `ID: ${jokeID} Does Not Exist.`
                    )
                );
        }

        joke.jokeText = jokeText || joke.jokeText;
        joke.jokeType = jokeType || joke.jokeType;
        await joke.save();
        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    joke,
                    "Joke Edited."
                )
            );
    } catch (err) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {},
                    "Unable To Access The Database."
                )
            );
    }
});

export {
    addJoke,
    randomJoke,
    jokeById,
    jokeFilter,
    editJoke,
    patchJoke
};