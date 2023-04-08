import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Header } from "semantic-ui-react";
import useAdminActionCreator from "../actions/admin";
import EditUserModal from "../components/EditUserModal";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import UserTableDetailsCell from "../components/UserTableDetailsCell";
import { useEditUserModal } from "../hooks/modal";
import { useUserSearchBar } from "../hooks/searchBar";
import {
  SearchBarItem,
  TableColumnOption,
  TableRowCellOption,
  UserProfile,
} from "../types";

function useUserManagement() {
  const searchBar = useUserSearchBar();
  const { userProfiles, fetchUserProfiles } = useAdminActionCreator();
  const isInitized = useRef(false);
  isInitized.current = false;

  const searchBarItems = useMemo(
    (): SearchBarItem[] => [
      {
        labelID: "UserManagement.search-bar.user-id.label",
        type: "textField",
        value: searchBar.userID,
        onChange: searchBar.onChangeUserID,
      },
      {
        labelID: "UserManagement.search-bar.user-name.label",
        type: "textField",
        value: searchBar.username,
        onChange: searchBar.onChangeUsername,
      },
    ],
    [
      searchBar.onChangeUserID,
      searchBar.onChangeUsername,
      searchBar.userID,
      searchBar.username,
    ]
  );

  const onSearch = useCallback(() => {
    searchBar.onSearch(fetchUserProfiles);
  }, [fetchUserProfiles, searchBar]);

  useEffect(() => {
    onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      userProfiles,
      searchBarItems,
      onSearch,
    }),
    [userProfiles, searchBarItems, onSearch]
  );
}

const UserManagement: React.FC = () => {
  const { userProfiles, searchBarItems, onSearch } = useUserManagement();
  const editUserModalOptions = useEditUserModal();
  const intl = useIntl();

  const tableColumnOptions = useMemo(
    (): TableColumnOption[] => [
      {
        headerLabelID: "UserManagement.table.header.user-id.label",
        width: 200,
      },
      {
        headerLabelID: "UserManagement.table.header.user-name.label",
        width: 200,
      },
    ],
    []
  );

  const getTableRowCellColumnOptions = useCallback(
    (
      userID: string,
      firstName: string,
      lastName: string
    ): TableRowCellOption[] => [
      {
        value: userID,
        width: 200,
      },
      {
        value: intl.formatMessage(
          { id: "UserManagement.table.row.user-name" },
          {
            firstName,
            lastName,
          }
        ),
        width: 200,
      },
    ],
    [intl]
  );

  const onRenderTableRow = useCallback(
    (data: UserProfile): ReactNode => (
      <TableRowCell
        columnOptions={getTableRowCellColumnOptions(
          data.id,
          data.firstName,
          data.lastName
        )}
        showDetailButton
        detailButtonLabelID="UserManagement.table.row.more-button.label"
        hideDetailButtonLabelID="UserManagement.table.row.hidden-button.label"
        DetailInfo={
          <UserTableDetailsCell
            firstName={data.firstName}
            lastName={data.lastName}
            email={data.email}
            dateOfBirth={data.dateOfBirth}
            phoneNumber={data.phoneNumber}
            gender={data.gender}
            major={data.major}
            address={data.address}
          />
        }
      />
    ),
    [getTableRowCellColumnOptions]
  );

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="UserManagement.title" />
      </Header>
      <Table
        searchBarItems={searchBarItems}
        onSearch={onSearch}
        columnOptions={tableColumnOptions}
        showHeaderButton
        headerButtonLabelID="UserManagement.table.header.add-button.label"
        onClickHeaderButton={editUserModalOptions.onOpenCreateUserModal}
        tableData={userProfiles ?? []}
        onRenderRow={onRenderTableRow}
      />
      <EditUserModal
        loading={editUserModalOptions.loading}
        error={editUserModalOptions.error}
        onSave={editUserModalOptions.onSave}
        isCreateNewUser={editUserModalOptions.isCreateNewUser}
        isOpen={editUserModalOptions.isEditUserModalOpen}
        onClose={editUserModalOptions.onCloseEditUserModal}
        userProfile={editUserModalOptions.currentUserProfile}
        onChangeID={editUserModalOptions.onChangeID}
        onChangeFirstName={editUserModalOptions.onChangeFirstName}
        onChangeLastName={editUserModalOptions.onChangeLastName}
        onChangeEmail={editUserModalOptions.onChangeEmail}
        onChangeIsAdmin={editUserModalOptions.onChangeIsAdmin}
        onChangeDateOfBirth={editUserModalOptions.onChangeDateOfBirth}
        onChangePhoneNumber={editUserModalOptions.onChangePhoneNumber}
        onChangeGender={editUserModalOptions.onChangeGender}
        onChangeMajor={editUserModalOptions.onChangeMajor}
        onChangeAddress={editUserModalOptions.onChangeAddress}
      />
    </>
  );
};

export default UserManagement;
