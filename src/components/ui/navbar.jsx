import { Link } from "react-router-dom";
import "./navbar.css";
import { THEME, useThemeContext } from "../../context/theme-context";

export function Navbar() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="navbar">
      <button
        title={theme === THEME.dark ? "Toggle Light Mode" : "Toggle Dark Mode"}
        onClick={toggleTheme}
        className={`navbar__theme-toggle ${
          theme === THEME.dark
            ? "navbar__theme-toggle--dark"
            : "navbar__theme-toggle--light"
        }`}
      >
        {theme === THEME.dark ? "🌞" : "🌚"}
      </button>
      <h1 className="navbar__title">
        <Link to="/">
          notnotion
          <span>v3.</span>
        </Link>
      </h1>

      <nav className="navbar__link-wrapper">
        <ul className="navbar__links">
          <li className="navbar__link">
            <Link to="/">home</Link>
          </li>
          <li className="navbar__link">
            <Link to="/archive">archive</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
