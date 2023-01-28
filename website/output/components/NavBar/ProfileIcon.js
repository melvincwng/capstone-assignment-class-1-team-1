import { IoCaretDown as CaretDownIcon, IoCaretUp as CaretUpIcon } from "react-icons/io5";
import ProfileDropdown from "./ProfileDropdown.js";
export default function ProfileIcon(props) {
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave
  }, /*#__PURE__*/React.createElement("img", {
    src: "./src/img/avatar.jpg",
    alt: "Profile",
    id: "profileIcon"
  }), props.caretIconDown ? /*#__PURE__*/React.createElement(CaretDownIcon, {
    id: "caretDownIcon"
  }) : /*#__PURE__*/React.createElement(CaretUpIcon, {
    id: "caretUpIcon"
  }), props.profileDropdownVisible && /*#__PURE__*/React.createElement(ProfileDropdown, null));
}