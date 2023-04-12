import React from "react";
import { FormattedMessage } from "react-intl";
import { Header } from "semantic-ui-react";
import EnrollmentRequestInfo from "../components/EnrollmentRequestInfo";
import Table from "../components/Table";

const EnrollmentStatus: React.FC = () => {
  // const {
  //   loading,
  //   currentPage,
  //   totalPages,
  //   courseList,
  //   searchBarItems,
  //   tableColumnOptions,
  //   onSearch,
  //   onRenderTableRow,
  //   onChangePage,
  // } = useEnrollmentStatus();
  const requestID = "69696969";
  const submissionDate = new Date();

  return (
    <>
      {/* TO BE IMPLEMENTED: <Header as="h1">
      <FormattedMessage id="EnrollmentStatus.title" />
      </Header> */}
      <h1>Enrollment Status</h1>
      <EnrollmentRequestInfo
        requestID={requestID}
        submissionDate={submissionDate.toString()}
      />
      {/* TO BE IMPLEMENTED: <Table
        loading={loading}
        columnOptions={tableColumnOptions}
        tableData={enrollCourseList ?? []}
        onRenderRow={onRenderTableRow}
      /> */}
    </>
  );
};

export default EnrollmentStatus;
