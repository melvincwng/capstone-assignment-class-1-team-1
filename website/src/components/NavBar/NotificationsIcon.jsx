import { IoNotifications } from "react-icons/io5";
import NotificationsDropdown from "./NotificationsDropdown";

export default function NotificationsIcon(props) {
  return (
    <span onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <IoNotifications id="notificationsIcon" />
      {props.notificationsDropdownVisible && <NotificationsDropdown />}
    </span>
  );
}
