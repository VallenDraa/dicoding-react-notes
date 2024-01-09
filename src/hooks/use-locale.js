import React from "react";

import { LocaleContext } from "../context/locale-context";

export const useLocale = () => React.useContext(LocaleContext);
