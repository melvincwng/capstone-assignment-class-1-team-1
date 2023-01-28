import SearchIcon from "./SearchIcon.js";
import NotificationsIcon from "./NotificationsIcon.js";
import ProfileIcon from "./ProfileIcon.js";
import { SHOW_ALL_MOVIES, NAVBAR_OPTIONS } from "../../utils/constants.js";
import { Link } from "react-router-dom";
export default function NavBar(props) {
  const [searchBarVisible, setSearchBarVisible] = React.useState(false);
  const [notificationsDropdownVisible, setNotificationsDropdownVisible] = React.useState(false);
  const [caretIconDown, setCaretIconDown] = React.useState(true);
  const [profileDropdownVisible, setProfileDropdownVisible] = React.useState(false);
  const activeTab = props.activeTab;
  const loggedIn = sessionStorage.getItem("loggedIn");
  const isAdmin = sessionStorage.getItem("role") === "admin";
  function handleActiveTab(tabName) {
    props.setActiveTab(tabName);
  }
  function handleClickRetrieveMovieTab(option) {
    props.toggleMovies(option);
  }
  function handleMouseEnterSearchIcon() {
    setSearchBarVisible(true);
  }
  function handleMouseLeaveSearchIcon() {
    setSearchBarVisible(false);
  }
  function handleMouseEnterNotificationsIcon() {
    setNotificationsDropdownVisible(true);
  }
  function handleMouseLeaveNotificationsIcon() {
    setNotificationsDropdownVisible(false);
  }
  function handleMouseEnterProfileIcon() {
    setCaretIconDown(false);
    setProfileDropdownVisible(true);
  }
  function handleMouseLeaveProfileIcon() {
    setCaretIconDown(true);
    setProfileDropdownVisible(false);
  }
  return /*#__PURE__*/React.createElement("nav", {
    className: "navbar navbar-expand-lg navbar-dark bg-dark",
    id: "navbar",
    style: {
      boxShadow: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./src/img/favicon.png",
    alt: "Company Logo",
    id: "companyLogo",
    onClick: () => {
      handleActiveTab(NAVBAR_OPTIONS.RETRIEVE_MOVIE);
      handleClickRetrieveMovieTab(SHOW_ALL_MOVIES);
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "navbar-toggler",
    type: "button",
    "data-bs-toggle": "collapse",
    "data-bs-target": "#navbarSupportedContent",
    "aria-controls": "navbarSupportedContent",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation",
    style: {
      border: "1px solid white"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "navbar-toggler-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "collapse navbar-collapse",
    id: "navbarSupportedContent"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav me-auto mb-2 mb-lg-0"
  }, /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/",
    className: activeTab === NAVBAR_OPTIONS.RETRIEVE_MOVIE ? "nav-link active" : "nav-link",
    onClick: () => {
      handleActiveTab(NAVBAR_OPTIONS.RETRIEVE_MOVIE);
      handleClickRetrieveMovieTab(SHOW_ALL_MOVIES);
    }
  }, NAVBAR_OPTIONS.RETRIEVE_MOVIE)), loggedIn && isAdmin ? /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/create-movie",
    className: activeTab === NAVBAR_OPTIONS.CREATE_MOVIE ? "nav-link active" : "nav-link",
    onClick: () => handleActiveTab(NAVBAR_OPTIONS.CREATE_MOVIE)
  }, NAVBAR_OPTIONS.CREATE_MOVIE)) : "", loggedIn && isAdmin ? /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/delete-movie",
    className: activeTab === NAVBAR_OPTIONS.DELETE_MOVIE ? "nav-link active" : "nav-link",
    onClick: () => handleActiveTab(NAVBAR_OPTIONS.DELETE_MOVIE)
  }, NAVBAR_OPTIONS.DELETE_MOVIE)) : "", loggedIn && isAdmin ? /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/update-movies",
    className: activeTab === NAVBAR_OPTIONS.UPDATE_MOVIES ? "nav-link active" : "nav-link",
    onClick: () => handleActiveTab(NAVBAR_OPTIONS.UPDATE_MOVIES)
  }, NAVBAR_OPTIONS.UPDATE_MOVIES)) : "", /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/pinned-movies",
    className: activeTab === NAVBAR_OPTIONS.PINNED_MOVIES ? "nav-link active" : "nav-link",
    onClick: () => handleActiveTab(NAVBAR_OPTIONS.PINNED_MOVIES)
  }, NAVBAR_OPTIONS.PINNED_MOVIES)), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/about-us",
    className: activeTab === NAVBAR_OPTIONS.ABOUT_US ? "nav-link active" : "nav-link",
    onClick: () => handleActiveTab(NAVBAR_OPTIONS.ABOUT_US)
  }, NAVBAR_OPTIONS.ABOUT_US))), /*#__PURE__*/React.createElement(SearchIcon, {
    searchBarVisible: searchBarVisible,
    onMouseEnter: handleMouseEnterSearchIcon,
    onMouseLeave: handleMouseLeaveSearchIcon,
    activeTab: activeTab
  }), /*#__PURE__*/React.createElement(NotificationsIcon, {
    notificationsDropdownVisible: notificationsDropdownVisible,
    onMouseEnter: handleMouseEnterNotificationsIcon,
    onMouseLeave: handleMouseLeaveNotificationsIcon
  }), /*#__PURE__*/React.createElement(ProfileIcon, {
    caretIconDown: caretIconDown,
    profileDropdownVisible: profileDropdownVisible,
    onMouseEnter: handleMouseEnterProfileIcon,
    onMouseLeave: handleMouseLeaveProfileIcon
  }))));
}