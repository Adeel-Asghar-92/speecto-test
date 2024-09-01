import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { bookService } from "../services/bookServices";
import { IBook } from "../contracts/book";

export const bookController = {
  create: async (req: Request, res: Response) => {
    try {
      const bookData: Partial<IBook> = req.body;
      const book = await bookService.create(bookData);
      const books = await bookService.getAll();

      return res.status(StatusCodes.CREATED).json({
        data: books,
        message: ReasonPhrases.CREATED,
        status: StatusCodes.CREATED,
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      });
    }
  },

  updateById: async (req: Request, res: Response) => {
    try {
      const bookId: string = req.body._id;
      const bookDataToUpdate: Partial<IBook> = req.body;

      const updatedBook = await bookService.updateById(
        bookId,
        bookDataToUpdate
      );

      if (!updatedBook) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Book not found",
          status: StatusCodes.NOT_FOUND,
        });
      }

      return res.status(StatusCodes.OK).json({
        data: updatedBook,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while updating the book",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const books = await bookService.getAll();

      return res.status(StatusCodes.OK).json({
        data: books,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while fetching books",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },

  // get by id
  getById: async (req: Request, res: Response) => {
    try {
      const bookId: string = req.body.id;
      console.log(bookId);
      
      const book = await bookService.getById(bookId);

      if (!book) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Book not found",
          status: StatusCodes.NOT_FOUND,
        });
      }

      return res.status(StatusCodes.OK).json({
        data: book,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while fetching the book",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const bookId: string = req.params.id;
      const deleteResult = await bookService.deleteById(bookId);

      if (!deleteResult) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Book not found",
          status: StatusCodes.NOT_FOUND,
        });
      }

      return res.status(StatusCodes.OK).json({
        message: "Book deleted successfully",
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while deleting the book",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },
};
