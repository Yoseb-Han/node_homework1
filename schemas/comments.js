const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        postId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Comments = mongoose.model("Comments", CommentsSchema);
module.exports = Comments;
