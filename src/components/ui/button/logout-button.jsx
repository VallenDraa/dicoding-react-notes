import { useNavigate } from "react-router-dom";

import { useAuth, useLocale } from "../../../hooks";
import { LOCALE_DATA } from "../../../utils/locale-data";

export default function LogoutButton() {
  const navigate = useNavigate();

  const { locale } = useLocale();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <button to="/login" onClick={handleLogout}>
      {LOCALE_DATA[locale].navbar.logout}
    </button>
  );
}
