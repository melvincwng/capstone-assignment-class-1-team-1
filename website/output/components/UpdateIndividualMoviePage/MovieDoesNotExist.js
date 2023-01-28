import { Link } from "react-router-dom";
export default function MovieDoesNotExist() {
  return /*#__PURE__*/React.createElement("div", {
    id: "movieDoesNotExist",
    style: {
      minHeight: "400px"
    }
  }, /*#__PURE__*/React.createElement("b", null, "Movie does not exist!"), /*#__PURE__*/React.createElement("br", null), "You are trying to edit a movie that either:", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "A) Doesn't exist anymore \u274C or"), /*#__PURE__*/React.createElement("li", null, "B) Doesn't exist in the first place \u2753")), /*#__PURE__*/React.createElement(Link, {
    to: "/update-movies"
  }, "\u2B05\uFE0F Click to return to Update Movies Page"));
}