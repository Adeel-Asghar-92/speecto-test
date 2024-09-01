import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './slices/bookSlice';

const reducer = {
  book: bookReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store; 