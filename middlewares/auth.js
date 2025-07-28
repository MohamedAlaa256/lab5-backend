const jwt = require("jsonwebtoken");
const util = require("util");
const jwtVerify = util.promisify(jwt.verify);
const AppError = require("../utils/appError");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];  
    if (!token) throw new AppError("No token provided", 401);  

    const jwtSecret = process.env.JWT_SECRET;
    console.log(jwtSecret)
    console.log(token)
    const payload = await jwtVerify(token, jwtSecret);  

    const user = await User.findById(payload.sub).select("-password"); 
    if (!user) throw new AppError("User not found", 404);  

    req.user = user;  
    next();  
  } catch (err) {
    next(err);  
  }
};

module.exports = auth;
