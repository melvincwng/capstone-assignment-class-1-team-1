import ToggleMoviesBtn from "./ToggleMoviesBtn.js";
import FilterMoviesByGenreBtn from "./FilterMoviesByGenreBtn.js";
import MovieList from "./MovieList.js";
import Empty from "./Empty.js";
import { TOGGLE_MOVIES_OPTIONS as toggleMoviesOptions } from "../../utils/constants.js";
import { GENRES as genres } from "../../utils/constants.js";
import { MoviesContext } from "../../context/moviesContext.js";
import { useOutletContext } from "react-router-dom";
export default function RetrieveMoviePage(props) {
  const [toggleMovies, filterMovies, setActiveTab] = useOutletContext();
  const movies = React.useContext(MoviesContext);
  const moviesEmpty = movies.length === 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    id: "moviesHeader"
  }, /*#__PURE__*/React.createElement("b", {
    id: "retrieveMovieText"
  }, "Retrieve Movie:"), /*#__PURE__*/React.createElement(ToggleMoviesBtn, {
    toggleMovies: toggleMovies,
    toggleMoviesOptions: toggleMoviesOptions
  }), /*#__PURE__*/React.createElement(FilterMoviesByGenreBtn, {
    filterMovies: filterMovies,
    genres: genres
  })), /*#__PURE__*/React.createElement("ul", {
    id: "movieUnorderedList"
  }, !moviesEmpty ? /*#__PURE__*/React.createElement(MovieList, {
    movies: movies,
    setActiveTab: setActiveTab
  }) : /*#__PURE__*/React.createElement(Empty, null)));
}