import { useCallback, useMemo } from "react";
import { useUser } from "../contexts/UserProvider";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";

function useUserActionCreator() {
  const apiClient = trpc.useContext();
  const { safeQuery } = useSafeQuery();
  const { updateSessionID } = useUser();

  const validateSession = useCallback(async () => {
    const isValid = await safeQuery(() =>
      apiClient.user.validateSession.fetch()
    );
    if (!isValid) {
      updateSessionID(null);
    }
  }, [apiClient.user.validateSession, safeQuery, updateSessionID]);

  return useMemo(
    () => ({
      validateSession,
    }),
    [validateSession]
  );
}

export default useUserActionCreator;
