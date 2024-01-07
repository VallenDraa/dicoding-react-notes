import React from "react";

export const LOCALE = { en: "en", id: "id" };

const LocaleContext = React.createContext({
  locale: LOCALE.en,
  toggleLocale() {},
});

export const useLocaleContext = () => React.useContext(LocaleContext);

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
