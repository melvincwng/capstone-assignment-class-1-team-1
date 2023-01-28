import { YES, NO, HIDE_PAST_MOVIES, SHOW_PAST_MOVIES, SHOW_ALL_MOVIES, FILTER_MOVIES_BY_GENRE, ADD_NEW_MOVIE, DELETE_ONE_MOVIE, DELETE_MULTIPLE_MOVIES, INITIAL_MOVIES as initialMoviesArray } from "../utils/constants.js";
export default function moviesReducer(currentMovies, action) {
  switch (action.name) {
    case HIDE_PAST_MOVIES:
      {
        if (action.showInitialMovies) {
          return initialMoviesArray.filter(movie => movie.active === YES);
        }
        currentMovies = JSON.parse(sessionStorage.getItem("movies"));
        return currentMovies.filter(movie => movie.active === YES);
      }
    case SHOW_PAST_MOVIES:
      {
        if (action.showInitialMovies) {
          return initialMoviesArray.filter(movie => movie.active === NO);
        }
        currentMovies = JSON.parse(sessionStorage.getItem("movies"));
        return currentMovies.filter(movie => movie.active === NO);
      }
    case SHOW_ALL_MOVIES:
      {
        if (action.showInitialMovies) {
          return initialMoviesArray;
        }
        currentMovies = JSON.parse(sessionStorage.getItem("movies"));
        return currentMovies;
      }
    case FILTER_MOVIES_BY_GENRE:
      {
        if (action.showInitialMovies) {
          return initialMoviesArray.filter(movie => movie.genreID === action.genreID);
        }
        currentMovies = JSON.parse(sessionStorage.getItem("movies"));
        return currentMovies.filter(movie => movie.genreID === action.genreID);
      }
    case ADD_NEW_MOVIE:
      {
        /**
         * Add the new movies array into sessionStorage for some level of persistence
         * We need a location to store the updated movie array whenever we are adding a new movie
         * Or else, if we do other UI actions (e.g. click the Filter button to filter by genre), the new movie that was added will not appear (due to lack of persistence)
         */
        let newMoviesArray = [...JSON.parse(sessionStorage.getItem("movies")), action.movieDetails];
        sessionStorage.setItem("movies", JSON.stringify(newMoviesArray));
        return newMoviesArray;
      }
    case DELETE_ONE_MOVIE:
      {
        console.log("BEFORE DELETION OF 1 MOVIE:", JSON.parse(sessionStorage.getItem("movies")));
        let newMoviesArray = JSON.parse(sessionStorage.getItem("movies")).filter(movie => movie.movieID !== action.movieID);
        console.log("AFTER DELETION OF 1 MOVIE:", newMoviesArray);
        sessionStorage.setItem("movies", JSON.stringify(newMoviesArray));
        return newMoviesArray;
      }
    case DELETE_MULTIPLE_MOVIES:
      {
        const selectedMovieIDsToBeDeleted = action.movieIDs; // Contains an array of selected movie IDs for deletion
        console.log("BEFORE DELETION OF MULTIPLE MOVIES:", JSON.parse(sessionStorage.getItem("movies")));
        // If the movieID is not inside the selectedMovieIDsToBeDeleted array, then we keep it in the newMoviesArray
        // Else, we filter it out & remove it
        let newMoviesArray = JSON.parse(sessionStorage.getItem("movies")).filter(movie => !selectedMovieIDsToBeDeleted.includes(movie.movieID));
        console.log("AFTER DELETION OF MULTIPLE MOVIES:", newMoviesArray);
        sessionStorage.setItem("movies", JSON.stringify(newMoviesArray));
        return newMoviesArray;
      }
  }
}