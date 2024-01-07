import React from "react";

export const THEME = { dark: "dark", light: "light" };

const ThemeContext = React.createContext({
  theme: THEME.dark,
  toggleTheme() {},
});

export const useThemeContext = () => React.useContext(ThemeContext);

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
