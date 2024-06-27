import mongoose, { Schema } from "mongoose";
import autoIncrement from "mongoose-sequence";

const jokeSchema = new Schema(
    {
        jokeType: {
            type: String,
            required: true,
        },
        jokeText: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

jokeSchema.plugin(autoIncrement, { inc_field: 'jokeID' });

export const Joke = mongoose.model("Joke", jokeSchema);