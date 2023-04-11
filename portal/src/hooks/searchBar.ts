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

export function useCourseSearchBar() {
  const [courseID, setCourseID] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");

  const onSearch = useCallback(
    (callback: (options: { courseID: string; courseName: string }) => void) => {
      callback({ courseID, courseName });
    },
    [courseID, courseName]
  );

  return useMemo(
    () => ({
      courseID,
      courseName,
      onChangeCourseID: setCourseID,
      onChangeCourseName: setCourseName,
      onSearch,
    }),
    [courseID, courseName, setCourseID, setCourseName, onSearch]
  );
}

