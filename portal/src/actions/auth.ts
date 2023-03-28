import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";
import { AuthMode } from "../constants";
import routes from "../routes";

function useAuthActionCreator() {
  const apiClient = trpc.useContext();
  const { loading, error, safeQuery, clearQuery } = useSafeQuery();
  const { updateSessionID } = useUser();
  const { mode } = useParams();
  const navigate = useNavigate();
  const [currentAuthMode, setCurrentAuthMode] = useState<AuthMode>(
    mode != null && Object.keys(AuthMode).includes(mode)
      ? (mode as AuthMode)
      : AuthMode.login
  );

  useEffect(() => {
    if (mode !== currentAuthMode) {
      navigate(`${routes.auth.path}/${currentAuthMode}`);
    }
  }, [currentAuthMode, mode, navigate]);

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
