import { logout } from "../../utils/functions.js";
export default function ProfileDropdown() {
  function handleLogout(event) {
    logout(event);
  }
  return /*#__PURE__*/React.createElement("div", {
    id: "profileDropdown",
    onClick: handleLogout
  }, "Logout");
}