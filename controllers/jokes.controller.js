import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jokes from "../public/jokes.json" assert { type: 'json' };

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

export {
    randomJoke
};