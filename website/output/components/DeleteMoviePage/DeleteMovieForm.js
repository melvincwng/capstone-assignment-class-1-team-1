/**
 * A Bootstrap form that allows the admin to delete:
 *  - A movie from the in-memory list / sessionStorage
 *  - Take note the difference between:
 *     - DeleteMovieForm.jsx (singular - delete 1 movie only at a time) and
 *     - DeleteMoviesForm.jsx (plural - can delete multiple movies at a time)
 */import { deleteOneMovieDetails } from "../../utils/functions.js";
export default function DeleteMovieForm({
  setDeleteOneMovieSuccess,
  deleteOneMovie,
  movies
}) {
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
    onClick: event => {
      deleteOneMovieDetails(event, movies, deleteOneMovie, setDeleteOneMovieSuccess);
    }
  }, "Delete Movie")));
}