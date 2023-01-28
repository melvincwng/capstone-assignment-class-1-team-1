import { clearSessionStorage } from "../../utils/functions.js";
export default function ProfileDropdown() {
  function handleLogout() {
    alert("You have logged out!");
    clearSessionStorage();
  }
  return /*#__PURE__*/React.createElement("div", {
    id: "profileDropdown",
    onClick: handleLogout
  }, "Logout");
}