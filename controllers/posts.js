const Post = require("../models/posts")
const AppError = require("../utils/appError");
const User = require("../models/users");




const createPost = async (req, res) => {
  const body = req.body;
 
  
  const post = await Post.create({...body,userId:req.user._id});
  res
    .status(201)
    .json({
      status: "success",
      message: "Post created successfully",
      post: post,
    });
};

const getPost = async (req, res) => {
  
  const posts = await Post.find().populate('userId');
  res
    .status(201)
    .json({
      status: "success",
      message: "get all post successfully",
      post: posts,
    });
};



module.exports={
    createPost,
    getPost
}