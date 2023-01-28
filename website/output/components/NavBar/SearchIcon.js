import { IoSearch } from "react-icons/io5";
import SearchBar from "./SearchBar.js";
import { useDispatch } from "react-redux";
import { searchMoviesByName } from "../../redux/movieSlice.js";
import { NAVBAR_OPTIONS, SEARCH_MOVIES_BY_NAME } from "../../utils/constants.js";
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
    dispatch(searchMoviesByName({
      name: SEARCH_MOVIES_BY_NAME,
      searchTerm: movieName
    }));
    setMovieName("");
  }
  return atHomePage ? /*#__PURE__*/React.createElement("span", {
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: function () {
      props.onMouseLeave();
      setMovieName("");
    }
  }, props.searchBarVisible && /*#__PURE__*/React.createElement(SearchBar, {
    movieName: movieName,
    setMovieName: setMovieName
  }), /*#__PURE__*/React.createElement(IoSearch, {
    id: "searchIcon",
    onClick: handleClick
  })) : "";
}