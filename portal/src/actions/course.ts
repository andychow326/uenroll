import { useCallback, useMemo } from "react";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";
import {
  CourseListFilter,
  CourseListItem,
  CoursePeriod,
  CourseType,
} from "../types";

function useCourseActionCreator() {
  const apiClient = trpc.useContext();
  const { safeQuery, loading, error, clearQuery } = useSafeQuery();

  const fetchCourseList = useCallback(
    async <T extends CourseType>(type: T, filter: CourseListFilter) => {
      const result = await safeQuery(() =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        apiClient.course.list.fetch({ ...filter, type })
      );
      if (result != null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return result as CourseListItem<T>[];
      }
      return null;
    },
    [apiClient.course.list, safeQuery]
  );

  const fetchCourseCount = useCallback(
    async <T extends CourseType>(type: T, filter: CourseListFilter) => {
      const result = await safeQuery(() =>
        apiClient.course.count.fetch({ ...filter, type })
      );
      return Math.ceil(result ?? 0);
    },
    [apiClient.course.count, safeQuery]
  );

  const fetchAvailableCoursePeriods = useCallback(async () => {
    const result = await safeQuery(() =>
      apiClient.course.availablePeriod.fetch()
    );
    return result as CoursePeriod[] | [];
  }, [apiClient.course.availablePeriod, safeQuery]);

  return useMemo(
    () => ({
      loading,
      error,
      clearQuery,
      fetchCourseList,
      fetchCourseCount,
      fetchAvailableCoursePeriods,
    }),
    [
      loading,
      error,
      clearQuery,
      fetchCourseList,
      fetchCourseCount,
      fetchAvailableCoursePeriods,
    ]
  );
}

export default useCourseActionCreator;
