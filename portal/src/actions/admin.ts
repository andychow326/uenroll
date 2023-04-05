import { useCallback, useMemo, useState } from "react";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";
import { UserProfile, UserProfileListFilter } from "../types";

function useAdminActionCreator() {
  const apiClient = trpc.useContext();
  const { safeQuery } = useSafeQuery();
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

  return useMemo(
    () => ({
      userProfiles,
      fetchUserProfiles,
    }),
    [userProfiles, fetchUserProfiles]
  );
}

export default useAdminActionCreator;
