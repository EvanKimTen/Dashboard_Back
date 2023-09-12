import mongoose from "mongoose";
export const clientSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        projectid: {
            type: Number, // ?
            required: true,
        },
        apiKey: {
            type: String, // ?
            required: true,
        }
    },
);

export const client = mongoose.model("Client", clientSchema);