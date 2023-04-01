import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthMode } from "../constants";
import { useUser } from "../contexts/UserProvider";
import { useSafeQuery } from "../hooks/query";
import routes from "../routes";
import trpc from "../trpc";

function useAuthActionCreator() {
  const apiClient = trpc.useContext();
  const { loading, error, safeQuery, clearQuery } = useSafeQuery();
  const { updateSessionID } = useUser();
  const { mode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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
      navigate(`${routes.auth.path}/${currentAuthMode}`);
    }
  }, [currentAuthMode, location.pathname, mode, navigate]);

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

  const logout = useCallback(() => {
    updateSessionID(null);
  }, [updateSessionID]);

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
      onChangeAuthMode,
    }),
    [loading, error, currentAuthMode, login, logout, onChangeAuthMode]
  );
}

export default useAuthActionCreator;
