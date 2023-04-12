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

export function useCourseSearch<T extends CourseType>(
  courseType: T,
  onChangeCourseType: (type: T) => void
) {
  const searchBar = useCourseSearchBar(courseType);
  const { loading, fetchCourseList, fetchCourseCount } =
    useCourseActionCreator();
  const intl = useIntl();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [courseList, setCourseList] = useState<CourseListItem<T>[] | null>([]);

  const onSearch = useCallback(
    (page?: number, withFilter = true) => {
      searchBar.onSearch(async (type: CourseType, filter: CourseListFilter) => {
        const result = await fetchCourseList(type, {
          ...filter,
          offset: page,
        });
        const pages = await fetchCourseCount(type, {
          ...filter,
          offset: page,
        });
        setCourseList(result as CourseListItem<T>[]);
        setTotalPages(pages);
        setCurrentPage(page ?? 1);
      }, withFilter);
    },
    [fetchCourseCount, fetchCourseList, searchBar]
  );

  const onClearFilter = useCallback(() => {
    searchBar.onClearFilter();
    onSearch(undefined, false);
  }, [onSearch, searchBar]);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onSearch(page);
    },
    [onSearch]
  );

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
      {
        labelID: "CourseSearch.search-bar.course-type.label",
        type: "dropdown",
        options: [
          {
            text: intl.formatMessage({
              id: "CourseSearch.search-bar.course-type.course",
            }),
            value: CourseType.course,
          },
          {
            text: intl.formatMessage({
              id: "CourseSearch.search-bar.course-type.opened-course",
            }),
            value: CourseType.openedCourse,
          },
        ],
        value: courseType,
        onChange: (value) => onChangeCourseType(value as T),
      },
    ],
    [
      courseType,
      intl,
      onChangeCourseType,
      searchBar.courseCode,
      searchBar.courseTitle,
      searchBar.onChangeCourseCode,
      searchBar.onChangeCourseTitle,
    ]
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
      currentPage,
      totalPages,
      courseList,
      searchBarItems,
      tableColumnOptions,
      onSearch,
      onClearFilter,
      onRenderTableRow,
      onChangePage,
    }),
    [
      loading,
      currentPage,
      totalPages,
      courseList,
      searchBarItems,
      tableColumnOptions,
      onSearch,
      onClearFilter,
      onRenderTableRow,
      onChangePage,
    ]
  );
}

const CourseSearch: React.FC = () => {
  const [type, setType] = useState<CourseType>(CourseType.course);
  const {
    loading,
    currentPage,
    totalPages,
    courseList,
    searchBarItems,
    tableColumnOptions,
    onSearch,
    onClearFilter,
    onRenderTableRow,
    onChangePage,
  } = useCourseSearch(type, setType);

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="CourseSearch.title" />
      </Header>
      <Table
        loading={loading}
        searchBarItems={searchBarItems}
        onSearch={onSearch}
        onClearFilter={onClearFilter}
        columnOptions={tableColumnOptions}
        tableData={courseList ?? []}
        onRenderRow={onRenderTableRow}
        showPagination
        totalPages={totalPages}
        onChangePage={onChangePage}
        currentPage={currentPage}
      />
    </>
  );
};

export default CourseSearch;
