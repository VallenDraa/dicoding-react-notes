import PropTypes from "prop-types";
import React from "react";

import { LOCALE } from "../utils/locale-data";

export const LocaleContext = React.createContext({
  locale: LOCALE.en,
  toggleLocale() {},
});

export function LocaleProvider({ children }) {
  const [locale, setLocale] = React.useState(
    localStorage.getItem("locale") ?? LOCALE.en,
  );

  React.useEffect(() => localStorage.setItem("locale", locale), [locale]);

  const toggleLocale = React.useCallback(() => {
    setLocale(prev => (prev === LOCALE.en ? LOCALE.id : LOCALE.en));
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
