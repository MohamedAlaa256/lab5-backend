const AppError = require("../utils/appError");

const errorHandling = (err, req, res, next) => {
    console.log(`${err}${err.name}`);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            status: "failed",
            message: `Duplicate value for: ${field}`,
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            status: "failed",
            message: "Invalid format for the id",
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            status: "error",
            message: "Invalid token",
        });
    }

    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};

module.exports = errorHandling; 
