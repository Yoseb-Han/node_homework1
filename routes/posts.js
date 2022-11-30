const express = require("express");
const router = express.Router();
const Posts = require("../schemas/posts");

// 게시글 작성
router.post("/", async (req, res) => {
    try {
        const { user, password, title, content } = req.body;
        await Posts.create({ title, user, password, content });

        res.status(201).json({ message: "게시글을 생성하였습니다." });
    } catch (error) {
        return res
            .status(400)
            .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});

// 게시글 조회
router.get("/", async (req, res) => {
    try {
        const posting = await Posts.find();
        const results = posting.map((posts) => {
            return {
                postId: posts._id,
                user: posts.user,
                title: posts.title,
                createdAt: posts.createdAt,
            };
        });
        res.json({
            data: results,
        });
    } catch (error) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});

// 게시글 상세 조회
router.get("/:_postId", async (req, res) => {
    try {
        const { _postId } = req.params;
        const existPosts = await Posts.findOne({ _id: _postId });

        return res.json({
            postsId: existPosts._id,
            user: existPosts.user,
            title: existPosts.title,
            content: existPosts.content,
            createdAt: existPosts.createdAt,
        });
    } catch (error) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});

// 게시글 수정
router.put("/:_postId", async (req, res) => {
    try {
        const { _postId } = req.params;
        const { password, title, content } = req.body;
        const existsPosts = await Posts.findOne({ _id: _postId });

        if (existsPosts === null) {
            return res
                .status(404)
                .json({ message: "게시글 조회에 실패하였습니다." });
        }
        await Posts.updateOne(
            { _id: _postId },
            { $set: { password, title, content } }
        );
        return res.json({ message: "게시글을 수정하였습니다." });
    } catch (error) {
        return res
            .status(400)
            .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});

// 게시글 삭제
router.delete("/:_postId", async (req, res) => {
    try {
        const { _postId } = req.params;
        const { password } = req.body;
        const existsPosts = await Posts.findOne({ _id: _postId });
        console.log(password);
        console.log(existsPosts.password);
        if (existsPosts.password !== password) {
            return res.status(403).json({ message: "비밀번호가 다릅니다" });
        }

        if (existsPosts === null) {
            return res
                .status(404)
                .json({ message: "게시글 조회에 실패하였습니다." });
        }

        await Posts.deleteOne({ password: password });
        return res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } catch (error) {
        return res
            .status(400)
            .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});

// posts.router.js 파일을 require 할 때에는 router 변수에 할당된 값을 전달해줄거다
module.exports = router;
