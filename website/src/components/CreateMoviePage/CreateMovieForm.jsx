/**
 * A Bootstrap form that allows the admin to fill in the details of a new movie & add it to the in-memory list / sessionStorage
 * @param {function} addMovies - A function passed in from the parent component (CreateMovie) that adds a new movie to the in-memory list / sessionStorage
 */

import { validateAndAddOrUpdateMovieDetails } from "../../utils/functions";
import { API_HOST } from "./../../utils/constants";

export default function CreateMovieForm({
  setCreateMovieSuccess,
  addMovies,
  setMovieIDCounter,
  movieIDCounter,
}) {
  async function addMovieDetailsInTheDB(validatedDetails) {
    try {
      // Need to format the payload to a certain format before sending the POST request to the API endpoint
      const payload = validatedDetails;
      const formattedMovieDetailsPayload = {
        ...payload,
        genreID: payload.genreID.toString(),
      };
      console.log(
        "What is the formattedMovieDetailsPayload for POST request: ",
        formattedMovieDetailsPayload
      );

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedMovieDetailsPayload),
        credentials: "include",
      };

      const response = await fetch(`${API_HOST}/movies`, requestOptions);

      const responseData = await response.json();
      console.log("What is the server's response: ", responseData);

      return responseData;
    } catch (error) {
      alert("Failed to add movie!\nPlease try again later 😞");
      console.log(error);
      return null;
    }
  }

  async function handleSubmit(event) {
    // Prevents form from refreshing the page
    event.preventDefault();

    // Approach 1 (for WDF): Call validateAndAddOrUpdateMovieDetails() to validate the movie details & add it to sessionStorage if ok
    // Certain features in the web app are dependent on sessionStorage, hence to do this step too
    // When that function has finish executing, it will return a movie payload object which is assigned to the variable 'validatedDetails'
    // This would then be used in the POST /movies request to add the movie details directly into the DB (see approach 2 below)
    const validatedDetails = validateAndAddOrUpdateMovieDetails(
      event,
      addMovies,
      setCreateMovieSuccess,
      movieIDCounter,
      setMovieIDCounter
    );

    if (validatedDetails) {
      // Approach 2 (for FCP): Need to hit the POST /movies API endpoint to add the movie details directly in the DB
      const movieAddedInDB = await addMovieDetailsInTheDB(validatedDetails);

      if (movieAddedInDB) {
        alert("Movie added successfully in the sessionStorage and DB! 🎉");
      }
    }
  }

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
          onClick={handleSubmit}
        >
          Create Movie
        </button>
      </div>
    </form>
  );
}
