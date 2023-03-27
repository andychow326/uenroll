import { useCallback, useMemo } from "react";
import { useUser } from "../contexts/UserProvider";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";

function useUserActionCreator() {
  const apiClient = trpc.useContext();
  const { error, safeQuery } = useSafeQuery();
  const { updateSessionID } = useUser();

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

  return useMemo(() => ({ error, login, logout }), [error, login, logout]);
}

export default useUserActionCreator;
