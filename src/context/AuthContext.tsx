"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setToken: (token: string) => void;
  signOut: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                  Context                                   */
/* -------------------------------------------------------------------------- */

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*                              Storage Key                                   */
/* -------------------------------------------------------------------------- */

const TOKEN_KEY = "token";

/* -------------------------------------------------------------------------- */
/*                               Auth Provider                                */
/* -------------------------------------------------------------------------- */

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  /*
   * Lazy initialization means localStorage is read only when
   * the state is initialized, instead of using an effect.
   */
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  });

  /*
   * Since the token is initialized synchronously in the browser,
   * there is no hydration/loading state required just to restore it.
   */
  const isLoading = false;

  /* ------------------------------------------------------------------------ */
  /*                            Set Token                                     */
  /* ------------------------------------------------------------------------ */

  const setToken = useCallback((newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setTokenState(newToken);
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                             Sign Out                                     */
  /* ------------------------------------------------------------------------ */

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setTokenState(null);
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                         Authentication State                             */
  /* ------------------------------------------------------------------------ */

  const isAuthenticated = Boolean(token);

  /* ------------------------------------------------------------------------ */
  /*                            Context Value                                 */
  /* ------------------------------------------------------------------------ */

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated,
      isLoading,
      setToken,
      signOut,
    }),
    [token, isAuthenticated, isLoading, setToken, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* -------------------------------------------------------------------------- */
/*                                useAuth                                     */
/* -------------------------------------------------------------------------- */

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
