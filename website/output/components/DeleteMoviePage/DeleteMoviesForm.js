/**
 * A Bootstrap form that allows the admin to delete:
 *  - Multiple movies from the in-memory list / sessionStorage
 *  - Take note the difference between:
 *     - DeleteMovieForm.jsx (singular - delete 1 movie only at a time) and
 *     - DeleteMoviesForm.jsx (plural - can delete multiple movies at a time)
 */import { deleteMultipleMovieDetails } from "../../utils/functions.js";
import { API_HOST } from "../../utils/constants.js";
export default function DeleteMoviesForm({
  setDeleteMultipleMoviesSuccess,
  deleteMultipleMovies,
  movies
}) {
  async function deleteMultipleMovieDetailsInTheDB(deletedMovieIDsArray) {
    try {
      const payload = {
        movieIDs: deletedMovieIDsArray
      };
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        credentials: "include"
      };
      const response = await fetch(`${API_HOST}/movies`, requestOptions);
      const responseData = await response.json();
      console.log("What is the server's response (deletion of multiple movies): ", responseData);
      return responseData;
    } catch (error) {
      alert("Failed to delete multiple movies!\nPlease try again later 😞");
      console.log(error);
      return null;
    }
  }
  async function handleMultipleDelete(event) {
    // Prevents form from refreshing the page
    event.preventDefault();

    // Approach 1 (for WDF): This deletes the selected MULTIPLE movie details in sessionStorage & returns an array deleted 'movieIDs' (for use later below when we hit the DELETE /movies API endpoint)
    // Pure FE/WDF approach is to delete the multiple movie details in sessionStorage so that when user navigates back to the RetrieveMoviePage, those multiple deleted movie details are removed.
    // Also in other pages, some of the features might still be dependent on sessionStorage, hence to do this step too.
    const deletedMovieIDsArray = deleteMultipleMovieDetails(event, movies, deleteMultipleMovies, setDeleteMultipleMoviesSuccess);
    console.log("What is the array of deleted movieIDs from sessionStorage - (array format): ", deletedMovieIDsArray);

    // Approach 2 (for FCP): Need to hit the DELETE /movies API endpoint to delete multiple movie details directly in the DB
    const multipleMoviesDeletedInDB = deletedMovieIDsArray && (await deleteMultipleMovieDetailsInTheDB(deletedMovieIDsArray));
    if (multipleMoviesDeletedInDB) {
      alert("Multiple movies deleted successfully in the sessionStorage and DB! 🎉");
    }
  }
  return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-multiple-movieIDs"
  }, "Select Multiple Movie IDs To Delete:"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "form-movie-multiple-movieIDs",
    size: movies.length,
    multiple: true
  }, movies.map(movie => {
    return /*#__PURE__*/React.createElement("option", {
      key: movie.movieID,
      value: movie.movieID
    }, movie.movieID);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div-button"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-outline-danger",
    onClick: handleMultipleDelete
  }, "Delete Movies")));
}