import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { validateAndAddOrUpdateMovieDetails } from "../../utils/functions";
import MovieDoesNotExist from "./MovieDoesNotExist";

export default function UpdateIndividualMoviePage() {
  const [setUpdateMovieSuccess, updateSelectedMovie, updatePinnedMovie] =
    useOutletContext();
  const params = useParams();
  const movies = useSelector(function (store) {
    return store.movie.value;
  });
  const selectedMovieToUpdate = movies.find(
    (movie) => movie.movieID === parseInt(params.movieID)
  );
  const movieExists = selectedMovieToUpdate !== undefined;
  const [selectedMovie, setSelectedMovie] = useState(selectedMovieToUpdate);

  console.log("What is the movies array: ", movies);
  console.log(
    "What is the selected movie for updating: ",
    selectedMovieToUpdate
  );

  function handleSubmit(event) {
    event.preventDefault(); // Prevents form from refreshing the page
    const validatedDetails = validateAndAddOrUpdateMovieDetails(event);
    if (validatedDetails) {
      // This block of code updates the selected movie details in sessionStorage
      updateSelectedMovie(selectedMovie);
      setUpdateMovieSuccess(true);

      // This block of code updates the pinned movie details in sessionStorage (if it exists)
      updatePinnedMovie(selectedMovie);
    }
  }

  function handleMovieNameChange(event) {
    setSelectedMovie((selectedMovie) => ({
      ...selectedMovie,
      name: event.target.value,
    }));
  }

  function handleMovieDescriptionChange(event) {
    setSelectedMovie((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  }

  function handleMovieReleaseDateChange(event) {
    setSelectedMovie((prevState) => ({
      ...prevState,
      releaseDate: event.target.value,
    }));
  }

  function handleMovieImageURLChange(event) {
    setSelectedMovie((prevState) => ({
      ...prevState,
      imageURL: event.target.value,
    }));
  }

  function handleMovieGenreIDChange(event) {
    setSelectedMovie((prevState) => ({
      ...prevState,
      genreID: parseInt(event.target.value),
    }));
  }

  function handleMovieActiveChange(event) {
    setSelectedMovie((prevState) => ({
      ...prevState,
      active: event.target.value,
    }));
  }

  console.log("FINAL UPDATED MOVIE: ", selectedMovie);

  return movieExists ? (
    <>
      <b id="updateIndividualMovieText">Update Movie {params.movieID}:</b>
      <form id="form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="form-group form-div">
          <label htmlFor="form-movie-name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="form-movie-name"
            placeholder="Movie Name"
            maxLength="30"
            defaultValue={selectedMovieToUpdate.name}
            onChange={handleMovieNameChange}
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
            defaultValue={selectedMovieToUpdate.description}
            onChange={handleMovieDescriptionChange}
          ></textarea>
        </div>
        <div className="form-group form-div">
          <label htmlFor="form-movie-release-date">Release Date:</label>
          <input
            type="text"
            className="form-control"
            id="form-movie-release-date"
            placeholder="2022-12-25 10:00:00"
            defaultValue={selectedMovieToUpdate.releaseDate}
            onChange={handleMovieReleaseDateChange}
          />
        </div>
        <div className="form-group form-div">
          <label htmlFor="form-movie-image-url">Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="form-movie-image-url"
            placeholder="https://bit.ly/3jsLvr4"
            defaultValue={selectedMovieToUpdate.imageURL}
            onChange={handleMovieImageURLChange}
          />
        </div>
        <div className="form-group form-div">
          <label htmlFor="form-movie-genre-id">Genre ID:</label>
          <select
            className="form-control"
            id="form-movie-genre-id"
            defaultValue={selectedMovieToUpdate.genreID}
            onChange={handleMovieGenreIDChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div className="form-group form-div">
          <label htmlFor="form-movie-active">Active:</label>
          <select
            className="form-control"
            id="form-movie-active"
            defaultValue={selectedMovieToUpdate.active}
            onChange={handleMovieActiveChange}
          >
            <option>Y</option>
            <option>N</option>
          </select>
        </div>
        <div className="form-group form-div-button">
          <button type="submit" className="btn btn-outline-success">
            Update Movie
          </button>
        </div>
      </form>
    </>
  ) : (
    <MovieDoesNotExist />
  );
}