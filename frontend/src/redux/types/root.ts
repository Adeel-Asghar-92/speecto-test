import bookReducer from '../slices/bookSlice';

export type RootState = {
    book: ReturnType<typeof bookReducer>;
  };