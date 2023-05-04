import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Header } from "semantic-ui-react";
import useUserActionCreator from "../actions/user";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import {
  EnrollmentStatusItem,
  TableColumnOption,
  TableRowCellOption,
} from "../types";
import { useCourseSearch } from "./CourseSearch";

function useEnrollmentStatus() {
  const intl = useIntl();
  const [enrollmentStatusItemList, setEnrollmentStatusItemList] = useState<
    EnrollmentStatusItem[]
  >([]);
  const { fetchEnrollmentStatusItem } = useUserActionCreator();

  const onFetch = useCallback(() => {
    fetchEnrollmentStatusItem()
      .then((enrollmentStatusItem) => {
        setEnrollmentStatusItemList(enrollmentStatusItem);
      })
      .catch(() => {});
  }, [fetchEnrollmentStatusItem]);

  const onRefresh = useCallback(() => {
    onFetch();
  }, [onFetch]);

  const tableColumnOptions = useMemo(
    (): TableColumnOption[] => [
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.request-type",
        width: 150,
      },
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.status",
        width: 150,
      },
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.course-code",
        width: 150,
      },
      {
        type: "text",
        headerLabelID: "EnrollmentStatus.table.header.course-title",
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
      status: string,
      subject: string,
      number: string,
      title: string,
      requestType: string,
      message: string
    ): TableRowCellOption[] => [
      {
        value: requestType,
        styles: {
          width: 150,
        },
      },
      {
        value: status,
        styles: {
          width: 150,
        },
      },
      {
        value: intl.formatMessage(
          { id: "CourseSearch.table.row.course-code.label" },
          { subject, number }
        ),
        styles: {
          width: 150,
        },
      },
      {
        value: title,
        styles: {
          width: 200,
        },
      },
      {
        value: message,
        styles: {
          minWidth: 200,
        },
      },
    ],
    [intl]
  );

  const onRenderTableRow = useCallback(
    (data: EnrollmentStatusItem): ReactNode => (
      <TableRowCell
        columnOptions={getTableRowCellColumnOptions(
          data.status,
          data.subject,
          data.number,
          data.title,
          data.requestType,
          data.message
        )}
      />
    ),
    [getTableRowCellColumnOptions]
  );

  useEffect(() => {
    onFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      enrollmentStatusItemList,
      tableColumnOptions,
      getTableRowCellColumnOptions,
      onRenderTableRow,
      onFetch,
      onRefresh,
    }),
    [
      enrollmentStatusItemList,
      getTableRowCellColumnOptions,
      onRenderTableRow,
      tableColumnOptions,
      onFetch,
      onRefresh,
    ]
  );
}

const EnrollmentStatus: React.FC = () => {
  const {
    tableColumnOptions,
    enrollmentStatusItemList,
    onRenderTableRow,
    onRefresh,
  } = useEnrollmentStatus();
  const { loading } = useCourseSearch();

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="EnrollmentStatus.title" />
      </Header>
      <div style={{ textAlign: "right" }}>
        <Button color="orange" onClick={onRefresh}>
          <FormattedMessage id="EnrollmentStatus.request.refresh-button.label" />
        </Button>
      </div>
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
