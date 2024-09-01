import { IBook } from "../contracts/book";
import { IRepository, createRepository } from "../generic";
import { BookModel } from "../models";
import { createService } from "./services";

const bookRepository: IRepository<IBook> = createRepository(BookModel);

export const bookService = createService(bookRepository);
