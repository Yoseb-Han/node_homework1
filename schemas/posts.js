const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
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
        title: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);

const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;
