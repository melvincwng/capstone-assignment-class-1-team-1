import CreateMovieForm from "./CreateMovieForm.js";
import { useOutletContext } from "react-router-dom";
export default function CreateMoviePage(props) {
  const [setCreateMovieSuccess, addMovies, setMovieIDsCounter, movieIDsCounter] = useOutletContext();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
    id: "createMovieText"
  }, "Create Movie:"), /*#__PURE__*/React.createElement(CreateMovieForm, {
    setCreateMovieSuccess: setCreateMovieSuccess,
    addMovies: addMovies,
    setMovieIDsCounter: setMovieIDsCounter,
    movieIDsCounter: movieIDsCounter
  }));
}