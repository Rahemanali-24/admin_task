import logger from "../config/logger.config.js";
import BaseError from "../errors/base.error.js";
import { StatusCodes } from "http-status-codes";
function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.details,
      data: {},
    });
  }
  logger.error("An unexpected error occurred", {
    message: err.message,
    stack: err.stack,
    requestPath: req.path,
    requestBody: req.body,
  });
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong",
    errors: err,
    data: {},
  });
}
export default errorHandler;
