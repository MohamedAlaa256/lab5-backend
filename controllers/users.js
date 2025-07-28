// const express = require("express");
const AppError = require("../../Lab5/utils/appError");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util =require('util')
// const crypto = require("crypto");
const jwtSign = util.promisify(jwt.sign)


const signup = async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...body, password: hashedPassword });
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    user: user,
  });
};
const login = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new AppError("email or password wrong", 400);
  }
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError("email or password wrong", 400);
  }

  const jwtSecret =
    "e26ec0d9edbc9a25d7a5e03a321fa9c6b2bb4c5bfab42a11f33fa2d369abc9a6";
  const access_token = await jwtSign(
    { sub: user._id, name: user.name },
    jwtSecret,
    { expiresIn: "1d" }
  ); 

  res.status(201).json({
    status: "success",
    data: { access_token },
  });
};

const createUser = async (req, res) => {
  const body = req.body;
  if (req.imageUrls) {
    body.photo = req.imageUrls[0];  
  }
  
  const user = await User.create(body);  
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    user: user,
  });
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find(req.query);
  res.status(200).json({ status: "success", users });
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.status(200).json({ status: "success", message: { user } });
};

const getUserByEmail = async (req, res) => {
  const { email } = req.query;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.status(200).json({ status: "success", message: { user } });
};
const updateUserPatch = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const user = await User.findByIdAndUpdate(id, body, { new: true });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    user,
  });
};

const updateUserPut = async (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  if (!body) {
    res
      .status(400)
      .json({ status: "faild", message: "Please provide user data" });
    return;
  }
  const users = await getUsers();
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    res.status(404).json({ status: "faild", message: "User not found" });
    return;
  }
  users[userIndex] = body;
  await writeData(users);
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    user: users[userIndex],
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: "success", message: "User deleted successfully" });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserPatch,
  updateUserPut,
  deleteUser,
  getUserByEmail,
  signup,
  login,
};
