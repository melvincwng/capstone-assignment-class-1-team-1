export default function Genre({
  filterMovies,
  genre
}) {
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "dropdown-item",
    href: "#",
    onClick: () => {
      filterMovies(genre);
    }
  }, genre.name));
}