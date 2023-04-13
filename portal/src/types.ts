import { CSSProperties, ReactNode } from "react";

export enum AuthMode {
  login = "login",
  forgotPassword = "forgotPassword",
  forgotPasswordConfirmation = "forgotPasswordConfirmation",
  resetPassword = "resetPassword",
  expiredAccessToken = "expiredAccessToken",
}

export enum UserGender {
  male = "MALE",
  female = "FEMALE",
  other = "OTHER",
}

export enum UserRole {
  student = "STUDENT",
  admin = "ADMIN",
}

export enum SearchParams {
  accessToken = "accessToken",
}

export type UserProfile = {
  id: string;
  isVerified?: boolean;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  dateOfBirth: string;
  phoneNumber: string;
  gender: UserGender;
  major: string;
  address: string;
};

export type SearchBarItemType = "textField" | "dropdown";

export type SearchBarItemTextField = {
  type: "textField";
  hidden?: boolean;
  labelID: string;
  value: string;
  onChange: (value: string) => void;
};

export type SearchBarItemDropdownOptions = {
  text: string;
  value: string;
};

export type SearchBarItemDropdown = {
  type: "dropdown";
  hidden?: boolean;
  labelID: string;
  value: string;
  options: SearchBarItemDropdownOptions[];
  onChange: (value: string) => void;
};

export type SearchBarItem =
  | SearchBarItemTextField
  | SearchBarItemDropdown
  | null;

export type TableColumnOptionString = {
  type: "text";
  headerLabelID: string;
  width: number;
};

export type TableColumnOptionReactNode = {
  type: "component";
  headerLabel: ReactNode;
  width: number;
};

export type TableColumnOption =
  | TableColumnOptionString
  | TableColumnOptionReactNode;

export type TableRowCellOption = {
  styles: CSSProperties;
  value: string;
};

export type UserProfileListFilter = {
  userID?: string;
  username?: string;
  cursor?: string;
};

export enum CourseType {
  course = "course",
  openedCourse = "openedCourse",
}

export type Course = {
  subject: string;
  number: string;
  title: string;
  career: string;
  units: number;
  description: string;
  learningOutcome: string;
  syllabus: string;
  requiredReadings: string;
  recommendedReadings: string;
  openedCourse: OpenedCourse[];
};

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export type TimeSlot = {
  id: string;
  dayOfWeek: DayOfWeek;
  start: string;
  end: string;
};

export type OpenedCourse = {
  id: string;
  subject: string;
  number: string;
  section: string;
  year: number;
  semester: string;
  timeSlotIds: string[];
  venue: string;
  instructor: string;
  outline?: string;
  openSeats: number;
  capacity: number;
  course: Course;
};

export type CoursePeriod = {
  year: number;
  semester: string;
};

export type CourseListFilter = {
  code: string;
  title: string;
  period?: CoursePeriod;
  offset?: number;
};

export type DeleteOpenedCourseInput = {
  type: CourseType.openedCourse;
  id: string;
};

export type DeleteCourseInput = {
  type: CourseType.course;
  subject: string;
  number: string;
};

export type DeleteCourseFilter = DeleteCourseInput | DeleteOpenedCourseInput;
export type EnrollmentStatusItem = {
  sequence: string;
  status: string;
  subject: string;
  number: string;
  title: string;
  requestType: string;
  message: string;
};
