import React from "react";
import { FormattedMessage } from "react-intl";
import { Header } from "semantic-ui-react";
import Table from "../components/Table";
import { CourseType } from "../types";
import { useCourseSearch } from "./CourseSearch";

const CourseManagement: React.FC = () => {
  const {
    loading,
    currentPage,
    totalPages,
    courseList,
    searchBarItems,
    tableColumnOptions,
    onSearch,
    onRenderTableRow,
    onChangePage,
  } = useCourseSearch(CourseType.course);

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="CourseManagement.title" />
      </Header>
      <Table
        loading={loading}
        searchBarItems={searchBarItems}
        onSearch={onSearch}
        columnOptions={tableColumnOptions}
        tableData={courseList ?? []}
        onRenderRow={onRenderTableRow}
        showPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onChangePage}
        showHeaderButton
        headerButtonLabelID="CourseManagement.table.header.add-button.label"
        // TODO: Implement header button
      />
    </>
  );
};

export default CourseManagement;
