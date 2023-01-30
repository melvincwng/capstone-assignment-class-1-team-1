import { API_HOST } from "./constants.js";
import { toggleMoviesArray } from "../redux/movieSlice.js"; /**
                                                             * A utility function that converts a genre ID to a genre type.
                                                             */
export const convertGenreIDToGenreType = genreID => {
  const genreType = genreID === 1 ? "Action" : genreID === 2 ? "Anime" : genreID === 3 ? "Fantasy" : genreID === 4 ? "Sci-fi" : "Unknown";
  return genreType;
};

/**
 * A utility function that will throw an error.
 * This is used to test if the Error Boundary Component is working.
 * If an error is thrown either by:
 *    a) React Runtime (aka issues with React's source code) or
 *    b) Issues with our own source code
 * The Error Boundary Component will catch it and display the custom backup UI component, instead of the whole app crashing.
 */

export function throwError() {
  throw new Error("Testing the Error Boundary Component if it's working...");
}

/**
 * A utility function that formats a date to a more readable format - YYYY-MM-DD HH:MM:SS
 * This will be used in the validateMovieDetails() function below
 */

export function formatDate(date) {
  return [date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, "0"), date.getDate().toString().padStart(2, "0")].join("-") + " " + [date.getHours().toString().padStart(2, "0"), date.getMinutes().toString().padStart(2, "0"), date.getSeconds().toString().padStart(2, "0")].join(":");
}

/**
 * A utility function that:
 *  - a) Validates the movie details in the 'Create Movie' page / CreateMovieForm.jsx component &
 *  - b) Adds the movie details into the homepage if all validation checks pass (you will see new movie being added there).
 *  - c) Also, from addMovies() dispatcher fn found in App.jsx, when that fn is triggered, it will dispatch an Action to update the movies array in sessionStorage (see moviesReducer.jsx - case ADD_NEW_MOVIE)
 *
 * This utility function is used in the UpdateIndividualMoviePage.jsx component:
 * - a) When the 'Update Movie' button is clicked, this function is called to validate the movie details
 * - b) If all validation checks pass, the movie details will be updated in the homepage
 *
 * In short, validateAndAddOrUpdateMovieDetails does one of the following, depending on where it is called from:
 *  - a) Validates & Adds a movie if the user is in the 'Create Movie' page
 *  - b) Validates & Updates a movie if the user is in the 'Update Movie' page
 */

export function validateAndAddOrUpdateMovieDetails(event, movieIDsCounter, setMovieIDsCounter, addMovies, setCreateMovieSuccess) {
  console.log("Validating movie details...");
  const movieName = document.getElementById("form-movie-name").value.trim();
  const movieDescription = document.getElementById("form-movie-description").value.trim();
  const movieReleaseDate = document.getElementById("form-movie-release-date").value.trim();
  const movieImageURL = document.getElementById("form-movie-image-url").value.trim();
  const movieGenreID = document.getElementById("form-movie-genre-id").value.trim();
  const movieActive = document.getElementById("form-movie-active").value.trim();
  console.log("Movie Details:", movieName, movieDescription, movieReleaseDate, movieImageURL, movieGenreID, movieActive);

  // Validation check 1 - Check if any of the fields are empty
  const haveEmptyFields = !movieName || !movieDescription || !movieReleaseDate || !movieImageURL || !movieGenreID || !movieActive;

  // Validation check 2 - check if movieReleaseDate is of the correct format (YYYY-MM-DD HH:MM:SS)
  // Use regex to check if movieReleaseDate is of the appropriate format (YYYY-MM-DD HH:MM:SS) --> need this format to store in in-memory array/sessionStorage
  // FYI, in the section of the regexp where a whitespace is present (aka \s) --> My VSCode settings will make \s become s --> Hence, we need to add an additional \ so become \\s (escape character for first \)
  // Reference: https://regexlib.com/REDetails.aspx?regexp_id=1824
  const validReleaseDateRegex = new RegExp("^([0-9]{4})-([0-1][0-9])-([0-3][0-9])\\s([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$");
  const movieReleaseDateValid = validReleaseDateRegex.test(movieReleaseDate);
  console.log("Is the Movie Release Date in a valid format --->", movieReleaseDateValid);

  // Validation check 3 - A validation check to check if movieImageURL is a valid link/URL (using regex)
  // This regex checks if the image URL optionally starts with http/https: and '://', subdomain can be anything, domain name of 2-256 chars, and top level domain e.g. .com/.org etc of 2-6 chars
  const validURLRegex = new RegExp("((http|https)://)?" + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)", "i");
  const movieImageURLValid = validURLRegex.test(movieImageURL);
  console.log("Is Movie Image URL Valid --->", movieImageURLValid);
  const passAllValidationChecks = !haveEmptyFields && movieReleaseDateValid && movieImageURLValid;
  if (passAllValidationChecks) {
    event.preventDefault();
    alert("Passed all validation checks ✔️! \nPlease wait while we add or update this movie to the sessionStorage & database 😀!");

    /**
     * Sanitize all user input using DOMPurify to prevent XSS attacks:
     *  - e.g. <img src=a onerror=alert('XSS')>
     *  - Without DOMPurify, the above code will be executed and an alert box will pop up mimicking an XSS attack, when the payload is sent to & stored in the in-memory array / sessionStorage, and the movie details page is rendered with the XSS movie details
     *  - With DOMPurify, the above code will be sanitized and instead will not be executed (i.e. <img src=a onerror=alert('XSS')> will become <img src="a">)
     */
    const payload = movieIDsCounter ? {
      movieID: parseInt(`${DOMPurify.sanitize(movieIDsCounter)}`),
      name: `${DOMPurify.sanitize(movieName)}`,
      description: `${DOMPurify.sanitize(movieDescription)}`,
      releaseDate: `${DOMPurify.sanitize(movieReleaseDate)}`,
      imageURL: `${DOMPurify.sanitize(movieImageURL)}`,
      genreID: parseInt(`${DOMPurify.sanitize(movieGenreID)}`),
      active: `${DOMPurify.sanitize(movieActive)}`,
      dateInserted: `${formatDate(new Date())}`
    } : {};

    // TO-REMOVE-2 for FCP: Used only for frontend to simulate auto-increment of movieIDs.
    // In reality, this will be handled by the backend DB which will auto-increment the movieIDs for us.
    setMovieIDsCounter && setMovieIDsCounter(prevCount => prevCount + 1);
    console.log("Logging Sanitized Payload for debugging:", payload);

    // Once validation checks all passed and payload is sanitized, we can add the movie details / payload into the in-memory array
    addMovies && addMovies(payload);

    // Alert user that movie details have been successfully added or updated (depends on where it's being called from)
    alert("Movie successfully added or updated to the sessionStorage & database 😃!");

    // Activate the setState hook for 'createMovieSuccess' state and set it to true
    setCreateMovieSuccess && setCreateMovieSuccess(true);
    return true;
  } else {
    alert("Failed validation checks ❌! \nPlease check your movie details and try again 😢!");
    setCreateMovieSuccess && setCreateMovieSuccess(false);
    return false;
  }
}

/**
 * A utility function that clears sessionStorage when the page is refreshed
 */

export function clearSessionStorage() {
  sessionStorage.removeItem("movies");
  sessionStorage.removeItem("pinnedMovies");
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("role");
  window.location.hash = "";
  window.location.reload();
}

/**
 * A utility function that:
 *  - a) Deletes ONE movie in the 'Delete Movie' page / DeleteMovieForm.jsx component
 *  - b) Also, from deleteOneMovie() dispatcher fn found in App.jsx, when that fn is triggered, it will dispatch an Action to delete a selected movie from the movies array in sessionStorage (see moviesReducer.jsx - case DELETE_ONE_MOVIE)
 */

export function deleteOneMovieDetails(event, movies, deleteOneMovie, setDeleteOneMovieSuccess) {
  try {
    event.preventDefault();

    // Get the movie ID of the movie to be deleted
    const movieID = parseInt(document.getElementById("form-movie-movieID").value.trim());
    console.log("Deleting movie with movieID:", movieID);

    // Validation check 1 - A validation check to check if that selected movie/movieID exists in the in-memory array/sessionStorage.
    const movieDetails = movies.find(movie => movie.movieID === movieID);

    // The variable 'movieDetails' is essentially the movie object that we want to delete from the in-memory array/sessionStorage
    // Or else, it will be undefined if the movie/movieID does not exist in the in-memory array/sessionStorage
    console.log("Movie exists: ", movieDetails);

    // Once validation checks all passed, delete that one movie from the in-memory array/sessionStorage
    if (movieDetails) {
      deleteOneMovie(movieDetails);
    } else {
      throw new Error("Movie does not exist in the in-memory array 😢! Trying to delete an invalid movie/movieID");
    }

    // Alert user that movie details have been successfully deleted
    alert("Movie sucessfully deleted from the in-memory array / sessionStorage 😃!");

    // Activate the setState hook for 'deleteOneMovieSuccess' state and set it to true
    setDeleteOneMovieSuccess(true);
    return true;
  } catch (error) {
    alert("Failed to delete ONE movie details ❌ due to an unexpected error! \nPlease try again later 😢!");
    console.log("An unexpected error occurred when deleting movie details.");
    console.log("Please check if you are trying to delete a movie that does not exist in the in-memory array / sessionStorage.");
    console.log("Alternatively, check the logs for the actual error msg:", error);
    return false;
  }
}

/**
 * A utility function that:
 *  - a) Deletes multiple movies in the 'Delete Movie' page / DeleteMoviesForm.jsx component i.e. with 'S' --> plural; for deleting multiple movies(S)
 *  - b) Also, from deleteMultipleMovies() dispatcher fn found in App.jsx, when that fn is triggered, it will dispatch an Action to delete MULTIPLE selected movies from the movies array in sessionStorage (see moviesReducer.jsx - case DELETE_MULTIPLE_MOVIES)
 */

export function deleteMultipleMovieDetails(event, movies, deleteMultipleMovies, setDeleteMultipleMoviesSuccess) {
  try {
    event.preventDefault();

    // Get the movieIDs of all the movies that was selected for deletion
    const formSelectElement = document.getElementById("form-movie-multiple-movieIDs");
    const arrayOfMovieIDs = getSelectedMovieIDs(formSelectElement);
    console.log("Deleting movies with these movieIDs:", arrayOfMovieIDs);

    // Validation check 1:
    // - A validation check to check if that selected movies/movieIDs exists in the in-memory array/sessionStorage.
    // - If the movieID doesn't exist, it will be filtered out from the arrayOfSelectedMoviesIDs
    const arrayOfSelectedMovies = movies.filter(movie => {
      return arrayOfMovieIDs.includes(movie.movieID);
    });
    const arrayOfSelectedMoviesIDs = arrayOfSelectedMovies.map(movie => {
      return movie.movieID;
    });
    console.log("All the selected movies IDs in this array: ", arrayOfSelectedMoviesIDs);

    // Once validation checks all passed, delete all the selected multiple movies from the in-memory array/sessionStorage
    if (Array.isArray(arrayOfSelectedMoviesIDs) && arrayOfSelectedMoviesIDs.length) {
      deleteMultipleMovies(arrayOfSelectedMoviesIDs);
    } else {
      throw new Error("Unable to delete multiple movies ❌ as arrayOfSelectedMoviesIDs is undefined or an empty array! You must select at least one movie to delete 😢! ");
    }

    // Alert user that multiple movie details have been successfully deleted
    alert("Multiple movies sucessfully deleted from the in-memory array / sessionStorage 😃!");

    // Activate the setState hook for 'deleteMultipleMoviesSuccess' state and set it to true
    setDeleteMultipleMoviesSuccess(true);
    return true;
  } catch (error) {
    alert("Failed to delete MULTIPLE movie details ❌! \nIt could be because you did not click on any option! \nPlease check & try again later 😢!");
    console.log("An unexpected error occurred when deleting multiple movie details.");
    console.log("Please check if you are trying to delete movie(s) that do not exist in the in-memory array / sessionStorage.");
    console.log("Alternatively, check the logs for the actual error msg:", error);
    return false;
  }
}

/**
 * A utility function that retrieves all the selected movieIDs for the "Delete Multiple Movies" form/component (with 'multiple' attribute) in DeleteMoviePage
 * It basically returns an array of selected movieIDs of data-type: Integer, after passing in the select element as a parameter
 */

export function getSelectedMovieIDs(selectElement) {
  let result = [];
  let options = selectElement && selectElement.options;
  let option;
  for (var i = 0; i < options.length; i++) {
    option = options[i];
    if (option.selected) {
      result.push(parseInt(option.value || option.text));
    }
  }
  return result;
}

/**
 * A utility function that logout the user when a) the page is refreshed or b) the user clicks on the 'Logout' button
 */

export async function logout(event) {
  const isLoggedIn = sessionStorage.getItem("loggedIn");
  if (isLoggedIn) {
    // When the user refreshes the page, it will create a pop-up alert box that asks the user if they want to 'Reload Site?' & shows 2 options - 'Reload' or 'Cancel'.
    // Regardless of which option the user chooses, the page will still be refreshed
    event.returnValue = "";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: null,
      credentials: "include"
    };
    const logoutResponse = await fetch(`${API_HOST}/logout`, requestOptions);
    const logoutResponseData = await logoutResponse.json();
    alert(logoutResponseData.message);
  }
  clearSessionStorage();
}

/**
 * A utility function that fetches all movies from the database (i.e. ranked based on their movieID & order of insertion - ascending order)
 * Reference: https://medium.com/@techrally/react-to-async-await-553c43f243e2
 */

export async function fetchAllMovies(dispatch, option, showInitialMovies) {
  try {
    const response = await fetch(`${API_HOST}/movies`);
    const data = await response.json();
    console.log("Fetching all the movies via the GET /movies API route: ", data);
    dispatch(toggleMoviesArray({
      name: option,
      showInitialMovies: showInitialMovies,
      data: data
    }));
  } catch (error) {
    console.log(error);
    alert("An error occurred while fetching all the movies from the database!\nPlease try again later 😔");
    return [];
  }
}