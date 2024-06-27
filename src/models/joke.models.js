import mongoose, { Schema } from "mongoose";
import mongooseSequence from "mongoose-sequence";

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

jokeSchema.plugin(mongooseSequence(mongoose), { inc_field: 'jokeID' });

export const Joke = mongoose.model("Joke", jokeSchema);