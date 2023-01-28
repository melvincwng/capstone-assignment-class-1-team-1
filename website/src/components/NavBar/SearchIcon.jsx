import { IoSearch } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { searchMoviesByName } from "../../redux/movieSlice";
import { NAVBAR_OPTIONS, SEARCH_MOVIES_BY_NAME } from "../../utils/constants";

export default function SearchIcon(props) {
  const [movieName, setMovieName] = React.useState("");
  const dispatch = useDispatch();
  const atHomePage = props.activeTab === NAVBAR_OPTIONS.RETRIEVE_MOVIE;

  function handleClick() {
    if (!movieName) {
      alert("Please enter a movie name!");
      return;
    }

    alert(`Searching for ${movieName}...`);

    dispatch(
      searchMoviesByName({
        name: SEARCH_MOVIES_BY_NAME,
        searchTerm: movieName,
      })
    );

    setMovieName("");
  }

  return atHomePage ? (
    <span
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={function () {
        props.onMouseLeave();
        setMovieName("");
      }}
    >
      {props.searchBarVisible && (
        <SearchBar movieName={movieName} setMovieName={setMovieName} />
      )}
      <IoSearch id="searchIcon" onClick={handleClick} />
    </span>
  ) : (
    ""
  );
}
