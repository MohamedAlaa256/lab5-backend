const express = require("express");
const { createPost, getPost } = require("../controllers/posts");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, createPost);  
router.get("/", getPost);  

module.exports = router;
