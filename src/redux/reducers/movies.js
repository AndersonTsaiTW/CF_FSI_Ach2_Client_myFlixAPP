import { createSlice } from "@reduxjs/toolkit";

// Define a movies slice for store movies' information and filter within the Redux state.
// Includes reducers for setting movies data and updating the search filter.
export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    filter: ""
  },
  reducers: {
    setMovies: ( state, action ) => {
      state.movies = action.payload;
    },
    setFilter: ( state, action ) => {
      state.filter = action.payload;
    }
  }
})

export const { setMovies, setFilter } = moviesSlice.actions;
export default moviesSlice.reducer;