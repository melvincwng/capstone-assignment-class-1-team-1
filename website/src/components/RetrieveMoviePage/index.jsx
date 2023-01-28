import ToggleMoviesBtn from "./ToggleMoviesBtn";
import FilterMoviesByGenreBtn from "./FilterMoviesByGenreBtn";
import MovieList from "./MovieList";
import Empty from "./Empty";
import { TOGGLE_MOVIES_OPTIONS as toggleMoviesOptions } from "../../utils/constants.js";
import { GENRES as genres } from "../../utils/constants.js";
import { MoviesContext } from "../../context/moviesContext";
import { useOutletContext } from "react-router-dom";

export default function RetrieveMoviePage(props) {
  const [toggleMovies, filterMovies, setActiveTab] = useOutletContext();
  const movies = React.useContext(MoviesContext);
  const moviesEmpty = movies.length === 0;

  return (
    <>
      <span id="moviesHeader">
        <b id="retrieveMovieText">Retrieve Movie:</b>
        <ToggleMoviesBtn
          toggleMovies={toggleMovies}
          toggleMoviesOptions={toggleMoviesOptions}
        />
        <FilterMoviesByGenreBtn filterMovies={filterMovies} genres={genres} />
      </span>
      <ul id="movieUnorderedList">
        {!moviesEmpty ? (
          <MovieList movies={movies} setActiveTab={setActiveTab} />
        ) : (
          <Empty />
        )}
      </ul>
    </>
  );
}
