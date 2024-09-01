import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getBooksService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../../services/bookService";
import { IBook } from "../../interfaces/book";

const initialState: IBook[] = [];

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getBooksService.fulfilled,
        (state, action: PayloadAction<IBook[]>) => {
          return [...action.payload];
        }
      )
      .addCase(createBookService.fulfilled, (state, action: PayloadAction<IBook[]>) => {
        state.push(...action.payload);
      })
      .addCase(updateBookService.fulfilled, (state, action: PayloadAction<IBook>) => {
        const index = state.findIndex(
          (book) => book._id === action.payload._id
        );
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      })
      // .addCase(deleteBookService.fulfilled, (state, action: PayloadAction<IBook>) => {
      //   let index = state.findIndex(({ _id }) => _id === action.payload._id);
      //   state.splice(index, 1);
      // });
  },
});

const { reducer } = bookSlice;
export default reducer;
