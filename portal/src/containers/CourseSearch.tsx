import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Header } from "semantic-ui-react";
import useAdminActionCreator from "../actions/admin";
import useCourseActionCreator from "../actions/course";
import CourseTableDetailsCell from "../components/CourseTableDetailsCell";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import { useUser } from "../contexts/UserProvider";
import { useEditCourseModal } from "../hooks/modal";
import { useCourseSearchBar } from "../hooks/searchBar";
import {
  Course,
  CourseListFilter,
  CoursePeriod,
  CourseType,
  SearchBarItem,
  TableColumnOption,
  TableRowCellOption,
} from "../types";

export function useCourseSearch() {
  const searchBar = useCourseSearchBar();
  const {
    loading,
    fetchCourseList,
    fetchCourseCount,
    fetchAvailableCoursePeriods,
  } = useCourseActionCreator();
  const { error, createCourse, clearQuery } = useAdminActionCreator();
  const intl = useIntl();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableCoursePeriods, setAvailableCoursePeriods] = useState<
    CoursePeriod[]
  >([]);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const { userProfile } = useUser();
  const editCourseModalOptions = useEditCourseModal({
    clearQuery,
    createCourse,
  });

  const onSearch = useCallback(
    (
      overrideType?: CourseType,
      overridePeriod?: CoursePeriod,
      page?: number,
      withFilter = true
    ) => {
      searchBar.onSearch(async (type: CourseType, filter: CourseListFilter) => {
        const result = await fetchCourseList(overrideType ?? type, {
          code: filter.code,
          title: filter.title,
          period: overridePeriod ?? filter.period,
          offset: page,
        });
        const pages = await fetchCourseCount(overrideType ?? type, {
          code: filter.code,
          title: filter.title,
          period: overridePeriod ?? filter.period,
          offset: page,
        });
        setCourseList(result);
        setTotalPages(pages);
        setCurrentPage(page ?? 1);
      }, withFilter);
    },
    [fetchCourseCount, fetchCourseList, searchBar]
  );

  const onClearFilter = useCallback(() => {
    searchBar.onClearFilter();
    onSearch(CourseType.course, undefined, undefined, false);
  }, [onSearch, searchBar]);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onSearch(undefined, undefined, page);
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
        value: searchBar.courseType,
        onChange: async (value) => {
          const newAvailableCoursePeriods = await fetchAvailableCoursePeriods();
          setAvailableCoursePeriods(newAvailableCoursePeriods);
          const newPeriod =
            value === CourseType.openedCourse
              ? newAvailableCoursePeriods[0]
              : { year: 0, semester: "" };
          searchBar.onChangeCoursePeriod(newPeriod);
          searchBar.onChangeCourseType(value as CourseType);
          onSearch(value as CourseType, newPeriod);
        },
      },
      {
        labelID: "CourseSearch.search-bar.course-period.label",
        type: "dropdown",
        hidden: searchBar.courseType !== CourseType.openedCourse,
        options: availableCoursePeriods.map((period) => ({
          text: intl.formatMessage(
            { id: "CourseSearch.search-bar.course-period.option" },
            { year: period.year, semester: period.semester }
          ),
          value: `${period.year}-${period.semester}`,
        })),
        onChange: (value) => {
          const [year, semester] = value.split("-");
          searchBar.onChangeCoursePeriod(
            year && semester ? { year: Number(year), semester } : undefined
          );
        },
        value: `${searchBar.coursePeriod?.year ?? ""}-${
          searchBar.coursePeriod?.semester ?? ""
        }`,
      },
    ],
    [
      availableCoursePeriods,
      fetchAvailableCoursePeriods,
      intl,
      onSearch,
      searchBar,
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
    (data: Course): ReactNode => (
      <TableRowCell
        columnOptions={getTableRowCellColumnOptions(
          data.subject,
          data.number,
          data.title
        )}
        showDetailButton={searchBar.courseType === CourseType.openedCourse}
        detailButtonLabelID="CourseSearch.table.row.more-button.label"
        hideDetailButtonLabelID="CourseSearch.table.row.hidden-button.label"
        showSecondaryButton
        secondaryButtonLabelID="CourseSearch.table.row.secondary-button.label"
        onClickSecondaryButton={editCourseModalOptions.onReadOnly(data)}
        DetailInfo={
          <CourseTableDetailsCell
            isAdmin={userProfile?.isAdmin}
            openedCourses={data.openedCourse}
            onEditCourse={editCourseModalOptions.onEdit(data)}
          />
        }
      />
    ),
    [
      editCourseModalOptions,
      getTableRowCellColumnOptions,
      searchBar.courseType,
      userProfile?.isAdmin,
    ]
  );

  const onSaveEditUserModal = useCallback(() => {
    editCourseModalOptions.onSave(onSearch);
  }, [editCourseModalOptions, onSearch]);

  useEffect(() => {
    onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      loading,
      error,
      currentPage,
      totalPages,
      courseList,
      searchBarItems,
      tableColumnOptions,
      editCourseModalOptions,
      onSearch,
      onClearFilter,
      onRenderTableRow,
      onChangePage,
      onSaveEditUserModal,
    }),
    [
      loading,
      error,
      currentPage,
      totalPages,
      courseList,
      searchBarItems,
      tableColumnOptions,
      editCourseModalOptions,
      onSearch,
      onClearFilter,
      onRenderTableRow,
      onChangePage,
      onSaveEditUserModal,
    ]
  );
}

const CourseSearch: React.FC = () => {
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
  } = useCourseSearch();

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
