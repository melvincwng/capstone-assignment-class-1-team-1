import FrontCard from "./FrontCard.js";
import BackCard from "./BackCard.js";
export default function ProfileCard({
  data
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "card-flip-parent-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-flip-child-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-flip-front-card"
  }, /*#__PURE__*/React.createElement(FrontCard, {
    data: data
  })), /*#__PURE__*/React.createElement("div", {
    className: "card-flip-back-card"
  }, /*#__PURE__*/React.createElement(BackCard, {
    data: data
  })))), /*#__PURE__*/React.createElement("br", null));
}