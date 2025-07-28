const express = require("express");
const userController = require("../controllers/users");
const { validate } = require("../middlewares/validate");
const { upload, uploadFiles } = require("../middlewares/imageKitUpload");  
const auth = require("../middlewares/auth");
const restricted = require("../middlewares/restricted");
const { createUserSchema, signupSchema, loginSchema } = require("../utils/validation/users");
const router = express.Router();

router.post("/signup", validate(signupSchema), userController.signup);
router.post("/login", validate(loginSchema), userController.login);

router.post(
  "/", 
  auth, 
  restricted("admin", "superAdmin"), 
  upload.single("photo"), 
  uploadFiles(false), 
  validate(createUserSchema), 
  userController.createUser
);

router.get("/", userController.getAllUsers);
router.get("/email", userController.getUserByEmail);
router.get("/:id", userController.getUserById);
router.patch("/:id", validate(createUserSchema), userController.updateUserPatch);
router.put("/:id", validate(createUserSchema), userController.updateUserPut);
router.delete("/:id", userController.deleteUser);

module.exports = router;
