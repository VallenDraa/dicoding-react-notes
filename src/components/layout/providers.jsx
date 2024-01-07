import { ThemeProvider } from "../../context/theme-context";
import { LocaleProvider } from "../../context/locale-context";
import React from "react";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
