export default function Toggle({
  toggleMovies,
  option
}) {
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "dropdown-item",
    href: "#",
    onClick: () => {
      toggleMovies(option);
    }
  }, option));
}