const Post = require("../models/posts")
const AppError = require("../utils/appError");
const User = require("../models/posts");




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

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) throw new AppError("Post not found", 404);

  const userIdFromToken = req.user._id.toString();
  const userRole = req.user.role;

  if (post.userId.toString() !== userIdFromToken && userRole !== 'admin') {
    throw new AppError("You are not authorized to view this post", 403);
  }

  res.status(200).json({
    status: "success",
    post,
  });
};



const deletePost = async (req, res) => {
  const { id } = req.params;
  const deleted = await Post.findByIdAndDelete(id);
  if (!deleted) throw new AppError("Post not found", 404);
  res.status(200).json({
    status: "success",
    message: "Post deleted",
  });
};



module.exports={
    createPost,
    getPost,
    getPostById,
    deletePost,
}