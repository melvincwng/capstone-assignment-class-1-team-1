import Toggle from "./Toggle.js";
export default function ToggleList({
  toggleMovies,
  toggleMoviesOptions
}) {
  return toggleMoviesOptions.map((option, index) => /*#__PURE__*/React.createElement(Toggle, {
    toggleMovies: toggleMovies,
    option: option,
    key: index
  }));
}