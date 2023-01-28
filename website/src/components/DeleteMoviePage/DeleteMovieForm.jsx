/**
 * A Bootstrap form that allows the admin to delete:
 *  - A movie from the in-memory list / sessionStorage
 *  - Take note the difference between:
 *     - DeleteMovieForm.jsx (singular - delete 1 movie only at a time) and
 *     - DeleteMoviesForm.jsx (plural - can delete multiple movies at a time)
 */

import { deleteOneMovieDetails } from "../../utils/functions";

export default function DeleteMovieForm({
  setDeleteOneMovieSuccess,
  deleteOneMovie,
  movies,
}) {
  return (
    <form>
      <div className="form-group form-div">
        <label htmlFor="form-movie-movieID">Select 1 Movie ID To Delete:</label>
        <select className="form-control" id="form-movie-movieID">
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
            deleteOneMovieDetails(
              event,
              movies,
              deleteOneMovie,
              setDeleteOneMovieSuccess
            );
          }}
        >
          Delete Movie
        </button>
      </div>
    </form>
  );
}
