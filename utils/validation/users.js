const Joi = require("joi");

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword:Joi.string().required().valid(Joi.ref('password'))
});
const loginSchema= Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().min(6).required(),
 
})
const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role:Joi.string()
});

const updateUserSchema = createUserSchema.fork(['name', 'email', 'password','role'], (schema) => schema.optional());

module.exports = {
    createUserSchema,
    updateUserSchema,
    signupSchema,
    loginSchema
};
