/**
 * A Bootstrap form that allows the admin to delete:
 *  - Multiple movies from the in-memory list / sessionStorage
 *  - Take note the difference between:
 *     - DeleteMovieForm.jsx (singular - delete 1 movie only at a time) and
 *     - DeleteMoviesForm.jsx (plural - can delete multiple movies at a time)
 */import { deleteMultipleMovieDetails } from "../../utils/functions.js";
export default function DeleteMoviesForm({
  setDeleteMultipleMoviesSuccess,
  deleteMultipleMovies,
  movies
}) {
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
    onClick: event => {
      deleteMultipleMovieDetails(event, movies, deleteMultipleMovies, setDeleteMultipleMoviesSuccess);
    }
  }, "Delete Movies")));
}