/**
 * A Bootstrap form that allows the admin to fill in the details of a new movie & add it to the in-memory list / sessionStorage
 * @param {function} addMovies - A function passed in from the parent component (CreateMovie) that adds a new movie to the in-memory list / sessionStorage
 */

import { validateAndAddOrUpdateMovieDetails } from "../../utils/functions";

export default function CreateMovieForm({
  setCreateMovieSuccess,
  addMovies,
  setMovieIDsCounter,
  movieIDsCounter,
}) {
  return (
    <form>
      <div className="form-group form-div">
        <label htmlFor="form-movie-name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="form-movie-name"
          placeholder="Movie Name"
          maxLength="30"
        />
      </div>
      <div className="form-group form-div">
        <label htmlFor="form-movie-description">Description:</label>
        <textarea
          className="form-control"
          id="form-movie-description"
          rows="3"
          placeholder="Enter Movie Description here"
          maxLength="200"
        ></textarea>
      </div>
      <div className="form-group form-div">
        <label htmlFor="form-movie-release-date">Release Date:</label>
        <input
          type="text"
          className="form-control"
          id="form-movie-release-date"
          placeholder="2022-12-25 10:00:00"
        />
      </div>
      <div className="form-group form-div">
        <label htmlFor="form-movie-image-url">Image URL:</label>
        <input
          type="text"
          className="form-control"
          id="form-movie-image-url"
          placeholder="https://bit.ly/3jsLvr4"
        />
      </div>
      <div className="form-group form-div">
        <label htmlFor="form-movie-genre-id">Genre ID:</label>
        <select className="form-control" id="form-movie-genre-id">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>
      <div className="form-group form-div">
        <label htmlFor="form-movie-active">Active:</label>
        <select className="form-control" id="form-movie-active">
          <option>Y</option>
          <option>N</option>
        </select>
      </div>
      <div className="form-group form-div-button">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={(event) => {
            validateAndAddOrUpdateMovieDetails(
              event,
              movieIDsCounter,
              setMovieIDsCounter,
              addMovies,
              setCreateMovieSuccess
            );
          }}
        >
          Create Movie
        </button>
      </div>
    </form>
  );
}
