import { IBook } from "../interfaces/book";
import http from "../Common/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../utils/toast";

export const getBooksService = createAsyncThunk(
  "book/get",
  async () => {
    try {
      const res = await http.get("/book/get");
      return res.data.data;
    } catch (error) {
      console.error(error);
      toastError("Error getting coordinates");
      throw new Error("Error getting coordinates");
    }
  }
);

export const getBooksByIdService = createAsyncThunk(
  "book/getById",
  async (id: string) => {
    try {
      const res = await http.post(`/book/getById`, { id });
      return res.data.data;
    } catch (error) {
      console.error(error);
      toastError("Error getting book");
      throw new Error("Error getting book");
    }
  }
);

export const updateBookService = createAsyncThunk(
  "book/update",
  async (book: IBook): Promise<IBook> => {
    try {
      const response = await http.post<{ data: IBook }>(`/book/updateById`, book);
      toastSuccess("Book updated successfully");
      return response.data.data;
    } catch (error) {
      console.error(error);
      toastError("Error updating book");
      throw new Error("Error updating book");
    }
  }
);

export const createBookService = createAsyncThunk(
  "book/create",
  async (book: IBook): Promise<IBook[]> => {
    try {
      const response = await http.post<{ data: IBook[] }>(`/book/create`, book);
      toastSuccess("Book created successfully");
      return response.data.data;
    } catch (error) {
      console.error(error);
      toastError("Error creating book");
      throw new Error("Error creating book");
    }
  }
);

export const deleteBookService = createAsyncThunk(
  "book/delete",
  async (id: string): Promise<void> => {
    try {
      await http.delete(`/book/deleteById/${id}`);
      toastSuccess("Book deleted successfully");
    } catch (error) {
      console.error(error);
      toastError("Error deleting book");
      throw new Error("Error deleting book");
    }
  }
);

