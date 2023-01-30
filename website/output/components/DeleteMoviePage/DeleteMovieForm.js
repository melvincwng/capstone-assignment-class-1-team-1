/**
 * A Bootstrap form that allows the admin to delete:
 *  - A movie from the in-memory list / sessionStorage
 *  - Take note the difference between:
 *     - DeleteMovieForm.jsx (singular - delete 1 movie only at a time) and
 *     - DeleteMoviesForm.jsx (plural - can delete multiple movies at a time)
 */import { deleteOneMovieDetails } from "../../utils/functions.js";
import { API_HOST } from "../../utils/constants.js";
export default function DeleteMovieForm({
  setDeleteOneMovieSuccess,
  deleteOneMovie,
  movies
}) {
  async function deleteMovieDetailsInTheDB(deletedMovieIDString) {
    try {
      const requestOptions = {
        method: "DELETE",
        credentials: "include"
      };
      const response = await fetch(`${API_HOST}/movies/${deletedMovieIDString}`, requestOptions);
      const responseData = await response.json();
      console.log("What is the server's response (deletion of movie): ", responseData);
      return responseData;
    } catch (error) {
      alert("Failed to delete movie!\nPlease try again later 😞");
      console.log(error);
      return null;
    }
  }
  async function handleDelete(event) {
    // Prevents form from refreshing the page
    event.preventDefault();

    // Approach 1 (for WDF): This deletes the selected movie details in sessionStorage & returns the deleted 'movieID' in a string format (for use later below when we hit the DELETE /movies/:movieID API endpoint)
    // Pure FE/WDF approach is to delete the movie details in sessionStorage so that when user navigates back to the RetrieveMoviePage, the deleted movie details is removed.
    // Also in other pages, some of the features might still be dependent on sessionStorage, hence to do this step too.
    const deletedMovieIDString = deleteOneMovieDetails(movies, deleteOneMovie, setDeleteOneMovieSuccess);
    console.log("What is the movieID of the deleted movie from sessionStorage - (string format): ", deletedMovieIDString);

    // Approach 2 (for FCP): Need to hit the DELETE /movies/:movieID API endpoint to delete the movie details directly in the DB
    const movieDeletedInDB = await deleteMovieDetailsInTheDB(deletedMovieIDString);
    if (movieDeletedInDB) {
      alert("Movie deleted successfully in the sessionStorage and DB! 🎉");
    }
  }
  return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-movieID"
  }, "Select 1 Movie ID To Delete:"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "form-movie-movieID"
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
    onClick: handleDelete
  }, "Delete Movie")));
}