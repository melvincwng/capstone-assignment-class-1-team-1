// storage.js
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice.js";
import pinnedMovieReducer from "./pinnedMovieSlice.js";
export default configureStore({
  reducer: {
    // Register reducers here
    movie: movieReducer,
    pinnedMovie: pinnedMovieReducer
  }
});