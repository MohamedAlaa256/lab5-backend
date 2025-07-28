require('dotenv').config();
const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandling=require("./middlewares/errorHandling")
const path = require('path');

// app.use(express.json());
// Middlewares
app.use(express.static(path.join(__dirname,"uploads")))
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/users", usersRouter);
app.use("/posts",postRouter );

app.use(errorHandling)





// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server listening on port ${process.env.PORT || 5000}`);

// });
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

  modules.exports=app
  