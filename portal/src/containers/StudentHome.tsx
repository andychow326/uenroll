import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Header } from "semantic-ui-react";
import useUserActionCreator from "../actions/user";
import StudentCourseTableDetailsCell from "../components/StudentCourseTableDetailsCell";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import { OpenedCourse, TableColumnOption, TableRowCellOption } from "../types";

export function useStudentHome() {
  const [courses, setCourses] = useState<OpenedCourse[]>([]);
  const { loading, fetchEnrolledCourse } = useUserActionCreator();
  const intl = useIntl();

  useEffect(() => {
    fetchEnrolledCourse()
      .then((course) => {
        setCourses(course);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableColumnOptions = useMemo(
    (): TableColumnOption[] => [
      {
        type: "text",
        headerLabelID: "StudentHome.table.header.course-code.label",
        width: 200,
      },
      {
        type: "text",
        headerLabelID: "StudentHome.table.header.course-title.label",
        width: 200,
      },
    ],
    []
  );

  const getTableRowCellColumnOptions = useCallback(
    (
      subject: string,
      number: string,
      title: string,
      section: string
    ): TableRowCellOption[] => [
      {
        value: intl.formatMessage(
          { id: "StudentHome.table.row.course-code.label" },
          { subject, number, section }
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
    ],
    [intl]
  );

  const onRenderTableRow = useCallback(
    (data: OpenedCourse): ReactNode => (
      <TableRowCell
        columnOptions={getTableRowCellColumnOptions(
          data.subject,
          data.number,
          data.course.title,
          data.section === "-" ? "" : data.section
        )}
        showDetailButton
        detailButtonLabelID="StudentHome.table.row.more-button.label"
        hideDetailButtonLabelID="StudentHome.table.row.hidden-button.label"
        DetailInfo={<StudentCourseTableDetailsCell openedCourse={data} />}
      />
    ),
    [getTableRowCellColumnOptions]
  );

  return useMemo(
    () => ({
      loading,
      courses,
      tableColumnOptions,
      onRenderTableRow,
    }),
    [courses, loading, onRenderTableRow, tableColumnOptions]
  );
}

const StudentHome: React.FC = () => {
  const { loading, courses, tableColumnOptions, onRenderTableRow } =
    useStudentHome();

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="StudentHome.title" />
      </Header>
      <Table
        loading={loading}
        tableData={courses}
        columnOptions={tableColumnOptions}
        onRenderRow={onRenderTableRow}
      />
    </>
  );
};

export default StudentHome;
