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
  isLoading: false,
  isLoggedIn: false,
  // eslint-disable-next-line no-unused-vars
  async register({ name, email, password }) {},
  // eslint-disable-next-line no-unused-vars
  async login({ email, password }) {},
  logout() {},
});

export function AuthProvider({ children }) {
  // State besides the user data
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasUserFetched, setHasUserFetched] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    () => getAccessToken() !== null,
  );

  // User data states
  const [user, setUser] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(() => getAccessToken());

  const fetchUser = React.useCallback(async () => {
    setIsLoading(true);
    setHasUserFetched(false);

    try {
      const userData = await getUserLogged();
      setIsLoading(false);
      setUser(userData.data);
      setHasUserFetched(true);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      setHasUserFetched(false);
      throw new Error(error);
    }
  }, []);

  // Get the user data on first load
  React.useEffect(() => {
    if (accessToken && !hasUserFetched) {
      fetchUser();
    }
  }, [hasUserFetched, accessToken, fetchUser]);

  const login = React.useCallback(async ({ email, password }) => {
    const loginResponse = await networkLogin({ email, password });

    if (loginResponse.error) {
      throw new Error("Fail to login!");
    }

    setIsLoggedIn(true);
    putAccessToken(loginResponse.data.accessToken);
    setAccessToken(loginResponse.data.accessToken);
  }, []);

  const register = React.useCallback(async ({ name, email, password }) => {
    await networkRegister({ name, email, password });
  }, []);

  const logout = React.useCallback(() => {
    deleteAccessToken();
    setUser(null);
    setIsLoggedIn(false);
    setHasUserFetched(false);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
