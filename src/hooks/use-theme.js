import React from "react";

import { ThemeContext } from "../context/theme-context";

export const useTheme = () => React.useContext(ThemeContext);
