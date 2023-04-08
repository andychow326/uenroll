import { useCallback, useMemo, useState } from "react";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";
import { UserProfile, UserProfileListFilter } from "../types";

function useAdminActionCreator() {
  const apiClient = trpc.useContext();
  const { safeQuery, loading, error } = useSafeQuery();
  const [userProfiles, setUserProfiles] = useState<UserProfile[] | null>([]);

  const fetchUserProfiles = useCallback(
    async (filter: UserProfileListFilter) => {
      const result = await safeQuery(() => apiClient.user.list.fetch(filter));
      setUserProfiles(
        result != null ? result.map((x) => x as UserProfile) : null
      );
    },
    [apiClient.user.list, safeQuery]
  );

  const createUser = useCallback(
    async (userProfile: UserProfile) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      await safeQuery(() => apiClient.user.create.fetch(userProfile));
    },
    [apiClient.user.create, safeQuery]
  );

  return useMemo(
    () => ({
      loading,
      error,
      userProfiles,
      fetchUserProfiles,
      createUser,
    }),
    [loading, error, userProfiles, fetchUserProfiles, createUser]
  );
}

export default useAdminActionCreator;
