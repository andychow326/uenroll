import { useCallback, useMemo } from "react";
import { useUser } from "../contexts/UserProvider";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";

function useUserActionCreator() {
  const apiClient = trpc.useContext();
  const { safeQuery } = useSafeQuery();
  const { updateSessionID, updateUserProfile } = useUser();

  const fetchUserProfile = useCallback(async () => {
    const userProfile = await safeQuery(() => apiClient.user.profile.fetch());
    if (userProfile != null) {
      updateUserProfile(userProfile);
    }
  }, [apiClient.user.profile, safeQuery, updateUserProfile]);

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
      fetchUserProfile,
      validateSession,
    }),
    [fetchUserProfile, validateSession]
  );
}

export default useUserActionCreator;
