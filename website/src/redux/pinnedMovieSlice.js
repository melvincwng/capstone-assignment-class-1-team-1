// pinnedMovieSlice.js (Contains an array of pinned movies as the state of the store)

import { createSlice } from "@reduxjs/toolkit";

export const pinnedMovieSlice = createSlice({
  name: "Pinned Movies Slice",
  initialState: {
    value: [],
  },
  reducers: {
    updatePinnedMovieDetails: function (state, action) {
      // For pinnedMovies key in sessionStorage
      const index = JSON.parse(
        sessionStorage.getItem("pinnedMovies")
      ).findIndex((movie) => {
        return movie.movieID === action.payload.selectedMovie.movieID;
      });

      // If the movie is not pinned (aka index === -1), end the function
      if (index === -1) return;

      // If the movie is pinned, update the pinnedMovies array in sessionStorage
      let newPinnedMovies = JSON.parse(sessionStorage.getItem("pinnedMovies"));
      newPinnedMovies[index] = action.payload.selectedMovie;
      sessionStorage.setItem("pinnedMovies", JSON.stringify(newPinnedMovies));
      state.value = newPinnedMovies;
    },
    pinMovie: function (state, action) {
      let pinnedMovies = JSON.parse(sessionStorage.getItem("pinnedMovies"));
      if (pinnedMovies.length < 5) {
        pinnedMovies.push(action.payload.movieDetails);
        sessionStorage.setItem("pinnedMovies", JSON.stringify(pinnedMovies));
        state.value = pinnedMovies;
      }
    },
    unpinMovie: function (state, action) {
      let pinnedMovies = JSON.parse(sessionStorage.getItem("pinnedMovies"));
      let {
        movieID,
        name,
        description,
        releaseDate,
        imageURL,
        genreID,
        active,
      } = action.payload.movieDetails;
      let movieIndex = pinnedMovies.findIndex(
        (pinnedMovie) =>
          pinnedMovie.movieID === movieID &&
          pinnedMovie.name === name &&
          pinnedMovie.description === description &&
          pinnedMovie.releaseDate === releaseDate &&
          pinnedMovie.imageURL === imageURL &&
          pinnedMovie.genreID === genreID &&
          pinnedMovie.active === active
      );
      pinnedMovies.splice(movieIndex, 1);
      sessionStorage.setItem("pinnedMovies", JSON.stringify(pinnedMovies));
      state.value = pinnedMovies;
    },
  },
});

// Use these to update the state in your component
export const { updatePinnedMovieDetails, pinMovie, unpinMovie } =
  pinnedMovieSlice.actions;

// This part goes into the store.
export default pinnedMovieSlice.reducer;
