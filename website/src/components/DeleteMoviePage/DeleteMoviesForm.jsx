/**
 * A Bootstrap form that allows the admin to delete:
 *  - Multiple movies from the in-memory list / sessionStorage
 *  - Take note the difference between:
 *     - DeleteMovieForm.jsx (singular - delete 1 movie only at a time) and
 *     - DeleteMoviesForm.jsx (plural - can delete multiple movies at a time)
 */

import { deleteMultipleMovieDetails } from "../../utils/functions";

export default function DeleteMoviesForm({
  setDeleteMultipleMoviesSuccess,
  deleteMultipleMovies,
  movies,
}) {
  return (
    <form>
      <div className="form-group form-div">
        <label htmlFor="form-movie-multiple-movieIDs">
          Select Multiple Movie IDs To Delete:
        </label>
        <select
          className="form-control"
          id="form-movie-multiple-movieIDs"
          size={movies.length}
          multiple
        >
          {movies.map((movie) => {
            return (
              <option key={movie.movieID} value={movie.movieID}>
                {movie.movieID}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group form-div-button">
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={(event) => {
            deleteMultipleMovieDetails(
              event,
              movies,
              deleteMultipleMovies,
              setDeleteMultipleMoviesSuccess
            );
          }}
        >
          Delete Movies
        </button>
      </div>
    </form>
  );
}
