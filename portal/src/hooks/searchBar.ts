import { useCallback, useMemo, useState } from "react";

export function useUserSearchBar() {
  const [userID, setUserID] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const onSearch = useCallback(
    (callback: (options: { userID: string; username: string }) => void) => {
      callback({ userID, username });
    },
    [userID, username]
  );

  return useMemo(
    () => ({
      userID,
      username,
      onChangeUserID: setUserID,
      onChangeUsername: setUsername,
      onSearch,
    }),
    [userID, username, setUserID, setUsername, onSearch]
  );
}

export function useCourseSearchBar() {}
