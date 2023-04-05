export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
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
