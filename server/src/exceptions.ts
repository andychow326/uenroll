import { TRPCError } from "@trpc/server";

export const AuthErrorUnauthorized = new TRPCError({ code: "UNAUTHORIZED" });

export const AuthErrorInvalidCredentials = new TRPCError({
  code: "FORBIDDEN",
  message: "error.server.incorrect_user_id_or_password",
});

export const AuthErrorUserNotFound = new TRPCError({
  code: "BAD_REQUEST",
  message: "error.server.user_not_found",
});

export const CourseErrorCourseNotFound = new TRPCError({
  code: "BAD_REQUEST",
  message: "error.server.course.already_exists",
});

export const CourseErrorCourseAlreadyExists = new TRPCError({
  code: "BAD_REQUEST",
  message: "error.server.course.already_exists",
});
