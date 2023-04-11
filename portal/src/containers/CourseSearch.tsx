import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Header } from "semantic-ui-react";
import useCourseActionCreator from "../actions/course";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import { useCourseSearchBar } from "../hooks/searchBar";
import {
  CourseListFilter,
  CourseListItem,
  CourseType,
  SearchBarItem,
  TableColumnOption,
  TableRowCellOption,
} from "../types";

export function useCourseSearch<T extends CourseType>(courseType: T) {
  const searchBar = useCourseSearchBar(courseType);
  const { loading, fetchCourseList } = useCourseActionCreator();
  const intl = useIntl();
  const [courseList, setCourseList] = useState<CourseListItem<T>[] | null>([]);

  const onSearch = useCallback(() => {
    searchBar.onSearch(async (type: CourseType, filter: CourseListFilter) => {
      const result = await fetchCourseList(type, filter);
      setCourseList(result as CourseListItem<T>[]);
    });
  }, [fetchCourseList, searchBar]);

  const searchBarItems = useMemo(
    (): SearchBarItem[] => [
      {
        labelID: "CourseSearch.search-bar.course-code.label",
        type: "textField",
        value: searchBar.courseCode,
        onChange: searchBar.onChangeCourseCode,
      },
      {
        labelID: "CourseSearch.search-bar.course-title.label",
        type: "textField",
        value: searchBar.courseTitle,
        onChange: searchBar.onChangeCourseTitle,
      },
    ],
    [searchBar]
  );

  const tableColumnOptions = useMemo(
    (): TableColumnOption[] => [
      {
        headerLabelID: "CourseSearch.table.header.course-code.label",
        width: 200,
      },
      {
        headerLabelID: "CourseSearch.table.header.course-title.label",
        width: 200,
      },
    ],
    []
  );

  const getTableRowCellColumnOptions = useCallback(
    (subject: string, number: string, title: string): TableRowCellOption[] => [
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
    ],
    [intl]
  );

  const onRenderTableRow = useCallback(
    (data: CourseListItem<T>): ReactNode => (
      <TableRowCell
        columnOptions={getTableRowCellColumnOptions(
          data.subject,
          data.number,
          data.type === CourseType.course
            ? data.title
            : data.type === CourseType.openedCourse
            ? data.course.title
            : ""
        )}
        showDetailButton
        detailButtonLabelID="CourseSearch.table.row.more-button.label"
        hideDetailButtonLabelID="CourseSearch.table.row.hidden-button.label"
      />
    ),
    [getTableRowCellColumnOptions]
  );

  useEffect(() => {
    onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      loading,
      courseList,
      searchBarItems,
      tableColumnOptions,
      onSearch,
      onRenderTableRow,
    }),
    [
      loading,
      courseList,
      searchBarItems,
      tableColumnOptions,
      onSearch,
      onRenderTableRow,
    ]
  );
}

const CourseSearch: React.FC = () => {
  const {
    loading,
    courseList,
    searchBarItems,
    tableColumnOptions,
    onSearch,
    onRenderTableRow,
  } = useCourseSearch(CourseType.openedCourse);

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="CourseSearch.title" />
      </Header>
      <Table
        loading={loading}
        searchBarItems={searchBarItems}
        onSearch={onSearch}
        columnOptions={tableColumnOptions}
        tableData={courseList ?? []}
        onRenderRow={onRenderTableRow}
      />
    </>
  );
};

export default CourseSearch;
