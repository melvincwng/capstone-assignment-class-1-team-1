export default function BackCard({
  data
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card mb-3 card-div-back-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "card-title"
  }, data.backCardTextOne), /*#__PURE__*/React.createElement("div", {
    className: "card-text back-card-ul"
  }, /*#__PURE__*/React.createElement("ul", null, data.backCardTextTwoArray.map((task, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, task)), /*#__PURE__*/React.createElement("li", null, data.githubText, " ", /*#__PURE__*/React.createElement("a", {
    href: data.githubURL,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "github-link"
  }, data.clickHereText))))));
}