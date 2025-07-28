const Joi = require("joi");

exports.createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  photo: Joi.string().optional(),
  userId: Joi.string().required() 
});
