import { useCallback, useMemo, useState } from "react";
import { useSafeQuery } from "../hooks/query";
import trpc, { Error } from "../trpc";
import {
  Course,
  DeleteCourseFilter,
  OpenedCourse,
  UserProfile,
  UserProfileListFilter,
} from "../types";

function useAdminActionCreator() {
  const apiClient = trpc.useContext();
  const { safeQuery, loading, error, clearQuery, setError } = useSafeQuery();
  const [userProfiles, setUserProfiles] = useState<UserProfile[] | null>([]);
  const createCourseMutation = trpc.course.create.useMutation();
  const editCourseMutation = trpc.course.edit.useMutation();
  const createCourseSectionMutation = trpc.course.createSection.useMutation();
  const editCourseSectionMutation = trpc.course.editSection.useMutation();

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

  const createCourse = useCallback(
    (course: Course, cb?: () => void) => {
      createCourseMutation.mutate(course, {
        onError: (err) => {
          setError(err?.shape as Error);
        },
        onSuccess: cb,
      });
    },
    [createCourseMutation, setError]
  );

  const createCourseSection = useCallback(
    (course: OpenedCourse, cb?: () => void) => {
      createCourseSectionMutation.mutate(course, {
        onError: (err) => {
          setError(err?.shape as Error);
        },
        onSuccess: cb,
      });
    },
    [createCourseSectionMutation, setError]
  );

  const editCourse = useCallback(
    (course: Course, cb?: () => void) => {
      editCourseMutation.mutate(course, {
        onError: (err) => {
          setError(err?.shape as Error);
        },
        onSuccess: cb,
      });
    },
    [editCourseMutation, setError]
  );

  const editCourseSection = useCallback(
    (course: OpenedCourse, cb?: () => void) => {
      editCourseSectionMutation.mutate(course, {
        onError: (err) => {
          setError(err?.shape as Error);
        },
        onSuccess: cb,
      });
    },
    [editCourseSectionMutation, setError]
  );

  const deleteCourse = useCallback(
    async (filter: DeleteCourseFilter) => {
      const result = await safeQuery(() =>
        apiClient.course.remove.fetch(filter)
      );
      return result ?? false;
    },
    [apiClient.course.remove, safeQuery]
  );

  return useMemo(
    () => ({
      loading: loading || createCourseMutation.isLoading,
      error,
      userProfiles,
      clearQuery,
      fetchUserProfiles,
      sendInvitation,
      createUser,
      editUser,
      createCourse,
      createCourseSection,
      deleteCourse,
      editCourse,
      editCourseSection,
    }),
    [
      loading,
      createCourseMutation.isLoading,
      error,
      userProfiles,
      clearQuery,
      fetchUserProfiles,
      sendInvitation,
      createUser,
      editUser,
      createCourse,
      createCourseSection,
      deleteCourse,
      editCourse,
      editCourseSection,
    ]
  );
}

export default useAdminActionCreator;
