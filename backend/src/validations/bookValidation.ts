import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import winston from "winston";
import { ERROR_MESSAGES } from "../constants/errorMsg";
import { validateFields } from "../utils/validation";

// validation for books
const validateBook = (req: Request) => {
  const { title, author, genre, year } = req.body;
  const requiredFields = { title, author, genre, year };
  console.log(typeof year);

  const fieldTypes = {
    title: "string",
    author: "string",
    genre: "string",
    year: "number",
  };

  return validateFields(requiredFields, fieldTypes);
};

export const bookValidation = {
  validateCreate: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validateBook(req)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ERROR_MESSAGES.MISSING_FIELDS,
          status: StatusCodes.BAD_REQUEST,
        });
      }

      return next();
    } catch (error) {
      winston.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  validateUpdateById: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body._id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Book ID is required",
          status: StatusCodes.BAD_REQUEST,
        });
      }

      if (!validateBook(req)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ERROR_MESSAGES.MISSING_FIELDS,
          status: StatusCodes.BAD_REQUEST,
        });
      }

      return next();
    } catch (error) {
      winston.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
  validateDeleteById: (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.params.id", req.params.id);

      if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Book ID is required",
          status: StatusCodes.BAD_REQUEST,
        });
      }

      return next();
    } catch (error) {
      // Handle  errors that occur during validation
      winston.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },
};

