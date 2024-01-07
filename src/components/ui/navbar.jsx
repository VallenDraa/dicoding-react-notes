import { Link } from "react-router-dom";
import { THEME, useThemeContext } from "../../context/theme-context";
import { LOCALE, useLocaleContext } from "../../context/locale-context";
import { LOCALE_DATA } from "../../utils/locale-data";
import "./navbar.css";

export function Navbar() {
  const { theme, toggleTheme } = useThemeContext();
  const { locale, toggleLocale } = useLocaleContext();

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
            <Link to="/">{LOCALE_DATA[locale].navbar.home}</Link>
          </li>
          <li className="navbar__link">
            <Link to="/archive">{LOCALE_DATA[locale].navbar.archive}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
