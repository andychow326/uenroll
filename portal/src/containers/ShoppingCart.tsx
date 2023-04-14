import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Checkbox, Header } from "semantic-ui-react";
import useUserActionCreator from "../actions/user";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import { OpenedCourse, TableColumnOption, TableRowCellOption } from "../types";

// onEnroll:
// onDelete:
// onVaildate: check time crash

function useShoppingCart() {
  const { loading, fetchShoppingCart } = useUserActionCreator();
  const [courseList, setCourseList] = useState<OpenedCourse[]>([]);
  const [courseChecked, setCourseChecked] = useState<string[]>([]);
  const intl = useIntl();

  useEffect(() => {
    fetchShoppingCart()
      .then((course) => {
        setCourseList(course);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectAll = useCallback(() => {
    setCourseChecked(
      courseList.map((course) => `${course.subject}${course.number}`)
    );
  }, [courseList]);

  const onUnSelectAll = useCallback(() => {
    setCourseChecked([]);
  }, []);

  const onEnroll = useCallback(() => {
    // check vaildate
    // if vaildate, enroll and direct to enrollment status
    // if not vaildate, error message is displayed
  }, []);

  const onDelete = useCallback(() => {
    // remove courseChecked from courseList
    //
  }, []);

  const onVaildate = useCallback(() => {
    // check if there is a time conflict
  }, []);

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
        width: 150,
      },
      {
        type: "text",
        headerLabelID: "ShoppingCart.table.header.course-code.label",
        width: 200,
      },
      {
        type: "text",
        headerLabelID: "ShoppingCart.table.header.title.label",
        width: 200,
      },
    ],
    [courseChecked.length, courseList.length, onSelectAll, onUnSelectAll]
  );

  const getTableRowCellColumnOptions = useCallback(
    (subject: string, number: string, title: string): TableRowCellOption[] => [
      {
        value: (
          <Checkbox
            checked={courseChecked.includes(`${subject}${number}`)}
            onClick={() => {
              const index = courseChecked.indexOf(`${subject}${number}`);
              if (index !== -1) {
                setCourseChecked((courses) =>
                  courses.filter((course) => course !== `${subject}${number}`)
                );
              } else {
                setCourseChecked((courses) => [
                  ...courses,
                  `${subject}${number}`,
                ]);
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
          { id: "ShoppingCart.table.row.course-code.label" },
          {
            subject,
            number,
          }
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
          data.course.subject,
          data.course.number,
          data.course.title
        )}
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
      onEnroll,
      onDelete,
      onVaildate,
    }),
    [
      loading,
      courseList,
      tableColumnOptions,
      onRenderTableRow,
      onEnroll,
      onDelete,
      onVaildate,
    ]
  );
}

const ShoppingCart: React.FC = () => {
  const {
    loading,
    courseList,
    tableColumnOptions,
    onRenderTableRow,
    onEnroll,
    onDelete,
    onVaildate,
  } = useShoppingCart();

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="ShoppingCart.title" />
      </Header>
      <div style={{ textAlign: "right" }}>
        <Button color="orange" onClick={onEnroll}>
          <FormattedMessage id="ShoppingCart.enroll-button.label" />
        </Button>
        <Button onClick={onDelete}>
          <FormattedMessage id="ShoppingCart.delete-button.label" />
        </Button>
        <Button onClick={onVaildate}>
          <FormattedMessage id="ShoppingCart.vaildate-button.label" />
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
export default ShoppingCart;
