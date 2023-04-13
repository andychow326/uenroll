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
import useUserActionCreator from "../actions/user";
import CourseTableDetailsCell from "../components/CourseTableDetailsCell";
import EditCourseModal from "../components/EditCourseModal";
import Table from "../components/Table";
import TableRowCell from "../components/TableRowCell";
import { useUser } from "../contexts/UserProvider";
import { useEditCourseModal, useEditOpenedCourseModal } from "../hooks/modal";
import { useCourseSearchBar } from "../hooks/searchBar";
import {
  Course,
  CourseListFilter,
  CoursePeriod,
  CourseType,
  OpenedCourse,
  SearchBarItem,
  TableColumnOption,
  TableRowCellOption,
} from "../types";

export function useCourseSearch() {
  const searchBar = useCourseSearchBar();
  const { addShoppingCart } = useUserActionCreator();
  const {
    loading,
    fetchCourseList,
    fetchCourseCount,
    fetchAvailableCoursePeriods,
  } = useCourseActionCreator();
  const {
    error,
    createCourse,
    deleteCourse,
    editCourse,
    clearQuery,
    createCourseSection,
    editCourseSection,
  } = useAdminActionCreator();
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
    editCourse,
  });
  const editOpenedCourseModalOptions = useEditOpenedCourseModal({
    clearQuery,
    createCourseSection,
    editCourseSection,
  });

  const onSearch = useCallback(
    (
      overrideType?: CourseType,
      overridePeriod?: CoursePeriod,
      overrideCode?: string,
      page?: number,
      withFilter = true
    ) => {
      searchBar.onSearch(async (type: CourseType, filter: CourseListFilter) => {
        const result = await fetchCourseList(overrideType ?? type, {
          code: overrideCode ?? filter.code,
          title: filter.title,
          period: overridePeriod ?? filter.period,
          offset: page,
        });
        const pages = await fetchCourseCount(overrideType ?? type, {
          code: overrideCode ?? filter.code,
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
    onSearch(CourseType.course, undefined, undefined, undefined, false);
  }, [onSearch, searchBar]);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onSearch(undefined, undefined, undefined, page);
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
        type: "text",
        headerLabelID: "CourseSearch.table.header.course-code.label",
        width: 200,
      },
      {
        type: "text",
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

  const onDeleteCourse = useCallback(
    (course: Course) => () => {
      deleteCourse({
        type: CourseType.course,
        subject: course.subject,
        number: course.number,
      }).finally(onSearch);
    },
    [deleteCourse, onSearch]
  );

  const onDeleteOpenedCourse = useCallback(
    (course: OpenedCourse) => {
      deleteCourse({ type: CourseType.openedCourse, id: course.id }).finally(
        onSearch
      );
    },
    [deleteCourse, onSearch]
  );

  const onAddToShoppingCart = useCallback(
    (courseID: string) => async () => {
      const result = await addShoppingCart(courseID);
      if (result) {
        // TODO: fetch shopping cart list and set button disabled
      }
    },
    [addShoppingCart]
  );

  const onRenderTableRow = useCallback(
    (data: Course): ReactNode => (
      <TableRowCell
        columnOptions={getTableRowCellColumnOptions(
          data.subject,
          data.number,
          data.title
        )}
        showDetailButton
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
            onDeleteCourse={onDeleteCourse(data)}
            onDeleteOpenedCourse={onDeleteOpenedCourse}
            onAddOpenedCourse={editOpenedCourseModalOptions.onCreate(data)}
            onEditOpenedCourse={editOpenedCourseModalOptions.onEdit}
            onAddToShoppingCart={onAddToShoppingCart}
          />
        }
      />
    ),
    [
      editCourseModalOptions,
      editOpenedCourseModalOptions,
      getTableRowCellColumnOptions,
      onAddToShoppingCart,
      onDeleteCourse,
      onDeleteOpenedCourse,
      userProfile?.isAdmin,
    ]
  );

  const onSaveEditCourseModal = useCallback(() => {
    editCourseModalOptions.onSave((subject: string, number: string) => {
      searchBar.onClearFilter();
      searchBar.onChangeCourseCode(subject + number);
      onSearch(
        CourseType.course,
        undefined,
        subject + number,
        undefined,
        false
      );
    });
  }, [editCourseModalOptions, onSearch, searchBar]);

  const onSaveEditOpenedCourseModal = useCallback(() => {
    editOpenedCourseModalOptions.onSave((subject: string, number: string) => {
      searchBar.onClearFilter();
      fetchAvailableCoursePeriods()
        .then((period) => {
          searchBar.onChangeCourseType(CourseType.openedCourse);
          searchBar.onChangeCourseCode(subject + number);
          searchBar.onChangeCoursePeriod(period[0]);
          setAvailableCoursePeriods(period);
          onSearch(
            CourseType.openedCourse,
            period[0],
            subject + number,
            undefined,
            false
          );
        })
        .catch(null);
    });
  }, [
    editOpenedCourseModalOptions,
    fetchAvailableCoursePeriods,
    onSearch,
    searchBar,
  ]);

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
      editOpenedCourseModalOptions,
      onSearch,
      onClearFilter,
      onRenderTableRow,
      onChangePage,
      onSaveEditCourseModal,
      onSaveEditOpenedCourseModal,
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
      editOpenedCourseModalOptions,
      onSearch,
      onClearFilter,
      onRenderTableRow,
      onChangePage,
      onSaveEditCourseModal,
      onSaveEditOpenedCourseModal,
    ]
  );
}

const CourseSearch: React.FC = () => {
  const {
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
    onSaveEditCourseModal,
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
      <EditCourseModal
        loading={loading}
        error={error}
        {...editCourseModalOptions}
        course={editCourseModalOptions.currentCourse}
        onSave={onSaveEditCourseModal}
        isOpen={editCourseModalOptions.isEditCourseModalOpen}
        onClose={editCourseModalOptions.onCloseEditCourseModal}
      />
    </>
  );
};

export default CourseSearch;
