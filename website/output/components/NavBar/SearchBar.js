export default function SearchBar(props) {
  function handleChange(event) {
    props.setMovieName(event.target.value);
  }
  return /*#__PURE__*/React.createElement("input", {
    id: "searchInputBar",
    type: "search",
    placeholder: "Search",
    "aria-label": "Search",
    autoComplete: "off",
    onChange: handleChange
  });
}