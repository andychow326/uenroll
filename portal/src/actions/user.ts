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

  const fetchEnrolledCourse = useCallback(async () => {
    const result = await safeQuery(() => apiClient.user.enrolledCourse.fetch());
    return (result as OpenedCourse[]) ?? [];
  }, [apiClient.user.enrolledCourse, safeQuery]);

  return useMemo(
    () => ({
      fetchUserProfile,
      validateSession,
      fetchEnrolledCourse,
      loading,
    }),
    [fetchEnrolledCourse, fetchUserProfile, loading, validateSession]
  );
}

export default useUserActionCreator;
