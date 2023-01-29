import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function UpdateMoviesPage() {
  const movies = useSelector(function (store) {
    return store.movie.value;
  });
  const arrayOfMovieIDs = movies.map(function (movie) {
    return movie.movieID;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "400px"
    }
  }, /*#__PURE__*/React.createElement("b", {
    id: "updateMoviesText"
  }, "Update Movies:"), /*#__PURE__*/React.createElement("br", null), "Which One \uD83E\uDD14?", /*#__PURE__*/React.createElement("br", null), arrayOfMovieIDs.length ? arrayOfMovieIDs.map(function (movieID) {
    return /*#__PURE__*/React.createElement("div", {
      key: movieID
    }, /*#__PURE__*/React.createElement(Link, {
      to: `/update-movies/${movieID}`
    }, "Movie ", movieID));
  }) : "No movies available to update 😔");
}