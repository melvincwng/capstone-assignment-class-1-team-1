import { logout } from "../../utils/functions";

export default function ProfileDropdown() {
  function handleLogout(event) {
    logout(event);
  }

  return (
    <div id="profileDropdown" onClick={handleLogout}>
      Logout
    </div>
  );
}
