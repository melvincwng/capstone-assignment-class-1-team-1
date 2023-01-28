import { IoNotifications } from "react-icons/io5";
import NotificationsDropdown from "./NotificationsDropdown.js";
export default function NotificationsIcon(props) {
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave
  }, /*#__PURE__*/React.createElement(IoNotifications, {
    id: "notificationsIcon"
  }), props.notificationsDropdownVisible && /*#__PURE__*/React.createElement(NotificationsDropdown, null));
}