import React, { useState, useEffect, useCallback, createContext } from 'react';

let logoutTimer: ReturnType<typeof setTimeout>;

interface IAuthContext {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string, expirationTime: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime: string): number => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = (): { token: string | null; duration: number } | null => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  if (!storedToken || !storedExpirationDate) {
    return null;
  }

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 0) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const tokenData = retrieveStoredToken();

  let initialToken: string | null = null;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState<string | null>(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = useCallback(
    (token: string, expirationTime: string) => {
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);

      const remainingTime = calculateRemainingTime(expirationTime);

      logoutTimer = setTimeout(logoutHandler, remainingTime);
    },
    [logoutHandler]
  );

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue: IAuthContext = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
