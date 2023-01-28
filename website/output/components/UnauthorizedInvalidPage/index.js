import { clearSessionStorage } from "./../../utils/functions.js";
export default function UnauthorizedInvalidPage() {
  function goBack() {
    clearSessionStorage();
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      textAlign: "center"
    }
  }, "Error 401: Unauthorized"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "345px"
    }
  }, /*#__PURE__*/React.createElement("div", null, "Something went wrong!"), /*#__PURE__*/React.createElement("div", null, "You have entered an invalid URL/route!"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: goBack
  }, "\u2B05\uFE0F Click here to go back!"))));
}