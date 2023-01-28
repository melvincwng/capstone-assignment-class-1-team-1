import DeleteMovieForm from "./DeleteMovieForm.js";
import DeleteMoviesForm from "./DeleteMoviesForm.js";
import AdditionalNotes from "./AdditionalNotes.js";
import Empty from "./Empty.js";
import { MoviesContext } from "../../context/moviesContext.js";
import { throwError } from "../../utils/functions.js";
import { useOutletContext } from "react-router-dom";
export default function DeleteMoviePage(props) {
  /**
   * Simulating an error caused by a) React's own source code issues or b) Logic issues with our code
   * The throwError() is to remain commented out unless you want to test/demo the Error Boundary component during the interview
   */
  // throwError();

  const movies = JSON.parse(sessionStorage.getItem("movies"));
  const moviesEmpty = movies.length === 0;
  console.log("Debugging movies BEFORE deletion -->", movies);
  const [setDeleteOneMovieSuccess, deleteOneMovie, setDeleteMultipleMoviesSuccess, deleteMultipleMovies] = useOutletContext();
  return /*#__PURE__*/React.createElement(React.Fragment, null, !moviesEmpty ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
    id: "deleteMovieText"
  }, "Delete One Movie:"), /*#__PURE__*/React.createElement(DeleteMovieForm, {
    setDeleteOneMovieSuccess: setDeleteOneMovieSuccess,
    deleteOneMovie: deleteOneMovie,
    movies: movies
  }), /*#__PURE__*/React.createElement("b", {
    id: "deleteMultipleMoviesText"
  }, "Delete Multiple Movies*:"), /*#__PURE__*/React.createElement(DeleteMoviesForm, {
    setDeleteMultipleMoviesSuccess: setDeleteMultipleMoviesSuccess,
    deleteMultipleMovies: deleteMultipleMovies,
    movies: movies
  }), /*#__PURE__*/React.createElement(AdditionalNotes, null)) : /*#__PURE__*/React.createElement("ul", {
    id: "movieUnorderedListTwo"
  }, /*#__PURE__*/React.createElement("b", {
    id: "deleteMovieText"
  }, "Delete Movie:"), /*#__PURE__*/React.createElement(Empty, null)));
}