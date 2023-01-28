// storage.js
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import pinnedMovieReducer from "./pinnedMovieSlice";

export default configureStore({
  reducer: {
    // Register reducers here
    movie: movieReducer,
    pinnedMovie: pinnedMovieReducer,
  },
});
