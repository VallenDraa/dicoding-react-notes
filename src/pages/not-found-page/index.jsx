import "./not-found-page.css";

import { Link } from "react-router-dom";

import { Navbar } from "../../components/ui/navbar";
import { useAuth, useLocale } from "../../hooks";
import { LOCALE_DATA } from "../../utils/locale-data";

export function NotFoundPage() {
  const { isLoggedIn } = useAuth();
  const { locale } = useLocale();

  return (
    <>
      <Navbar />
      <section className="not-found__wrapper">
        <h2 className="not-found__title" title="error 404">
          ⚠️
        </h2>
        <p className="not-found__message">
          {LOCALE_DATA[locale].notFoundPage.message}
        </p>
        <Link to="/" className="not-found__back-link">
          {isLoggedIn
            ? `🏠${LOCALE_DATA[locale].notFoundPage.errorBackLink}`
            : `📝${LOCALE_DATA[locale].notFoundPage.login}`}
        </Link>
      </section>
    </>
  );
}
