export default function FrontCard({
  data
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card mb-3 card-div-front-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row g-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-4"
  }, /*#__PURE__*/React.createElement("img", {
    src: data.imageURL,
    className: "img-fluid rounded-start",
    alt: "about-us-image"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-md-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "card-title"
  }, data.frontCardName), /*#__PURE__*/React.createElement("p", {
    className: "card-text"
  }, data.frontCardTextOne), /*#__PURE__*/React.createElement("p", {
    className: "card-text text-muted rotate-card-text"
  }, /*#__PURE__*/React.createElement("small", null, data.frontCardTextTwo))))));
}