/**
 * A Bootstrap button that toggles the hiding or showing past movies
 */import ToggleList from "./ToggleList.js";
export default function ToggleMoviesBtn({
  toggleMovies,
  toggleMoviesOptions
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dropdown"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary dropdown-toggle",
    type: "button",
    "data-bs-toggle": "dropdown",
    "aria-expanded": "false",
    id: "toggleMoviesBtn"
  }, "Toggle Movies"), /*#__PURE__*/React.createElement("ul", {
    className: "dropdown-menu genreOptions"
  }, /*#__PURE__*/React.createElement(ToggleList, {
    toggleMovies: toggleMovies,
    toggleMoviesOptions: toggleMoviesOptions
  })));
}