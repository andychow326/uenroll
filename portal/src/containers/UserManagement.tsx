import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Header } from "semantic-ui-react";
import useAdminActionCreator from "../actions/admin";
import EditUserModal from "../components/EditUserModal";
import ResendInvitationModal from "../components/ResendInvitationModal";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import UserTableDetailsCell from "../components/UserTableDetailsCell";
import { useEditUserModal, useResendInvitationModal } from "../hooks/modal";
import { useUserSearchBar } from "../hooks/searchBar";
import {
  SearchBarItem,
  TableColumnOption,
  TableRowCellOption,
  UserProfile,
} from "../types";

function useUserManagement() {
  const searchBar = useUserSearchBar();
  const {
    loading,
    error,
    userProfiles,
    fetchUserProfiles,
    sendInvitation,
    createUser,
    editUser,
    clearQuery,
  } = useAdminActionCreator();
  const editUserModalOptions = useEditUserModal({
    createUser,
    sendInvitation,
    editUser,
    clearQuery,
  });
  const resendInvitationModalOptions = useResendInvitationModal({
    sendInvitation,
  });
  const intl = useIntl();

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

  const onSearch = useCallback(
    (withFilter = true) => {
      searchBar.onSearch(fetchUserProfiles, withFilter);
    },
    [fetchUserProfiles, searchBar]
  );

  const onClearFilter = useCallback(() => {
    searchBar.onClearFilter();
    onSearch(false);
  }, [onSearch, searchBar]);

  const tableColumnOptions = useMemo(
    (): TableColumnOption[] => [
      {
        type: "text",
        headerLabelID: "UserManagement.table.header.user-id.label",
        width: 200,
      },
      {
        type: "text",
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
      lastName: string,
      isVerified?: boolean
    ): TableRowCellOption[] => [
      {
        value: userID,
        styles: {
          width: 200,
        },
      },
      {
        value: intl.formatMessage(
          { id: "UserManagement.table.row.user-name" },
          {
            firstName,
            lastName,
          }
        ),
        styles: {
          width: 200,
        },
      },
      {
        value: intl.formatMessage({
          id: isVerified
            ? "UserManagement.table.row.verified"
            : "UserManagement.table.row.not-verified",
        }),
        styles: {
          width: 100,
          color: isVerified ? "mediumseagreen" : "red",
        },
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
          data.lastName,
          data.isVerified
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
            isVerified={data.isVerified}
            onEdit={editUserModalOptions.onEdit(data)}
            onResendInvitation={resendInvitationModalOptions.onOpenResendInvitationModal(
              data
            )}
          />
        }
      />
    ),
    [
      editUserModalOptions,
      getTableRowCellColumnOptions,
      resendInvitationModalOptions,
    ]
  );

  const onSaveEditUserModal = useCallback(() => {
    editUserModalOptions.onSave().finally(() => {
      onSearch();
    });
  }, [editUserModalOptions, onSearch]);

  useEffect(() => {
    onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      loading,
      error,
      userProfiles,
      searchBarItems,
      tableColumnOptions,
      editUserModalOptions,
      resendInvitationModalOptions,
      onSearch,
      onClearFilter,
      onRenderTableRow,
      onSaveEditUserModal,
    }),
    [
      loading,
      error,
      userProfiles,
      searchBarItems,
      tableColumnOptions,
      editUserModalOptions,
      resendInvitationModalOptions,
      onSearch,
      onClearFilter,
      onRenderTableRow,
      onSaveEditUserModal,
    ]
  );
}

const UserManagement: React.FC = () => {
  const {
    loading,
    error,
    userProfiles,
    searchBarItems,
    tableColumnOptions,
    editUserModalOptions,
    resendInvitationModalOptions,
    onSearch,
    onClearFilter,
    onRenderTableRow,
    onSaveEditUserModal,
  } = useUserManagement();

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="UserManagement.title" />
      </Header>
      <Table
        loading={loading}
        searchBarItems={searchBarItems}
        onSearch={onSearch}
        onClearFilter={onClearFilter}
        columnOptions={tableColumnOptions}
        showHeaderButton
        headerButtonLabelID="UserManagement.table.header.add-button.label"
        onClickHeaderButton={editUserModalOptions.onOpenCreateUserModal}
        tableData={userProfiles ?? []}
        onRenderRow={onRenderTableRow}
      />
      <EditUserModal
        loading={loading}
        error={error}
        onSave={onSaveEditUserModal}
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
      <ResendInvitationModal
        loading={loading}
        userProfile={resendInvitationModalOptions.currentUserProfile}
        isOpen={resendInvitationModalOptions.isResendInvitationModalOpen}
        onConfirm={resendInvitationModalOptions.onResendInvitation}
        onCancel={resendInvitationModalOptions.onCloseResendInvitationModal}
      />
    </>
  );
};

export default UserManagement;
