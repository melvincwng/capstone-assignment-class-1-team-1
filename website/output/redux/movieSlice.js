// movieSlice.js (Contains an array of movies as the state of the store)

import { createSlice } from "@reduxjs/toolkit";
import { YES, NO, SORT_BY_A_TO_Z, SORT_BY_Z_TO_A, HIDE_PAST_MOVIES, SHOW_PAST_MOVIES, SHOW_ALL_MOVIES, INITIAL_MOVIES as initialMoviesArray } from "../utils/constants.js";
export const movieSlice = createSlice({
  name: "Movie Slice",
  initialState: {
    value: initialMoviesArray
  },
  reducers: {
    toggleMoviesArray: function (state, action) {
      if (action.payload.showInitialMovies) {
        // If user did not make changes to the movies (at the start initially, we use initialMoviesArray)
        // Have to "reset" the state of the store also upon clicking a new option on the 'Toggle' button
        switch (action.payload.name) {
          case SORT_BY_A_TO_Z:
            const copiedArrayToSortAToZ = [...initialMoviesArray]; // Reference: shorturl.at/cqOR8
            state.value = initialMoviesArray;
            state.value = copiedArrayToSortAToZ.sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
            break;
          case SORT_BY_Z_TO_A:
            const copiedArrayToSortZToA = [...initialMoviesArray]; // Reference: shorturl.at/cqOR8
            state.value = initialMoviesArray;
            state.value = copiedArrayToSortZToA.sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            });
            break;
          case HIDE_PAST_MOVIES:
            state.value = initialMoviesArray;
            state.value = state.value.filter(movie => movie.active === YES);
            break;
          case SHOW_PAST_MOVIES:
            state.value = initialMoviesArray;
            state.value = state.value.filter(movie => movie.active === NO);
            break;
          case SHOW_ALL_MOVIES:
            state.value = initialMoviesArray;
            break;
        }
      } else {
        // If user made changes to the movies (e.g. add new movie, delete movie(s), etc.), then we use the movies from sessionStorage (updated movies array)
        switch (action.payload.name) {
          case SORT_BY_A_TO_Z:
            state.value = JSON.parse(sessionStorage.getItem("movies")).sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
            break;
          case SORT_BY_Z_TO_A:
            state.value = JSON.parse(sessionStorage.getItem("movies")).sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            });
            break;
          case HIDE_PAST_MOVIES:
            state.value = JSON.parse(sessionStorage.getItem("movies")).filter(movie => movie.active === YES);
            break;
          case SHOW_PAST_MOVIES:
            state.value = JSON.parse(sessionStorage.getItem("movies")).filter(movie => movie.active === NO);
            break;
          case SHOW_ALL_MOVIES:
            state.value = JSON.parse(sessionStorage.getItem("movies"));
            break;
        }
      }
    },
    filterMoviesArray: function (state, action) {
      /**
       * When user makes a second new click on the genre from a previous genre click, we need to reset the movies array to the initialMoviesArray OR the updated movies array (from sessionStorage)
       * Or else, the state.value will be the filtered movies array from the previous click
       * For example, you click on "Action" genre, now state.value is reduced from 11 original movies to 7 action movies
       * If you don't reset the state of the store, when you click from "Action" to for example "Anime", state.value = 7 action movies
       * Hence, when you switch to "Anime", there will be no movies shown (since there are no anime movies in the 7 action movies)
       */
      if (action.payload.showInitialMovies) {
        // Reset the state of the store for every new click on each option of the 'Genre' button
        state.value = initialMoviesArray;

        // If user did not make changes to the movies (at the start initially, we use initialMoviesArray)
        state.value = state.value.filter(movie => movie.genreID === action.payload.genreID);
      } else {
        // Reset the state of the store for every new click on each option of the 'Genre' button
        state.value = JSON.parse(sessionStorage.getItem("movies"));

        // If user made changes to the movies (e.g. add new movie, delete movie(s), etc.), then we use the movies from sessionStorage (updated movies array)
        state.value = JSON.parse(sessionStorage.getItem("movies")).filter(movie => movie.genreID === action.payload.genreID);
      }
    },
    addNewMovieDetails: function (state, action) {
      let newMoviesArray = [...JSON.parse(sessionStorage.getItem("movies")), action.payload.movieDetails];
      sessionStorage.setItem("movies", JSON.stringify(newMoviesArray));
      state.value = newMoviesArray;
    },
    deleteOneMovieDetails: function (state, action) {
      console.log("BEFORE DELETION OF 1 MOVIE:", JSON.parse(sessionStorage.getItem("movies")));
      let newMoviesArray = JSON.parse(sessionStorage.getItem("movies")).filter(movie => movie.movieID !== action.payload.movieID);
      console.log("AFTER DELETION OF 1 MOVIE:", newMoviesArray);
      sessionStorage.setItem("movies", JSON.stringify(newMoviesArray));
      state.value = newMoviesArray;
    },
    deleteMultipleMoviesDetails: function (state, action) {
      const selectedMovieIDsToBeDeleted = action.payload.movieIDs; // Contains an array of selected movie IDs for deletion
      console.log("BEFORE DELETION OF MULTIPLE MOVIES:", JSON.parse(sessionStorage.getItem("movies")));
      // If the movieID is not inside the selectedMovieIDsToBeDeleted array, then we keep it in the newMoviesArray
      // Else, we filter it out & remove it
      let newMoviesArray = JSON.parse(sessionStorage.getItem("movies")).filter(movie => !selectedMovieIDsToBeDeleted.includes(movie.movieID));
      console.log("AFTER DELETION OF MULTIPLE MOVIES:", newMoviesArray);
      sessionStorage.setItem("movies", JSON.stringify(newMoviesArray));
      state.value = newMoviesArray;
    },
    searchMoviesByName: function (state, action) {
      state.value = JSON.parse(sessionStorage.getItem("movies")).filter(movie => movie.name.toLowerCase().includes(action.payload.searchTerm.toLowerCase()));
    },
    updateMovieDetails: function (state, action) {
      // For movies key in sessionStorage
      const index = JSON.parse(sessionStorage.getItem("movies")).findIndex(movie => {
        return movie.movieID === action.payload.selectedMovie.movieID;
      });
      let newMovies = JSON.parse(sessionStorage.getItem("movies"));
      newMovies[index] = action.payload.selectedMovie;
      sessionStorage.setItem("movies", JSON.stringify(newMovies));
      state.value = newMovies;
    }
  }
});

// Use these to update the state in your component
export const {
  toggleMoviesArray,
  filterMoviesArray,
  addNewMovieDetails,
  deleteOneMovieDetails,
  deleteMultipleMoviesDetails,
  searchMoviesByName,
  updateMovieDetails
} = movieSlice.actions;

// This part goes into the store.
export default movieSlice.reducer;