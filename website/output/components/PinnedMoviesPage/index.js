import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "../RetrieveMoviePage/MovieList.js";
import Empty from "./Empty.js";
import { useOutletContext } from "react-router-dom";
export default function PinnedMoviesPage() {
  const dispatch = useDispatch();
  const [setActiveTab] = useOutletContext();
  const pinnedMoviesArray = useSelector(function (store) {
    return store.pinnedMovie.value;
  });
  console.log("Pinned Movies Array: ", pinnedMoviesArray);
  return /*#__PURE__*/React.createElement(React.Fragment, null, pinnedMoviesArray.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
    id: "pinnedMoviesText"
  }, "Pinned Movies:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("ul", {
    id: "movieUnorderedList"
  }, /*#__PURE__*/React.createElement(MovieList, {
    movies: pinnedMoviesArray,
    setActiveTab: setActiveTab
  }))) : /*#__PURE__*/React.createElement("ul", {
    id: "movieUnorderedListTwo"
  }, /*#__PURE__*/React.createElement("b", {
    id: "pinnedMoviesText"
  }, "Pinned Movies:"), /*#__PURE__*/React.createElement(Empty, null)));
}