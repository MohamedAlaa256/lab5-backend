const express = require("express");
const { createPost, getPost,getPostById,deletePost } = require("../controllers/posts");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, createPost);  
router.get("/", getPost);  
router.get("/:id", auth, getPostById);
router.delete("/:id", deletePost);

module.exports = router;
