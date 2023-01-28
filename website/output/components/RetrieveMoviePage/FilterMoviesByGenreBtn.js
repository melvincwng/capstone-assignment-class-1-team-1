/**
 * A Bootstrap button that takes in an array of genres and displays them as a dropdown menu
 * When a particular genre is selected, the movies are filtered by that genre
 */import GenreList from "./GenreList.js";
export default function FilterMoviesByGenreBtn({
  filterMovies,
  genres
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dropdown"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary dropdown-toggle",
    type: "button",
    "data-bs-toggle": "dropdown",
    "aria-expanded": "false",
    id: "filterMoviesByGenreBtn"
  }, "Genre"), /*#__PURE__*/React.createElement("ul", {
    className: "dropdown-menu genreOptions"
  }, /*#__PURE__*/React.createElement(GenreList, {
    filterMovies: filterMovies,
    genres: genres
  })));
}