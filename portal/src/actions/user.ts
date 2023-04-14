import { useCallback, useMemo } from "react";
import { useUser } from "../contexts/UserProvider";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";
import type { OpenedCourse, UserProfile } from "../types";

function useUserActionCreator() {
  const apiClient = trpc.useContext();
  const { loading, safeQuery } = useSafeQuery();
  const { updateSessionID, updateUserProfile } = useUser();

  const fetchUserProfile = useCallback(async () => {
    const userProfile = await safeQuery(() => apiClient.user.profile.fetch());
    if (userProfile != null) {
      updateUserProfile(userProfile as UserProfile);
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

  const addShoppingCart = useCallback(
    async (courseID: string) => {
      const conflictedItems = await safeQuery(() =>
        apiClient.user.addShoppingCart.fetch(courseID)
      );
      return conflictedItems ?? false;
    },
    [apiClient.user.addShoppingCart, safeQuery]
  );

  const fetchShoppingCart = useCallback(async () => {
    const result = await safeQuery(() =>
      apiClient.user.getShoppingCart.fetch()
    );
    return (result as OpenedCourse[]) ?? [];
  }, [apiClient.user.getShoppingCart, safeQuery]);

  return useMemo(
    () => ({
      fetchUserProfile,
      validateSession,
      addShoppingCart,
      fetchShoppingCart,
      loading,
    }),
    [
      fetchUserProfile,
      validateSession,
      addShoppingCart,
      fetchShoppingCart,
      loading,
    ]
  );
}

export default useUserActionCreator;
