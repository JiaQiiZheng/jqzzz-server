import express from "express";

import { getPosts, createPost } from "../../controllers/Post/posts.js";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/createPost", createPost);

export default router;
