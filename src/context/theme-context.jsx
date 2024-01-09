import PropTypes from "prop-types";
import React from "react";

import { THEME } from "../utils/theme-data";

export const ThemeContext = React.createContext({
  theme: THEME.dark,
  toggleTheme() {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ?? "dark",
  );

  React.useEffect(() => localStorage.setItem("theme", theme), [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme(prev => (prev === THEME.dark ? THEME.light : THEME.dark));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
