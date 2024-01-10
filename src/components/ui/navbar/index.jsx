import "./navbar.css";

import { Link } from "react-router-dom";

import { useLocale, useTheme } from "../../../hooks";
import { LOCALE, LOCALE_DATA } from "../../../utils/locale-data";
import { THEME } from "../../../utils/theme-data";
import LogoutButton from "../button/logout-button";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="navbar">
      <div className="navbar__toggle-wrapper">
        <button
          title={
            theme === THEME.dark
              ? LOCALE_DATA[locale].navbar.themeLight
              : LOCALE_DATA[locale].navbar.themeDark
          }
          onClick={toggleTheme}
          className="navbar__toggle"
        >
          {theme === THEME.dark ? "🌞" : "🌚"}
        </button>
        <button
          title={
            LOCALE === LOCALE.en
              ? LOCALE_DATA[locale].navbar.languageID
              : LOCALE_DATA[locale].navbar.languangeEN
          }
          onClick={toggleLocale}
          className="navbar__toggle"
        >
          {locale === LOCALE.en ? "ID" : "EN"}
        </button>
      </div>

      <h1 className="navbar__title">
        <Link to="/">
          notnotion
          <span>v3.</span>
        </Link>
      </h1>

      <nav className="navbar__link-wrapper">
        <ul className="navbar__links">
          <li className="navbar__link">
            <Link to="/">{LOCALE_DATA[locale].navbar.active}</Link>
          </li>
          <li className="navbar__link">
            <Link to="/archive">{LOCALE_DATA[locale].navbar.archive}</Link>
          </li>
          <li className="navbar__link navbar__link--danger">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
