
import { DEBUG_MODE } from "../config/index"
import CustomErrorHandler from "../service/customErrorHandler";

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = {
        success: false,
        msg: "internal server error",
        ...(DEBUG_MODE == "true" && { originalMessage: err.message })
    }
    if (err instanceof CustomErrorHandler) {
        statusCode = err.status
        message = {
            success: false,
            msg: err.message
        }
    }

    return res.status(statusCode).json(message)
}

module.exports= errorHandler; 