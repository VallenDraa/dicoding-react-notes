import PropTypes from "prop-types";
import React from "react";

import {
  deleteAccessToken,
  getAccessToken,
  getUserLogged,
  login as networkLogin,
  putAccessToken,
  register as networkRegister,
} from "../utils/network-data";

export const AuthContext = React.createContext({
  user: null,
  register() {},
  login() {},
  logout() {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  const [hasUserFetched, setHasUserFetched] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState(() => getAccessToken());

  const fetchUser = React.useCallback(async () => {
    try {
      const userData = await getUserLogged();
      setUser(userData);
    } catch (error) {
      alert("Fail to get user data!");
      setUser(null);
    }

    setHasUserFetched(true);
  }, []);

  // Get the user data on first load
  React.useEffect(() => {
    if (accessToken && !hasUserFetched) {
      fetchUser();
    }
  }, [hasUserFetched, accessToken, fetchUser]);

  const login = React.useCallback(async ({ email, password }) => {
    try {
      deleteAccessToken();
      const loginResponse = await networkLogin({ email, password });

      if (loginResponse.error) {
        throw new Error();
      }

      putAccessToken(loginResponse.data);
    } catch (error) {
      alert("Fail to login!");
    }
  }, []);

  const register = React.useCallback(async ({ name, email, password }) => {
    try {
      await networkRegister({ name, email, password });
    } catch (error) {
      alert("Fail to register!");
    }
  }, []);

  const logout = React.useCallback(() => {
    deleteAccessToken();
    setUser(null);
    setHasUserFetched(false);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
