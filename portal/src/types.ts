export enum AuthMode {
  login = "login",
  forgotPassword = "forgotPassword",
  resetPassword = "resetPassword",
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

export type UserProfile = {
  id: string;
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

export type SearchBarItem = {
  labelID: string;
  type: "textField" | "dropdown";
  value: string;
  onChange: (value: string) => void;
};

export type TableColumnOption = {
  headerLabelID: string;
  width: number;
};

export type TableRowCellOption = {
  width: number;
  value: string;
};

export type UserProfileListFilter = {
  userID?: string;
  username?: string;
  cursor?: string;
};
