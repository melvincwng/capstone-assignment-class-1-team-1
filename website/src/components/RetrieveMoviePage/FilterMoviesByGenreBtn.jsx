/**
 * A Bootstrap button that takes in an array of genres and displays them as a dropdown menu
 * When a particular genre is selected, the movies are filtered by that genre
 */

import GenreList from "./GenreList";

export default function FilterMoviesByGenreBtn({ filterMovies, genres }) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="filterMoviesByGenreBtn"
      >
        Genre
      </button>
      <ul className="dropdown-menu genreOptions">
        <GenreList filterMovies={filterMovies} genres={genres} />
      </ul>
    </div>
  );
}
