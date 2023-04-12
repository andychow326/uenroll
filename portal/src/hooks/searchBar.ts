import { useCallback, useMemo, useState } from "react";
import { CourseListFilter, CoursePeriod, CourseType } from "../types";

export function useUserSearchBar() {
  const [userID, setUserID] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const onSearch = useCallback(
    (
      callback: (options: { userID: string; username: string }) => void,
      withFilter: boolean
    ) => {
      callback({
        userID: withFilter ? userID : "",
        username: withFilter ? username : "",
      });
    },
    [userID, username]
  );

  const onClearFilter = useCallback(() => {
    setUserID("");
    setUsername("");
  }, []);

  return useMemo(
    () => ({
      userID,
      username,
      onChangeUserID: setUserID,
      onChangeUsername: setUsername,
      onSearch,
      onClearFilter,
    }),
    [userID, username, setUserID, setUsername, onSearch, onClearFilter]
  );
}

export function useCourseSearchBar<T extends CourseType>(type: T) {
  const [courseCode, setCourseCode] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [coursePeriod, setCoursePeriod] = useState<CoursePeriod | undefined>();

  const onSearch = useCallback(
    (
      callback: <CT extends CourseType>(
        type: CT,
        options: CourseListFilter
      ) => void,
      withFilter: boolean
    ) => {
      callback(type, {
        code: withFilter ? courseCode : "",
        title: withFilter ? courseTitle : "",
        period: withFilter ? coursePeriod : undefined,
      });
    },
    [courseCode, coursePeriod, courseTitle, type]
  );

  const onClearFilter = useCallback(() => {
    setCourseCode("");
    setCourseTitle("");
    setCoursePeriod(undefined);
  }, []);

  return useMemo(
    () => ({
      courseCode,
      courseTitle,
      coursePeriod,
      onChangeCourseCode: setCourseCode,
      onChangeCourseTitle: setCourseTitle,
      onChangeCoursePeriod: setCoursePeriod,
      onSearch,
      onClearFilter,
    }),
    [
      courseCode,
      courseTitle,
      coursePeriod,
      setCourseCode,
      setCourseTitle,
      setCoursePeriod,
      onSearch,
      onClearFilter,
    ]
  );
}
