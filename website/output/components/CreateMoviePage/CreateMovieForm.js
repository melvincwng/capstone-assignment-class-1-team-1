/**
 * A Bootstrap form that allows the admin to fill in the details of a new movie & add it to the in-memory list / sessionStorage
 * @param {function} addMovies - A function passed in from the parent component (CreateMovie) that adds a new movie to the in-memory list / sessionStorage
 */import { validateAndAddOrUpdateMovieDetails } from "../../utils/functions.js";
export default function CreateMovieForm({
  setCreateMovieSuccess,
  addMovies,
  setMovieIDsCounter,
  movieIDsCounter
}) {
  return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-name"
  }, "Name:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "form-movie-name",
    placeholder: "Movie Name",
    maxLength: "30"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-description"
  }, "Description:"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-control",
    id: "form-movie-description",
    rows: "3",
    placeholder: "Enter Movie Description here",
    maxLength: "200"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-release-date"
  }, "Release Date:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "form-movie-release-date",
    placeholder: "2022-12-25 10:00:00"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-image-url"
  }, "Image URL:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "form-movie-image-url",
    placeholder: "https://bit.ly/3jsLvr4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-genre-id"
  }, "Genre ID:"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "form-movie-genre-id"
  }, /*#__PURE__*/React.createElement("option", null, "1"), /*#__PURE__*/React.createElement("option", null, "2"), /*#__PURE__*/React.createElement("option", null, "3"), /*#__PURE__*/React.createElement("option", null, "4"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form-movie-active"
  }, "Active:"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "form-movie-active"
  }, /*#__PURE__*/React.createElement("option", null, "Y"), /*#__PURE__*/React.createElement("option", null, "N"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-div-button"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-outline-success",
    onClick: event => {
      validateAndAddOrUpdateMovieDetails(event, movieIDsCounter, setMovieIDsCounter, addMovies, setCreateMovieSuccess);
    }
  }, "Create Movie")));
}