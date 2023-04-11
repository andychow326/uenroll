import { useCallback, useMemo, useState } from "react";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";
import { CourseProfile, CourseProfileListFilter, OpenedCourseProfile, OpenedCourseProfileListFilter, UserProfile, UserProfileListFilter } from "../types";

function useAdminActionCreator() {
  const apiClient = trpc.useContext();
  const { safeQuery, loading, error, clearQuery } = useSafeQuery();
  const [userProfiles, setUserProfiles] = useState<UserProfile[] | null>([]);
  const [courseProfiles, setCourseProfiles] = useState<CourseProfile[] | null>([]);
  const [OpenedCourseProfiles, setOpenedCourseProfiles] = useState<OpenedCourseProfile[] | null>([]);

  const fetchUserProfiles = useCallback(
    async (filter: UserProfileListFilter) => {
      const result = await safeQuery(() => apiClient.user.list.fetch(filter));
      setUserProfiles(
        result != null ? result.map((x) => x as UserProfile) : null
      );
    },
    [apiClient.user.list, safeQuery]
  );

  const sendInvitation = useCallback(
    async (userID: string) => {
      const result = await safeQuery(() =>
        apiClient.user.sendInvitation.fetch(userID)
      );
      if (result != null) return true;
      return false;
    },
    [apiClient.user.sendInvitation, safeQuery]
  );

  const createUser = useCallback(
    async (userProfile: UserProfile) => {
      const user = await safeQuery(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        apiClient.user.create.fetch(userProfile)
      );
      if (user != null) {
        const result = await sendInvitation(user.id);
        return result;
      }
      return false;
    },
    [apiClient.user.create, safeQuery, sendInvitation]
  );

  const editUser = useCallback(
    async (userProfile: UserProfile) => {
      const result = await safeQuery(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        apiClient.user.edit.fetch(userProfile)
      );
      if (result != null) return true;
      return false;
    },
    [apiClient.user.edit, safeQuery]
  );

  const fetchCourseProfiles = useCallback(
    async (filter: CourseProfileListFilter) => {
      const result = await safeQuery(() => apiClient.course.list.fetch(filter));
      setCourseProfiles(
        result != null ? result.map((x) => x as CourseProfile) : null
      );
    },
    [apiClient.course.list, safeQuery]
  );

  const createCourse = useCallback(
    async (courseProfile: CourseProfile) => {
      const course = await safeQuery(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        apiClient.course.create.fetch(courseProfile)
      );
      if (course != null) {
        return true;
      }
      return false;
    },
    [apiClient.course.create, safeQuery, sendInvitation]
  );

  const editCourse = useCallback(
    async (courseProfile: CourseProfile) => {
      const result = await safeQuery(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        apiClient.course.edit.fetch(courseProfile)
      );
      if (result != null) return true;
      return false;
    },
    [apiClient.course.edit, safeQuery]
  );
  
  const fetchOpenedCourseProfiles = useCallback(
    async (filter: OpenedCourseProfileListFilter) => {
      const result = await safeQuery(() => apiClient.openedCourse.list.fetch(filter));
      setCourseProfiles(
        result != null ? result.map((x) => x as OpenedCourseProfile) : null
      );
    },
    [apiClient.openedCourse.list, safeQuery]
  );

  const createOpenedCourse = useCallback(
    async (openedCourseProfile: OpenedCourseProfile) => {
      const openedCourse = await safeQuery(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        apiClient.openedCourse.create.fetch(openedCourseProfile)
      );
      if (openedCourse != null) {
        return true;
      }
      return false;
    },
    [apiClient.openedCourse.create, safeQuery, sendInvitation]
  );

  const editOpenedCourse = useCallback(
    async (openedCourseProfile: OpenedCourseProfile) => {
      const result = await safeQuery(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        apiClient.openedCourse.edit.fetch(openedCourseProfile)
      );
      if (result != null) return true;
      return false;
    },
    [apiClient.createOpenedCourse.edit, safeQuery]
  );
  return useMemo(
    () => ({
      loading,
      error,
      userProfiles,
      clearQuery,
      fetchUserProfiles,
      sendInvitation,
      createUser,
      editUser,
      courseProfiles,
      fetchCourseProfiles,
      createCourse,
      editCourse,
      OpenedCourseProfiles,
      fetchOpenedCourseProfiles,
      createOpenedCourse,
      editOpenedCourse,
    }),
    [
      loading,
      error,
      userProfiles,
      clearQuery,
      fetchUserProfiles,
      sendInvitation,
      createUser,
      editUser,
      courseProfiles,
      fetchCourseProfiles,
      createCourse,
      editCourse,
      OpenedCourseProfiles,
      fetchOpenedCourseProfiles,
      createOpenedCourse,
      editOpenedCourse,
    ]
  );
}

export default useAdminActionCreator;
