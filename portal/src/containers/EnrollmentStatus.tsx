import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Header } from "semantic-ui-react";
import EnrollmentRequestInfo from "../components/EnrollmentRequestInfo";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import {
  EnrollmentStatusItem,
  TableColumnOption,
  TableRowCellOption,
} from "../types";
import { useCourseSearch } from "./CourseSearch";
// import useCourseActionCreator from "../actions/course";

function useEnrollmentStatus() {
  const intl = useIntl();
  const [enrollmentStatusItemList, setEnrollmentStatusItemList] = useState<
    EnrollmentStatusItem[]
  >([]);

  const tableColumnOptions = useMemo(
    (): TableColumnOption[] => [
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.sequence",
        width: 200,
      },
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.status",
        width: 200,
      },
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.course-code",
        width: 200,
      },
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.course-title",
        width: 200,
      },
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.request-type",
        width: 200,
      },
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.message",
        width: 200,
      },
    ],
    []
  );

  const getTableRowCellColumnOptions = useCallback(
    (
      sequence: string,
      status: string,
      subject: string,
      number: string,
      title: string,
      requestType: string,
      message: string
    ): TableRowCellOption[] => [
      {
        value: sequence,
        styles: {
          width: 200,
        },
      },
      {
        value: status,
        styles: {
          width: 200,
        },
      },
      {
        value: intl.formatMessage(
          { id: "CourseSearch.table.row.course-code.label" },
          { subject, number }
        ),
        styles: {
          width: 200,
        },
      },
      {
        value: title,
        styles: {
          width: 200,
        },
      },
      {
        value: requestType,
        styles: {
          width: 200,
        },
      },
      {
        value: message,
        styles: {
          width: 200,
        },
      },
    ],
    [intl]
  );

  const onRenderTableRow = useCallback(
    (data: EnrollmentStatusItem): ReactNode => (
      <TableRowCell
        columnOptions={getTableRowCellColumnOptions(
          data.sequence,
          data.status,
          data.subject,
          data.number,
          data.title,
          data.sequence,
          data.message
        )}
      />
    ),
    [getTableRowCellColumnOptions]
  );

  return useMemo(
    () => ({
      enrollmentStatusItemList,
      tableColumnOptions,
      getTableRowCellColumnOptions,
      onRenderTableRow,
    }),
    [
      enrollmentStatusItemList,
      getTableRowCellColumnOptions,
      onRenderTableRow,
      tableColumnOptions,
    ]
  );
}

const EnrollmentStatus: React.FC = () => {
  // const { loading, fetchCourseList, fetchCourseCount } =
  //   useCourseActionCreator();
  const { tableColumnOptions, enrollmentStatusItemList, onRenderTableRow } =
    useEnrollmentStatus();
  const { loading } = useCourseSearch();
  const requestID = "69696969";
  const submissionDate = new Date();

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="EnrollmentStatus.title" />
      </Header>
      <EnrollmentRequestInfo
        requestID={requestID}
        submissionDate={submissionDate.toString()}
      />
      <Table
        tableData={enrollmentStatusItemList ?? []}
        onRenderRow={onRenderTableRow}
        loading={loading}
        columnOptions={tableColumnOptions}
      />
    </>
  );
};

export default EnrollmentStatus;
