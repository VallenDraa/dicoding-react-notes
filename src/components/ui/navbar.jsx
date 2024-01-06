import { Link } from "react-router-dom";
import "./navbar.css";

export function Navbar() {
  return (
    <header className="navbar">
      <h1 className="navbar__title">
        <Link to="/">
          notnotion
          <span>v2.</span>
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
