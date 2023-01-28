export default function SearchBar(props) {
  function handleChange(event) {
    props.setMovieName(event.target.value);
  }

  return (
    <input
      id="searchInputBar"
      type="search"
      placeholder="Search"
      aria-label="Search"
      autoComplete="off"
      onChange={handleChange}
    />
  );
}
