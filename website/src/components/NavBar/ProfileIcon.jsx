import {
  IoCaretDown as CaretDownIcon,
  IoCaretUp as CaretUpIcon,
} from "react-icons/io5";
import ProfileDropdown from "./ProfileDropdown";

export default function ProfileIcon(props) {
  return (
    <span onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <img src="./src/img/avatar.jpg" alt="Profile" id="profileIcon" />
      {props.caretIconDown ? (
        <CaretDownIcon id="caretDownIcon" />
      ) : (
        <CaretUpIcon id="caretUpIcon" />
      )}
      {props.profileDropdownVisible && <ProfileDropdown />}
    </span>
  );
}
