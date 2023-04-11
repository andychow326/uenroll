import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { useSafeQuery } from "../hooks/query";
import routes from "../routes";
import trpc from "../trpc";
import { AuthMode, SearchParams } from "../types";

function useAuthActionCreator() {
  const apiClient = trpc.useContext();
  const { loading, error, safeQuery, clearQuery } = useSafeQuery();
  const { updateSessionID, updateUserProfile } = useUser();
  const { mode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [currentAuthMode, setCurrentAuthMode] = useState<AuthMode>(
    mode != null && Object.keys(AuthMode).includes(mode)
      ? (mode as AuthMode)
      : AuthMode.login
  );

  useEffect(() => {
    if (
      location.pathname.startsWith(routes.auth.path) &&
      mode !== currentAuthMode
    ) {
      navigate(
        `${routes.auth.path}/${currentAuthMode}${
          currentAuthMode === AuthMode.resetPassword
            ? `?${searchParams.toString()}`
            : ""
        }`
      );
    }
  }, [currentAuthMode, location.pathname, mode, navigate, searchParams]);

  const login = useCallback(
    async (userID: string, password: string) => {
      const sessionID = await safeQuery(() =>
        apiClient.auth.login.fetch({ userID, password })
      );
      if (sessionID != null) {
        updateSessionID(sessionID);
      }
    },
    [apiClient.auth.login, safeQuery, updateSessionID]
  );

  const logout = useCallback(async () => {
    await safeQuery(() => apiClient.auth.logout.fetch());
    updateUserProfile(null);
    updateSessionID(null);
  }, [apiClient.auth.logout, safeQuery, updateSessionID, updateUserProfile]);

  const resetPassword = useCallback(
    async (password: string, confirmPassword: string) => {
      const result = await safeQuery(() =>
        apiClient.auth.resetPassword.fetch({
          password,
          confirmPassword,
          accessToken: searchParams.get(SearchParams.accessToken) ?? "",
        })
      );
      if (result) {
        return true;
      }

      return false;
    },
    [apiClient.auth.resetPassword, safeQuery, searchParams]
  );

  const validateAccessToken = useCallback(async () => {
    let userID: string | null = "";
    if (
      currentAuthMode === AuthMode.resetPassword &&
      searchParams.has(SearchParams.accessToken)
    ) {
      userID = await safeQuery(() =>
        apiClient.auth.validateAccessToken.fetch(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          searchParams.get(SearchParams.accessToken)!
        )
      );
    }
    if (userID == null) {
      searchParams.delete(SearchParams.accessToken);
      setCurrentAuthMode(AuthMode.expiredAccessToken);
    }

    return userID;
  }, [
    apiClient.auth.validateAccessToken,
    currentAuthMode,
    safeQuery,
    searchParams,
  ]);

  const forgotPassword = useCallback(
    async (userID: string) => {
      const result = await safeQuery(() =>
        apiClient.auth.forgotPassword.fetch(userID)
      );
      return result === true;
    },
    [apiClient.auth.forgotPassword, safeQuery]
  );

  const onChangeAuthMode = useCallback(
    (newMode: AuthMode) => {
      clearQuery();
      setCurrentAuthMode(newMode);
    },
    [clearQuery]
  );

  return useMemo(
    () => ({
      loading,
      error,
      currentAuthMode,
      login,
      logout,
      resetPassword,
      forgotPassword,
      validateAccessToken,
      onChangeAuthMode,
    }),
    [
      loading,
      error,
      currentAuthMode,
      login,
      logout,
      resetPassword,
      forgotPassword,
      validateAccessToken,
      onChangeAuthMode,
    ]
  );
}

export default useAuthActionCreator;
