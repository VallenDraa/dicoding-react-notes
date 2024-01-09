import React from "react";

import { AuthContext } from "../context/auth-context";

export const useAuth = () => React.useContext(AuthContext);
