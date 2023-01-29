import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { formatDate, validateAndAddOrUpdateMovieDetails } from "../../utils/functions.js";
import MovieDoesNotExist from "./MovieDoesNotExist.js";
export default function UpdateIndividualMoviePage() {
  const [setUpdateMovieSuccess, updateSelectedMovie, updatePinnedMovie] = useOutletContext();
  const params = useParams();
  const movies = useSelector(function (store) {
    return store.movie.value;
  });
  const selectedMovieToUpdate = movies.find(movie => movie.movieID === parseInt(params.movieID));
  const movieExists = selectedMovieToUpdate !== undefined;
  const [selectedMovie, setSelectedMovie] = useState(selectedMovieToUpdate);
  console.log("What is the movies array: ", movies);
  console.log("What is the selected movie for updating: ", selectedMovieToUpdate);
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
    setSelectedMovie(selectedMovie => ({
      ...selectedMovie,
      name: event.target.value
    }));
  }
  function handleMovieDescriptionChange(event) {
    setSelectedMovie(prevState => ({
      ...prevState,
      description: event.target.value
    }));
  }
  function handleMovieReleaseDateChange(event) {
    setSelectedMovie(prevState => ({
      ...prevState,
      releaseDate: event.target.value
    }));
  }
  function handleMovieImageURLChange(event) {
    setSelectedMovie(prevState => ({
      ...prevState,
      imageURL: event.target.value
    }));
  }
  function handleMovieGenreIDChange(event) {
    setSelectedMovie(prevState => ({
      ...prevState,
      genreID: parseInt(event.target.value)
    }));
  }
  function handleMovieActiveChange(event) {
    setSelectedMovie(prevState => ({
      ...prevState,
      active: event.target.value
    }));
  }
  console.log("FINAL UPDATED MOVIE: ", selectedMovie);

  // selectedMovieToUpdate.releaseDate obtained from DB is in ISOString format (i.e. 2022-12-25T10:00:00.000Z)
  // We have to convert it to a format that can be used in the UpdateIndividualMoviePage form (i.e. 2022-12-25 10:00:00)
  const formattedReleaseDate = formatDate(new Date(selectedMovieToUpdate.releaseDate));
  return movieExists ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
    id: "updateIndividualMovieText"
  }, "Update Movie ", params.movieID, ":"), /*#__PURE__*/React.createElement("form", {
    id: "form",
    encType: "multipart/form-data",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-name"
  }, "Name:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "form-movie-name",
    placeholder: "Movie Name",
    maxLength: "30",
    defaultValue: selectedMovieToUpdate.name,
    onChange: handleMovieNameChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-description"
  }, "Description:"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-control",
    id: "form-movie-description",
    rows: "3",
    placeholder: "Enter Movie Description here",
    maxLength: "200",
    defaultValue: selectedMovieToUpdate.description,
    onChange: handleMovieDescriptionChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-release-date"
  }, "Release Date:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "form-movie-release-date",
    placeholder: "2022-12-25 10:00:00",
    defaultValue: formattedReleaseDate,
    onChange: handleMovieReleaseDateChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-image-url"
  }, "Image URL:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "form-movie-image-url",
    placeholder: "https://bit.ly/3jsLvr4",
    defaultValue: selectedMovieToUpdate.imageURL,
    onChange: handleMovieImageURLChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-genre-id"
  }, "Genre ID:"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "form-movie-genre-id",
    defaultValue: selectedMovieToUpdate.genreID,
    onChange: handleMovieGenreIDChange
  }, /*#__PURE__*/React.createElement("option", null, "1"), /*#__PURE__*/React.createElement("option", null, "2"), /*#__PURE__*/React.createElement("option", null, "3"), /*#__PURE__*/React.createElement("option", null, "4"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-active"
  }, "Active:"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "form-movie-active",
    defaultValue: selectedMovieToUpdate.active,
    onChange: handleMovieActiveChange
  }, /*#__PURE__*/React.createElement("option", null, "Y"), /*#__PURE__*/React.createElement("option", null, "N"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div-button"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-outline-success"
  }, "Update Movie")))) : /*#__PURE__*/React.createElement(MovieDoesNotExist, null);
}