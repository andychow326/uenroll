import { useCallback, useMemo } from "react";
import { useUser } from "../contexts/UserProvider";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";
import type { EnrollmentStatusItem, OpenedCourse, UserProfile } from "../types";

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

  const fetchEnrollmentStatusItem = useCallback(
    async <T extends EnrollmentStatusItem>(type: T) => {
      const result = await safeQuery(() =>
        apiClient.enrollmentStatusItem.list.fetch({ type })
      );
      return result as EnrollmentStatusItem[];
    },
    [apiClient.enrollmentStatusItem.list, safeQuery]
  );

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

  const enrollCourse = useCallback(
    async (courseIDList: string[]) => {
      await safeQuery(() => apiClient.user.enrollCourse.fetch(courseIDList));
    },
    [apiClient.user.enrollCourse, safeQuery]
  );

  const deleteShoppingCart = useCallback(
    async (courseIDList: string[]) => {
      await safeQuery(() =>
        apiClient.user.deleteShoppingCart.fetch(courseIDList)
      );
    },
    [apiClient.user.deleteShoppingCart, safeQuery]
  );

  const fetchEnrolledCourse = useCallback(async () => {
    const result = await safeQuery(() => apiClient.user.enrolledCourse.fetch());
    return (result as OpenedCourse[]) ?? [];
  }, [apiClient.user.enrolledCourse, safeQuery]);

  const dropCourse = useCallback(
    async (courseIDList: string[]) => {
      await safeQuery(() => apiClient.user.dropCourse.fetch(courseIDList));
    },
    [apiClient.user.dropCourse, safeQuery]
  );

  return useMemo(
    () => ({
      fetchUserProfile,
      validateSession,
      addShoppingCart,
      fetchShoppingCart,
      fetchEnrollmentStatusItem,
      enrollCourse,
      deleteShoppingCart,
      loading,
      fetchEnrolledCourse,
      dropCourse,
    }),
    [
      addShoppingCart,
      deleteShoppingCart,
      enrollCourse,
      fetchEnrolledCourse,
      fetchShoppingCart,
      fetchUserProfile,
      loading,
      validateSession,
      dropCourse,
      fetchEnrollmentStatusItem,
    ]
  );
}
export default useUserActionCreator;
