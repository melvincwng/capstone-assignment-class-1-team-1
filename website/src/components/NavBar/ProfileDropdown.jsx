import { clearSessionStorage } from "../../utils/functions";

export default function ProfileDropdown() {
  function handleLogout() {
    alert("You have logged out!");
    clearSessionStorage();
  }

  return (
    <div id="profileDropdown" onClick={handleLogout}>
      Logout
    </div>
  );
}
