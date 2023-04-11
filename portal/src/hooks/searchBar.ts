import { useCallback, useMemo, useState } from "react";
import { CourseListFilter, CoursePeriod, CourseType } from "../types";

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

export function useCourseSearchBar<T extends CourseType>(type: T) {
  const [courseCode, setCourseCode] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [coursePeriod, setCoursePeriod] = useState<CoursePeriod | undefined>();

  const onSearch = useCallback(
    (
      callback: <CT extends CourseType>(
        type: CT,
        options: CourseListFilter
      ) => void
    ) => {
      callback(type, {
        code: courseCode,
        title: courseTitle,
        period: coursePeriod,
      });
    },
    [courseCode, coursePeriod, courseTitle, type]
  );

  return useMemo(
    () => ({
      courseCode,
      courseTitle,
      coursePeriod,
      onChangeCourseCode: setCourseCode,
      onChangeCourseTitle: setCourseTitle,
      onChangeCoursePeriod: setCoursePeriod,
      onSearch,
    }),
    [
      courseCode,
      courseTitle,
      coursePeriod,
      setCourseCode,
      setCourseTitle,
      setCoursePeriod,
      onSearch,
    ]
  );
}
