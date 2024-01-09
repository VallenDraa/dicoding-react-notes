import PropTypes from "prop-types";

import { AuthProvider } from "../../context/auth-context";
import { LocaleProvider } from "../../context/locale-context";
import { ThemeProvider } from "../../context/theme-context";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LocaleProvider>{children}</LocaleProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
