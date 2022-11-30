const express = require("express");
const router = express.Router();
const Comments = require("../schemas/comments.js");
const Posts = require("../schemas/posts.js");

// 댓글 작성
router.post("/:_postId", async (req, res) => {
    try {
        const { _postId } = req.params;
        const existsPost = await Posts.findOne({ _id: _postId });
        const { user, password, content } = req.body;
        if (existsPost === null) {
            return res
                .status(400)
                .json({ message: "게시글을 찾을 수 없습니다." });
        }
        if (content.length === 0) {
            return res
                .status(400)
                .json({ message: "댓글 내용을 입력해주세요." });
        }

        await Comments.create({
            user,
            password,
            content,
            postId: req.params._postId,
        });

        res.status(201).json({ message: "댓글을 생성하였습니다." });
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});

// 댓글 조회
router.get("/:_postId", async (req, res) => {
    try {
        const posting = await Comments.find();
        const results = posting.map((comments) => {
            return {
                commentId: comments._id,
                user: comments.user,
                content: comments.content,
                createdAt: comments.createdAt,
            };
        });
        res.json({
            data: results,
        });
    } catch (error) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});

// 댓글 수정
router.put("/:_commentId", async (req, res) => {
    try {
        const { _commentId } = req.params;
        const { password, title, content } = req.body;
        const existsComments = await Comments.findOne({ _id: _commentId });

        if (existsComments === null) {
            return res
                .status(404)
                .json({ message: "댓글 조회에 실패하였습니다." });
        }
        if (content.length === 0) {
            return res
                .status(400)
                .json({ message: "댓글 내용을 입력해주세요." });
        }
        await Comments.updateOne(
            { _id: _commentId },
            { $set: { password, title, content } }
        );
        return res.json({ message: "댓글을 수정하였습니다." });
    } catch (error) {
        return res
            .status(400)
            .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});

// 댓글 삭제
router.delete("/:_commentId", async (req, res) => {
    try {
        const { _commentId } = req.params;
        const { password } = req.body;
        const existsComments = await Comments.findOne({ _id: _commentId });

        if (existsComments.password !== password) {
            return res.status(403).json({ message: "비밀번호가 다릅니다" });
        }

        if (existsComments === null) {
            return res
                .status(404)
                .json({ message: "댓글 조회에 실패하였습니다." });
        }

        await Comments.deleteOne({ password: password });
        return res.status(200).json({ message: "댓글을 삭제하였습니다." });
    } catch (error) {
        return res
            .status(400)
            .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});

module.exports = router;
