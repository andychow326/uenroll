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

export function useCourseSearchBar() {
  const [courseType, setCourseType] = useState<CourseType>(CourseType.course);
  const [courseCode, setCourseCode] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [coursePeriod, setCoursePeriod] = useState<CoursePeriod | undefined>();

  const onSearch = useCallback(
    (
      callback: (courseType: CourseType, options: CourseListFilter) => void,
      withFilter: boolean
    ) => {
      callback(courseType, {
        code: withFilter ? courseCode : "",
        title: withFilter ? courseTitle : "",
        period: withFilter ? coursePeriod : undefined,
      });
    },
    [courseCode, coursePeriod, courseTitle, courseType]
  );

  const onClearFilter = useCallback(() => {
    setCourseType(CourseType.course);
    setCourseCode("");
    setCourseTitle("");
    setCoursePeriod(undefined);
  }, []);

  return useMemo(
    () => ({
      courseType,
      courseCode,
      courseTitle,
      coursePeriod,
      onChangeCourseType: setCourseType,
      onChangeCourseCode: setCourseCode,
      onChangeCourseTitle: setCourseTitle,
      onChangeCoursePeriod: setCoursePeriod,
      onSearch,
      onClearFilter,
    }),
    [
      courseType,
      courseCode,
      courseTitle,
      coursePeriod,
      setCourseType,
      setCourseCode,
      setCourseTitle,
      setCoursePeriod,
      onSearch,
      onClearFilter,
    ]
  );
}
