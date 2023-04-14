import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Header } from "semantic-ui-react";
import useUserActionCreator from "../actions/user";
import CourseTableDetailsCell from "../components/CourseTableDetailsCell";
import StudentCourseTableDetailsCell from "../components/StudentCourseTableDetailsCell";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import routes from "../routes";
import { OpenedCourse, TableColumnOption, TableRowCellOption } from "../types";

function useDropClass() {
  const [courseList, setCourseList] = useState<OpenedCourse[]>([]);
  const [courseChecked, setCourseChecked] = useState<string[]>([]);
  const { loading, fetchEnrolledCourse, dropCourse } = useUserActionCreator();
  const intl = useIntl();
  const navigate = useNavigate();

  const onFetchCourse = useCallback(() => {
    fetchEnrolledCourse()
      .then((course) => {
        setCourseList(course);
      })
      .catch(() => {});
  }, [fetchEnrolledCourse]);

  useEffect(() => {
    onFetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectAll = useCallback(() => {
    setCourseChecked(courseList.map((course) => course.id));
  }, [courseList]);

  const onUnSelectAll = useCallback(() => {
    setCourseChecked([]);
  }, []);

  const onDrop = useCallback(() => {
    dropCourse(courseChecked).finally(() => {
      navigate(routes.enrollmentStatus.path);
    });
  }, [courseChecked, dropCourse, navigate]);

  const tableColumnOptions = useMemo(
    (): TableColumnOption[] => [
      {
        type: "component",
        headerLabel:
          courseList.length !== courseChecked.length ? (
            <Button onClick={onSelectAll} size="mini">
              <FormattedMessage id="ShoppingCart.table.header.select-all.label" />
            </Button>
          ) : (
            <Button onClick={onUnSelectAll} size="mini">
              <FormattedMessage id="ShoppingCart.table.header.unselect-all.label" />
            </Button>
          ),
        width: 100,
      },
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
    [courseChecked.length, courseList.length, onSelectAll, onUnSelectAll]
  );

  const getTableRowCellColumnOptions = useCallback(
    (
      id: string,
      subject: string,
      number: string,
      title: string,
      section: string
    ): TableRowCellOption[] => [
      {
        value: (
          <Checkbox
            checked={courseChecked.includes(id)}
            onClick={() => {
              const index = courseChecked.indexOf(id);
              if (index !== -1) {
                setCourseChecked((courses) =>
                  courses.filter((course) => course !== id)
                );
              } else {
                setCourseChecked((courses) => [...courses, id]);
              }
            }}
          />
        ),
        styles: {
          width: 100,
        },
      },
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
    [courseChecked, intl]
  );

  const onRenderTableRow = useCallback(
    (data: OpenedCourse): ReactNode => (
      <TableRowCell
        columnOptions={getTableRowCellColumnOptions(
          data.id,
          data.subject,
          data.number,
          data.course.title,
          data.section
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
      courseList,
      tableColumnOptions,
      onRenderTableRow,
      onDrop,
    }),
    [courseList, loading, onRenderTableRow, tableColumnOptions, onDrop]
  );
}

const DropClass: React.FC = () => {
  const { loading, courseList, tableColumnOptions, onRenderTableRow, onDrop } =
    useDropClass();

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="DropClass.title" />
      </Header>
      <div style={{ textAlign: "right" }}>
        <Button color="orange" onClick={onDrop}>
          <FormattedMessage id="DropClass.drop-button.label" />
        </Button>
      </div>
      <Table
        loading={loading}
        tableData={courseList}
        columnOptions={tableColumnOptions}
        onRenderRow={onRenderTableRow}
      />
    </>
  );
};

export default DropClass;
