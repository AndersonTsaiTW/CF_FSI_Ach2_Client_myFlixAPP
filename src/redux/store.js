import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies";
import userReducer from "./reducers/user";

export const store = configureStore({
  reducer: {
    movies: moviesReducer, // Attaches moviesReducer to manage the movies state slice
    user: userReducer      // Attaches userReducer to manage the user state slice
  }
});