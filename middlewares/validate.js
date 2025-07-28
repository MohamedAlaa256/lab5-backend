const AppError = require("../utils/appError");

const validate = (userSchema) => {
    return async (req, res, next) => {
        const { error } = await userSchema.validate(req.body);
        if (error) {
            console.log(error)
            throw new AppError(error.details[0].message, 400);

        }
        next()
    }
}
module.exports={
    validate
}