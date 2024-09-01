import { Schema, model, Document } from "mongoose";
import { IBook } from "../contracts/book";

interface BookDocument extends IBook, Document {}

const bookSchema = new Schema<BookDocument>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
});

export const BookModel = model<BookDocument>("Book", bookSchema);

